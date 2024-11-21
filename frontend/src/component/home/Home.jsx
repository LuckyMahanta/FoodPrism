import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import chef from '../../images/chef.png';
import HomeCard from './HomeCard';

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCardList = productData.slice(1, 5);
  const loadingArray = new Array(4).fill(null);

  return (
    <div className='pt-24'>
      <div className="p-2 md:p-4">
        <div>
          <div className='flex'>
            <h2 className="text-sm 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-2xl font-bold pt-3 lg:pt-10 md:pt-10">
              Short on time to cook? <br /> <br />
              <span className=' px-10 lg:px-18 md:px-14 text-orange-500'>We've got your cravings covered...</span>
            </h2>
            <img src={chef} alt="chef_pic" className='h-[120px] 2xl:h-[300px] xl:h-[300px] lg:h-[460px] md:h-[250px] sm:h-[120px] flex items-right' />
          </div>
          <div className='flex flex-wrap gap-5 p-4 justify-center'>
            {homeProductCardList[0] ? (
              homeProductCardList.map(el => (
                <HomeCard
                  key={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              ))
            ) : (
              loadingArray.map((el, index) => (
                <HomeCard
                  key={index}
                  loading={"loading..."}
                />
              ))
            )}
          </div>
          <div className="flex flex-row px-24 justify-center">
            <Link to={"/menu"}>
              <button className='font-bold bg-orange-500 text-white md:px-4 py-2 px-2 rounded-lg hover:bg-orange-600'>
                Order Now
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
