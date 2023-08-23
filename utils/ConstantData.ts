export const navOptions = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
  {
    id: 'listing',
    label: 'All Products',
    path: '/product/listing/all-products',
  },
  {
    id: 'listingMen',
    label: 'Men',
    path: '/product/listing/men',
  },
  {
    id: 'listingWomen',
    label: 'Women',
    path: '/product/listing/women',
  },
  {
    id: 'listingKids',
    label: 'Kids',
    path: '/product/listing/kids',
  },
] as const;

export const adminNavOptions = [
  {
    id: 'adminListing',
    label: 'Manage All Products',
    path: '/admin-view/all-product',
  },
  {
    id: 'adminNewProduct',
    label: 'Add New Product',
    path: '/admin-view/add-product',
  },
];
