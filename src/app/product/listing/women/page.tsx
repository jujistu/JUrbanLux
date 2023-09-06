import { CommonProductListing } from '@/components/ProductListing/ProductListing';
import { productByCategory } from '@/services/product/Product';

const WomenAllProducts = async () => {
  const getAllProducts = await productByCategory('women');

  return <CommonProductListing data={getAllProducts && getAllProducts.data} />;
};

export default WomenAllProducts;
