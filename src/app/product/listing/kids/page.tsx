import { CommonProductListing } from '@/components/ProductListing/ProductListing';
import { productByCategory } from '@/services/product/Product';

const KidsAllProducts = async () => {
  const getAllProducts = await productByCategory('kids');

  return <CommonProductListing data={getAllProducts && getAllProducts.data} />;
};

export default KidsAllProducts;
