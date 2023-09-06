import Cookies from 'js-cookie';

type line_items = {
  price_data: {
    currency: string;
    product_data: {
      images: string[];
      name: string;
    };
    unit_amount: number;
  };
  quantity: number;
}[];

export const callStripeSession = async (formData: line_items) => {
  try {
    const response = await fetch('/api/stripePay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
