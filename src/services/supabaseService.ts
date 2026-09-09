import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Product, Review } from '../types';
import { PRODUCTS } from '../data/products';

export async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return PRODUCTS;
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        colors:product_colors(name, hex, image),
        reviews(*)
      `)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      // Fall back to local products if Supabase tables are empty or error occurs
      return PRODUCTS;
    }

    return data.map((row: any) => ({
      id: row.id,
      name: row.name,
      tagline: row.tagline || '',
      price: Number(row.price),
      originalPrice: row.original_price ? Number(row.original_price) : undefined,
      rating: Number(row.rating) || 5.0,
      reviewsCount: Number(row.reviews_count) || 0,
      category: row.category,
      material: row.material,
      hairType: row.hair_type || 'all',
      badge: row.badge,
      isBestSeller: Boolean(row.is_best_seller),
      isNew: Boolean(row.is_new),
      isStaffPick: Boolean(row.is_staff_pick),
      stockLeft: row.stock_left !== null ? Number(row.stock_left) : 10,
      images: Array.isArray(row.images) && row.images.length > 0 ? row.images : [],
      description: row.description || '',
      details: Array.isArray(row.details) ? row.details : [],
      careInstructions: Array.isArray(row.care_instructions) ? row.care_instructions : [],
      colors: Array.isArray(row.colors) ? row.colors : [],
      reviews: Array.isArray(row.reviews)
        ? row.reviews.map((r: any) => ({
            id: r.id,
            author: r.author,
            rating: Number(r.rating),
            date: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recently',
            title: r.title,
            comment: r.comment,
            hairType: r.hair_type || '',
            verified: Boolean(r.verified),
          }))
        : [],
    }));
  } catch (err) {
    console.warn('Failed to load products from Supabase, using default catalog:', err);
    return PRODUCTS;
  }
}

export async function submitProductReview(productId: string, review: Omit<Review, 'id' | 'date'>) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, mode: 'local' };
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert([
      {
        product_id: productId,
        author: review.author,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        hair_type: review.hairType,
        verified: review.verified,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Supabase review insert error:', error);
    throw error;
  }

  return { success: true, data };
}

export async function submitNewsletter(email: string) {
  if (!isSupabaseConfigured || !supabase) {
    return { success: true, mode: 'local' };
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }])
    .select()
    .single();

  if (error && error.code !== '23505') { // Ignore unique constraint violation if already subscribed
    throw error;
  }

  return { success: true };
}

// Seed helper: transfers all 15 default products to Supabase in one click
export async function seedDefaultCatalogToSupabase(): Promise<{ success: boolean; count: number; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, count: 0, error: 'Supabase credentials not configured' };
  }

  try {
    for (const prod of PRODUCTS) {
      // Insert product
      const { error: prodErr } = await supabase.from('products').upsert(
        {
          id: prod.id,
          name: prod.name,
          tagline: prod.tagline,
          price: prod.price,
          original_price: prod.originalPrice || null,
          rating: prod.rating,
          reviews_count: prod.reviewsCount,
          category: prod.category,
          material: prod.material,
          hair_type: prod.hairType,
          badge: prod.badge || null,
          is_best_seller: Boolean(prod.isBestSeller),
          is_new: Boolean(prod.isNew),
          is_staff_pick: Boolean(prod.isStaffPick),
          stock_left: prod.stockLeft || 10,
          images: prod.images,
          description: prod.description,
          details: prod.details,
          care_instructions: prod.careInstructions,
        },
        { onConflict: 'id' }
      );

      if (prodErr) {
        console.error('Failed to insert product:', prod.id, prodErr);
      }

      // Insert color variants
      if (prod.colors && prod.colors.length > 0) {
        const colorRows = prod.colors.map((c) => ({
          product_id: prod.id,
          name: c.name,
          hex: c.hex,
          image: c.image || prod.images[0] || '',
        }));
        await supabase.from('product_colors').insert(colorRows);
      }

      // Insert reviews
      if (prod.reviews && prod.reviews.length > 0) {
        const reviewRows = prod.reviews.map((r) => ({
          product_id: prod.id,
          author: r.author,
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          hair_type: r.hairType,
          verified: r.verified,
        }));
        await supabase.from('reviews').insert(reviewRows);
      }
    }

    return { success: true, count: PRODUCTS.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message };
  }
}
