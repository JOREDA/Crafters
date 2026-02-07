import { request } from './client';

export async function getAllProducts() {
  try {
    const products = await request('/api/products/');
    const categories = await request('/api/categories/');
    const catMap = new Map(categories.map(c => [c.id, c.name]));
    return products.map(p => ({
      ...p,
      categoryName: catMap.get(p.category) || null,
      imageUrl: p.images && p.images.length ? p.images[0].image_url : undefined,
      variants: p.variants || [],
    }));
  } catch (err) {
    throw err;
  }
}

export async function getProduct(id) {
  const p = await request(`/api/products/${id}/`);
  return p;
}
