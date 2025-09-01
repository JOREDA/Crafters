import { essentialProducts } from './products/essential';
import { lampShadeProducts } from './products/lampShade';
import { laundryBinProducts } from './products/laundryBin';
import { storageBoxProducts } from './products/storageBox';
import { homeDecorProducts } from './products/homeDecor';
import { flowerVaseProducts } from './products/flowerVase';

// Combine all products with their respective categories
const allProducts = [
  ...essentialProducts.map(product => ({ ...product, category: 'Essential' })),
  ...lampShadeProducts.map(product => ({ ...product, category: 'Lamp Shade' })),
  ...laundryBinProducts.map(product => ({ ...product, category: 'Laundry Bin' })),
  ...storageBoxProducts.map(product => ({ ...product, category: 'Storage Box' })),
  ...homeDecorProducts.map(product => ({ ...product, category: 'Home Decor' })),
  ...flowerVaseProducts.map(product => ({ ...product, category: 'Flower Vase' }))
];

export default allProducts; 