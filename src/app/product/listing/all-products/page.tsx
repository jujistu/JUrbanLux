import { CommonProductListing } from '@/components/ProductListing/ProductListing';
import { getAllAdminProducts } from '@/services/product/Product';

const AllProducts = async () => {
  const getAllProducts = await getAllAdminProducts();

  return <CommonProductListing data={getAllProducts && getAllProducts.data} />;
};

export default AllProducts;
