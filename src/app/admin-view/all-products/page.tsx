import { CommonProductListing } from '@/components/ProductListing/ProductListing';
import { getAllAdminProducts } from '@/services/product/Product';

const AdminAllProducts = async () => {
  const AllAdminProduct = await getAllAdminProducts();

  console.log(AllAdminProduct);

  return (
    <CommonProductListing data={AllAdminProduct && AllAdminProduct.data} />
  );
};

export default AdminAllProducts;
