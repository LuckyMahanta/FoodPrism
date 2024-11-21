import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartProduct from './CartProduct';
import emptyCartImage from '../../images/empty-cart.gif';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom'
import { clearCart } from './CartActions';

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);

  const totalQuantity = productCartItem.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = productCartItem.reduce((acc, item) => acc + Number(item.total), 0);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePayment = async () => {
    if (user.email) {
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      console.log("Sending request:", { userId: user._id, productCartItem });
  
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId: user._id, productCartItem })
        });
  
        const data = await res.json();
        console.log("Response from server:", data); 
  
        if (res.status === 200) {
          toast.loading("Redirecting to Payment Gateway...");
          stripe.redirectToCheckout({ sessionId: data.id });

          dispatch(clearCart());
        } else {
          toast.error("Payment initiation failed. Please try again.");
        }
      } catch (error) {
        console.error("Error initiating payment:", error);
        toast.error("Error initiating payment. Please try again later.");
      }
    } else {
      toast("Please Login");
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  };
  
  return (
    <>
      <div className='pt-24'>
        <div className='p-3 xl:p-4'>
          <h2 className='text-lg 2xl:text-3xl xl:text-3xl font-bold text-slate-600'>Your Cart Items</h2>
          {productCartItem.length > 0 ? (
            <div className='my-4 flex md:flex-col sm:flex-col gap-3'>
              {/* Display cart items */}
              <div className='w-full max-w-3xl space-y-2 max-h-[430px] overflow-y-auto' style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255, 255, 255, 0.4) rgba(0, 0, 0, 0.4)' }}>
                {productCartItem.map((el) => (
                  <CartProduct
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    total={el.total}
                    price={el.price}
                  />
                ))}
              </div>

              {/* Display total cart items */}
              <div className='w-full lg:w-1/3 xl:w-1/3 ml-auto'>
                <h2 className='bg-orange-400 text-slate-700 p-2 text-lg font-bold'>Summary</h2>
                <div className='flex justify-between text-lg py-2 border-b border-slate-600'>
                  <p>Total Quantity:</p>
                  <span className='font-bold'>{totalQuantity}</span>
                </div>
                <div className='flex justify-between text-lg py-2 border-b border-slate-600'>
                  <p>Total Price:</p>
                  <span className='font-bold'><span className='text-red-400'>&#8377;</span> {totalPrice}</span>
                </div>
                <button className='bg-red-500 text-lg font-bold w-full hover:bg-red-700 mt-4 py-2' onClick={handlePayment}>Payment</button>
              </div>
            </div>
          ) : (
            <div className='flex justify-center items-center flex-col'>
              <img src={emptyCartImage} className='w-full max-w-sm' alt="Empty Cart" />
              <p className='text-slate-600 text-3xl font-bold'>Your Cart is Empty</p>
            </div>
          )}
        </div>
      </div>
    </>

  );
};

export default Cart;
