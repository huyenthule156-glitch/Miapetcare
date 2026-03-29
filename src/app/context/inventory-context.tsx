import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { products as initialProducts } from '../data/products-data-new';
import { mainServices as initialMainServices, additionalServices as initialAdditionalServices, vipPackages as initialVIPPackages, dyeServices as initialDyeServices } from '../data/services-data';
import type { Product } from '../data/products-data-new';
import type { Service, AdditionalService, VIPPackage, DyeService } from '../data/services-data';
import { getAllProducts, updateProduct as updateProductStorage } from '../lib/products-storage';

interface InventoryContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  
  // Services
  mainServices: Service[];
  additionalServices: AdditionalService[];
  vipPackages: VIPPackage[];
  dyeServices: DyeService[];
  addMainService: (service: Service) => void;
  updateMainService: (id: number, service: Partial<Service>) => void;
  deleteMainService: (id: number) => void;
  addAdditionalService: (service: AdditionalService) => void;
  updateAdditionalService: (id: number, service: Partial<AdditionalService>) => void;
  deleteAdditionalService: (id: number) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  // Load products from localStorage
  const [products, setProducts] = useState<Product[]>([]);
  const [mainServices, setMainServices] = useState<Service[]>(initialMainServices);
  const [additionalServices, setAdditionalServices] = useState<AdditionalService[]>(initialAdditionalServices);
  const [vipPackages, setVIPPackages] = useState<VIPPackage[]>(initialVIPPackages);
  const [dyeServices, setDyeServices] = useState<DyeService[]>(initialDyeServices);

  // Load products on mount and when storage changes
  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = getAllProducts();
      console.log('📦 Loading products from storage:', storedProducts.length);
      setProducts(storedProducts);
    };
    
    loadProducts();
    
    // Listen for custom products-updated event
    const handleProductsUpdated = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('🔄 Products updated event:', customEvent.detail);
      loadProducts();
    };
    
    // Listen for storage changes (for cross-tab updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'miapet_products' || e.key === null) {
        console.log('🔄 Storage changed (cross-tab), reloading products');
        loadProducts();
      }
    };
    
    window.addEventListener('products-updated', handleProductsUpdated);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('products-updated', handleProductsUpdated);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Product methods
  const addProduct = (product: Product) => {
    const newProduct = {
      ...product,
      stock: product.stock || 50,
    };
    updateProductStorage(product.id, newProduct);
    setProducts(getAllProducts());
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    updateProductStorage(id, updatedProduct);
    setProducts(getAllProducts());
  };

  const deleteProduct = (id: number) => {
    // For now, just mark as out of stock
    updateProductStorage(id, { stock: 0, inStock: false });
    setProducts(getAllProducts());
  };

  // Main Service methods
  const addMainService = (service: Service) => {
    setMainServices(prev => [...prev, service]);
  };

  const updateMainService = (id: number, updatedService: Partial<Service>) => {
    setMainServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedService } : s));
  };

  const deleteMainService = (id: number) => {
    setMainServices(prev => prev.filter(s => s.id !== id));
  };

  // Additional Service methods
  const addAdditionalService = (service: AdditionalService) => {
    setAdditionalServices(prev => [...prev, service]);
  };

  const updateAdditionalService = (id: number, updatedService: Partial<AdditionalService>) => {
    setAdditionalServices(prev => prev.map(s => s.id === id ? { ...s, ...updatedService } : s));
  };

  const deleteAdditionalService = (id: number) => {
    setAdditionalServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        mainServices,
        additionalServices,
        vipPackages,
        dyeServices,
        addMainService,
        updateMainService,
        deleteMainService,
        addAdditionalService,
        updateAdditionalService,
        deleteAdditionalService,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}