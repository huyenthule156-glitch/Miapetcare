// ============================================
// PRODUCTS DATA - Production Ready
// ============================================
// All figma:asset imports have been replaced with placeholder images
// for deployment to Vercel. Replace with actual product images later.

import { DEFAULT_PRODUCT_IMAGE } from "../utils/placeholder-image";

// Use placeholder for all product images
const placeholderImg = DEFAULT_PRODUCT_IMAGE;

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: 'food' | 'toy' | 'accessory' | 'medicine' | 'hygiene' | 'fashion';
  petType: 'dog' | 'cat' | 'both';
  image: string;
  inStock: boolean;
  stock?: number;
  status?: 'available' | 'out-of-stock';
}

// Category and Pet Type definitions for filters
export const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'food', name: 'Thức ăn' },
  { id: 'toy', name: 'Đồ chơi' },
  { id: 'accessory', name: 'Phụ kiện' },
  { id: 'medicine', name: 'Thuốc & Vitamin' },
  { id: 'hygiene', name: 'Vệ sinh' },
  { id: 'fashion', name: 'Thời trang' }
];

export const petTypes = [
  { id: 'all', name: 'Tất cả' },
  { id: 'dog', name: 'Chó' },
  { id: 'cat', name: 'Mèo' },
  { id: 'both', name: 'Chó & Mèo' }
];

export const products: Product[] = [
  // Thức ăn cho chó
  { id: 1, name: "Thức ăn dinh dưỡng ANF AD27 cho chó mọi lứa tuổi", price: 850000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 2, name: "Thức ăn ANF Holistic dinh dưỡng Chuẩn Âu dành cho chó mọi lứa tuổi", price: 950000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 3, name: "Pate lon 400g A Pro gà nấu nhuyễn cho chó trưởng thành", price: 45000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 4, name: "Pate lon 400g A Pro bò nấu nhuyễn cho chó trưởng thành", price: 45000, originalPrice: 58000, discount: 22, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 5, name: "Pate lon 400g A Pro bò viên nấu sốt cho chó trưởng thành", price: 45000, originalPrice: 58000, discount: 22, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 6, name: "Pate lon 400g A Pro gà viên nấu sốt cho chó trưởng thành", price: 45000, originalPrice: 58000, discount: 22, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 7, name: "Thức ăn cao cấp Maxime Elite Puppy and Mother cho chó con và chó mẹ nhiều protein gói 1.5kg", price: 250000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 8, name: "Thức ăn Maxime Puppy Rich in Chicken cho chó con giàu thịt gà gói 1.5kg", price: 230000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 9, name: "Thức ăn Maxime Adult With Beef cho chó trưởng thành vị thịt bò", price: 220000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 10, name: "Thức ăn hạt Today's dinner cho chó mọi lứa tuổi", price: 180000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 43, name: "Pate Hug gói 120g Lamb vị thịt cừu cho chó", price: 25000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 44, name: "Pate Hug gói 120g Lamb And Vegetable vị thịt cừu và rau cho chó", price: 25000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 45, name: "Pate Hug gói 120g Chicken With Sweet Potato vị gà và khoai lang cho chó", price: 25000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 46, name: "Pate Hug gói 120g Chicken With Pumpkin vị gà và bí ngô cho chó", price: 25000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 47, name: "Pate Hug lon 400g Chicken With Beef Liver vị gà và gan bò cho chó", price: 45000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 48, name: "Pate Hug lon 400g Chicken vị gà cho chó", price: 45000, category: 'food', petType: 'dog', image: placeholderImg, inStock: true },
  
  // Thức ăn cho mèo
  { id: 11, name: "Súp thưởng WOW gói 6 thanh", price: 35000, category: 'food', petType: 'both', image: placeholderImg, inStock: true },
  { id: 12, name: "Sữa non Colostrum Petilac cho mèo", price: 120000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 13, name: "Bánh thưởng mèo dạng kem Me-O vị gà, gan và sữa dê - Me-O Creamy Treats gói 4 thanh", price: 25000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 14, name: "Bánh thưởng mèo dạng kem Me-O vị cá ngừ và cà chua - Me-O Creamy Treats gói 4 thanh", price: 25000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 15, name: "Pate Snappy Tom Gourmers gói 70g Chicken with Spinach vị gà và rau chân vịt cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 16, name: "Pate Snappy Tom Gourmers gói 70g Chicken with Pumpkin vị gà và bí đỏ cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 17, name: "Pate Snappy Tom Gourmers gói 70g Chicken with Broccoli v�� gà và bông cải xanh cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 18, name: "Pate lon WOW 85g cho mèo vị thịt gà và lòng đỏ trứng", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 19, name: "Pate lon WOW 85g cho mèo vị thịt gà và thịt vịt", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 20, name: "Pate lon WOW 85g cho mèo vị thịt gà và cỏ mèo", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 21, name: "Pate lon WOW 85g cho mèo vị thịt gà và đậu xanh", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 22, name: "Pate lon WOW 85g cho mèo vị thịt gà và cà rốt", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 23, name: "Pate lon WOW 85g cho mèo vị thịt gà và bí ngô", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 24, name: "Thức ăn hạt Wonder Cats cho mèo mọi lứa tuổi", price: 165000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 25, name: "Thức ăn Cuties Catz Seafood vị hải sản cho mèo trưởng thành", price: 175000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 26, name: "Thức ăn Cuties Catz Tuna vị cá ngừ cho mèo trưởng thành", price: 175000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 27, name: "Pate lon 400g Snappy Tom Real Fish Chicken With Salmon In Gravy gà và cá hồi trong sốt cho mèo", price: 35000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 28, name: "Pate lon 400g Snappy Tom Real Fish Chicken With Tuna Flakes gà và cá ngừ xé cho mèo", price: 35000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 29, name: "Pate lon 400g Snappy Tom Real Fish Tuna With Sardine Chunk cá ngừ và cá trích cắt khúc cho mèo", price: 35000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 30, name: "Xúc xích cho chó mèo Taotao", price: 15000, category: 'food', petType: 'both', image: placeholderImg, inStock: true },
  { id: 31, name: "Pate lon 400g Me-O Tuna In Jelly cho mèo trưởng thành vị cá ngừ nấu đông", price: 32000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 32, name: "Pate lon 400g Me-O Seafood In Jelly cho mèo trưởng thành vị hải sản nấu đông", price: 32000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 33, name: "Pate lon 400g Me-O Sardine In Jelly cho mèo trưởng thành vị cá mèo nấu đông", price: 32000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 34, name: "Pate lon 400g Me-O Mackerel With Sardine cho mèo trưởng thành vị cá thu và cá mèo", price: 32000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 35, name: "Pate Snappy Tom Gourmers gói 70g Tuna With Fish Roe vị cá ngừ và trứng cá cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 36, name: "Pate Snappy Tom Gourmers gói 70g Tuna With Egg vị cá ngừ và trứng cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 37, name: "Pate Snappy Tom Gourmers gói 70g Tuna With Goji Berry vị cá ngừ và quả KT cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 38, name: "Pate Snappy Tom Gourmers gói 70g Tuna With Aloe Vera vị cá ngừ và nha đam cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 39, name: "Pate Snappy Tom Gourmers gói 70g Tuna With Kiwi vị cá ngừ và kiwi cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 40, name: "Pate Snappy Tom Gourmers gói 70g Tuna With Apple vị cá ngừ và táo cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 41, name: "Pate Snappy Tom Gourmers gói 70g Tuna With Mango vị cá ngừ và xoài cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 42, name: "Pate Snappy Tom Gourmers gói 70g Tuna With Pineapple vị cá ngừ và dưa cho mèo", price: 18000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 49, name: "Pate Kucinta lon 400g Chunky Sardines vị cá mèo trích cắt khúc cho mèo", price: 45000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 50, name: "Pate gói 85g Snappy Tom Tuna And Shrimp In Jelly vị cá ngừ và tôm trong sốt cho mèo", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 51, name: "Pate gói 85g Snappy Tom Tuna In Jelly vị cá ngừ trong sốt cho mèo", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 52, name: "Pate gói 85g Snappy Tom Pilchard And Snapper In Jelly vị cá mèo và cá hàng trong sốt cho mèo", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 53, name: "Pate gói 85g Snappy Tom Pilchard And White Fish In Jelly vị cá mèo và cá trắng trong sốt cho mèo", price: 22000, category: 'food', petType: 'cat', image: placeholderImg, inStock: true },
  
  // Phụ kiện
  { id: 56, name: "Bát ăn chống gù chân voi cho chó mèo", price: 85000, category: 'accessory', petType: 'both', image: placeholderImg, inStock: true },
  { id: 57, name: "Bát ăn chống gù bốn chân có thể tách rời cho chó mèo", price: 95000, category: 'accessory', petType: 'both', image: placeholderImg, inStock: true },
  { id: 58, name: "Bát ăn tự động nạp thức ăn cho chó mèo", price: 150000, category: 'accessory', petType: 'both', image: placeholderImg, inStock: true },
  { id: 59, name: "Bát inox chống tràn trật cho chó mèo", price: 120000, category: 'accessory', petType: 'both', image: placeholderImg, inStock: true },
  { id: 65, name: "Vòng cổ phản quang cho chó mèo", price: 35000, category: 'accessory', petType: 'both', image: placeholderImg, inStock: true },
  { id: 66, name: "Vòng cổ da có chuông cho chó mèo", price: 30000, category: 'accessory', petType: 'both', image: placeholderImg, inStock: true },
  
  // Đồ chơi
  { id: 69, name: "Đồ chơi bóng tự lăn và phát sáng cho chó mèo", price: 45000, category: 'toy', petType: 'both', image: placeholderImg, inStock: true },
  { id: 70, name: "Đồ chơi cần câu móng con lăn cho mèo", price: 35000, category: 'toy', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 71, name: "Đồ chơi cần gậm dây thừng bện cà rốt", price: 40000, category: 'toy', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 72, name: "Tháp bóng 3 tầng đồ chơi mèo", price: 120000, category: 'toy', petType: 'cat', image: placeholderImg, inStock: true },
  
  // Sức khỏe
  { id: 75, name: "Thanh nhai vị bơ và sữa làm sạch răng thơm miệng 7 Dental Effects 160g cho chó", price: 65000, category: 'medicine', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 76, name: "Thanh nhai vị thịt bò nướng làm sạch răng thơm miệng 7 Dental Effects 160g cho chó", price: 65000, category: 'medicine', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 77, name: "Thanh nhai vị bò đậu phộng làm sạch răng thơm miệng 7 Dental Effects 160g cho chó", price: 65000, category: 'medicine', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 78, name: "Thanh bánh thưởng Dental Health cho chó mèo", price: 45000, category: 'medicine', petType: 'both', image: placeholderImg, inStock: true },
  { id: 79, name: "Thanh xương gặm sạch răng cho chó Mutton Flavor 7 Dental Bone 100g vị thịt cừu", price: 55000, category: 'medicine', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 80, name: "Xương da bò ép làm sạch răng cho chó", price: 75000, category: 'medicine', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 81, name: "Thanh nhai vị sữa làm sạch răng thơm miệng 7 Dental Effects 160g cho chó", price: 65000, category: 'medicine', petType: 'dog', image: placeholderImg, inStock: true },
  
  // Vệ sinh
  { id: 82, name: "Khay vệ sinh mèo thành cao cửa hở", price: 180000, category: 'hygiene', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 83, name: "Sữa tắm cho mèo YOJI hương trái cây và trà", price: 85000, category: 'hygiene', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 84, name: "Khay vệ sinh vuông thành trong suốt cho mèo", price: 160000, category: 'hygiene', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 85, name: "Sữa tắm tinh dầu Endi cho chó loại 1", price: 95000, category: 'hygiene', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 86, name: "Lược chải lông cao cấp Pakeway", price: 75000, category: 'hygiene', petType: 'both', image: placeholderImg, inStock: true },
  { id: 87, name: "Lược chải lông có nút dây lông rụng", price: 65000, category: 'hygiene', petType: 'both', image: placeholderImg, inStock: true },
  { id: 88, name: "Lược chải lông nút bấm có một lỗi bị bẻ", price: 45000, category: 'hygiene', petType: 'both', image: placeholderImg, inStock: true },
  { id: 89, name: "Hạt than hoạt tính khử mùi hôi cho nhà vệ sinh cát mèo", price: 55000, category: 'hygiene', petType: 'cat', image: placeholderImg, inStock: true },
  { id: 90, name: "Xịt khử mùi sát khuẩn nano BC cho chó mèo 300ml", price: 120000, category: 'hygiene', petType: 'both', image: placeholderImg, inStock: true },
  { id: 91, name: "Tấm giấy lót vệ sinh than hoạt tính đono cho chó mèo", price: 100000, category: 'hygiene', petType: 'both', image: placeholderImg, inStock: true },
  { id: 92, name: "Cát vệ sinh mèo Katz hàng nhập khẩu", price: 150000, category: 'hygiene', petType: 'cat', image: placeholderImg, inStock: true },
  
  // Thời trang
  { id: 95, name: "Dây dắt yếm đính dâu tây", price: 85000, category: 'fashion', petType: 'both', image: placeholderImg, inStock: true },
  { id: 96, name: "Dây dắt áo ngực có balo thêu hình N cho chó", price: 120000, category: 'fashion', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 97, name: "Dây dắt kiểu áo vest có balo gấu cute", price: 135000, category: 'fashion', petType: 'both', image: placeholderImg, inStock: true },
  { id: 98, name: "Dây dắt dài có balo gấu cute", price: 115000, category: 'fashion', petType: 'both', image: placeholderImg, inStock: true },
  { id: 99, name: "Áo khoác cotton đùng máy caro cao cấp cho chó", price: 145000, category: 'fashion', petType: 'dog', image: placeholderImg, inStock: true },
  { id: 100, name: "Váy công chúa kẻ sọc 4 mùa cho chó mèo", price: 95000, category: 'fashion', petType: 'both', image: placeholderImg, inStock: true },
];
