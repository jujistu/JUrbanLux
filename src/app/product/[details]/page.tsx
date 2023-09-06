import { ProductDetails } from '@/components/productDetails/ProductDetails';
import { productById } from '@/services/product/Product';

const ProductDetail = async ({ params }: any) => {
  const productDetailsData = await productById(params.details); //params.details is the corresponding ID

  return (
    <ProductDetails item={productDetailsData && productDetailsData.data} />
  );
};

export default ProductDetail;
