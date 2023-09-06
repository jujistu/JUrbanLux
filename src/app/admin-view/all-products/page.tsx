import { CommonProductListing } from '@/components/ProductListing/ProductListing';
import { getAllAdminProducts } from '@/services/product/Product';

const AdminAllProducts = async () => {
  const allAdminProduct = await getAllAdminProducts();

  return (
    <CommonProductListing data={allAdminProduct && allAdminProduct.data} />
  );
};

export default AdminAllProducts;
