import { CommonProductListing } from '@/components/ProductListing/ProductListing';
import { productByCategory } from '@/services/product/Product';

const MenAllProducts = async () => {
  const getAllProducts = await productByCategory('men');

  return <CommonProductListing data={getAllProducts && getAllProducts.data} />;
};

export default MenAllProducts;
