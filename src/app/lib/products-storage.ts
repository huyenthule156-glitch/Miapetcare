import { products as initialProducts } from '../data/products-data-new';
import type { Product } from '../data/products-data-new';

const PRODUCTS_STORAGE_KEY = 'miapet_products';

// Initialize products in localStorage with stock levels
export function initializeProducts(): void {
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!stored) {
    // Set initial stock levels
    const productsWithStock = initialProducts.map(p => ({
      ...p,
      stock: p.stock || 50, // Default 50 items per product
    }));
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(productsWithStock));
  }
}

// Get all products from storage
export function getAllProducts(): Product[] {
  initializeProducts();
  const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!stored) return initialProducts;
  return JSON.parse(stored);
}

// Get product by ID
export function getProductById(id: number): Product | undefined {
  const products = getAllProducts();
  return products.find(p => p.id === id);
}

// Update product stock
export function updateProductStock(productId: number, quantityChange: number): boolean {
  const products = getAllProducts();
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) {
    console.log(`❌ Product ${productId} not found`);
    return false;
  }
  
  const currentStock = products[productIndex].stock || 0;
  const newStock = currentStock + quantityChange;
  
  console.log(`📊 Product ${productId}: ${currentStock} → ${newStock}`);
  
  // Don't allow negative stock
  if (newStock < 0) {
    console.log(`❌ Cannot reduce stock below 0 for product ${productId}`);
    return false;
  }
  
  products[productIndex].stock = newStock;
  products[productIndex].inStock = newStock > 0;
  
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  
  // Dispatch custom event to notify components in same tab
  window.dispatchEvent(new CustomEvent('products-updated', { 
    detail: { productId, oldStock: currentStock, newStock } 
  }));
  
  return true;
}

// Reduce stock when order is placed
export function reduceStock(productId: number, quantity: number): boolean {
  console.log(`🔻 Giảm stock: Product ID ${productId}, Số lượng: ${quantity}`);
  const result = updateProductStock(productId, -quantity);
  if (result) {
    // Trigger storage event for other tabs/components
    window.dispatchEvent(new Event('storage'));
    console.log(`✅ Đã giảm stock cho product ${productId}`);
  } else {
    console.log(`❌ Không thể giảm stock cho product ${productId}`);
  }
  return result;
}

// Increase stock (for order cancellation or restocking)
export function increaseStock(productId: number, quantity: number): boolean {
  console.log(`🔺 Tăng stock: Product ID ${productId}, Số lượng: ${quantity}`);
  const result = updateProductStock(productId, quantity);
  if (result) {
    // Trigger storage event for other tabs/components
    window.dispatchEvent(new Event('storage'));
    console.log(`✅ Đã tăng stock cho product ${productId}`);
  } else {
    console.log(`❌ Không thể tăng stock cho product ${productId}`);
  }
  return result;
}

// Update product details (for admin)
export function updateProduct(productId: number, updates: Partial<Product>): boolean {
  const products = getAllProducts();
  const productIndex = products.findIndex(p => p.id === productId);
  
  if (productIndex === -1) return false;
  
  products[productIndex] = { ...products[productIndex], ...updates };
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  return true;
}