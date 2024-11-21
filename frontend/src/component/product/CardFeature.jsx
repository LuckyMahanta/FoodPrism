import React from 'react';
import { addCartItem, increaseQty, decreaseQty, deleteCartItem } from '../redux/ProductSlide';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(state => state.product.cartItem);

  const handleAddCartProduct = (e) => {
    dispatch(addCartItem({
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image
    }));
  };

  const handleIncreaseCartProduct = () => {
    dispatch(increaseQty({ id }));
    toast.success("Quantity updated in cart.");
  };

  const handleDecreaseCartProduct = () => {
    const itemInCart = cartItem.find(item => item._id === id);
    if (itemInCart.qty === 1) {
      dispatch(deleteCartItem({ id }));
    } else {
      dispatch(decreaseQty({ id }));
      toast.success("Quantity updated in cart.");
    }
  };

  const itemInCart = cartItem.find(item => item._id === id);

  return (
    <div className='w-44 min-w-[250px] bg-white hover:shadow-2xl drop-shadow-lg py-5 px-4 rounded-lg flex flex-col '>
      {
        image ? <>
          <div className="h-28 flex flex-col justify-center items-center">
            <img src={image} alt='product' className='h-full' />
          </div>
          <h3 className='font-semibold text-center capitalize text-lg mt-4'>{name}</h3>
          <p className='text-center text-slate-500 capitalize'>{category}</p>
          <p className='text-center font-bold'><span className='text-red-400'>&#8377;</span> {price}</p>

          {itemInCart ? (
            <div className='flex gap-2 items-center justify-center'>
              <button className='bg-slate-300 w-7 h-7 rounded hover:bg-slate-400' onClick={() => handleDecreaseCartProduct(id)}>-</button>
              <p className='font-semibold p-1'>{itemInCart.qty}</p>
              <button className='bg-slate-300 w-7 h-7 rounded hover:bg-slate-400' onClick={() => handleIncreaseCartProduct(id)}>+</button>
            </div>
          ) : (
            <button className='bg-yellow-500 py-1 mt-2 rounded w-full hover:bg-orange-500 cursor-pointer' onClick={handleAddCartProduct}>Add to Cart</button>
          )}

        </>
          :
          <p className='flex justify-center items-center min-h-[210px]'>{loading}</p>
      }
    </div>
  );
}

export default CardFeature;
