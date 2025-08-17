import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext'; 
import Title from '../Components/Title'
import ProductItem from '../Components/ProductItem'
import { ProductContext } from '../Context/productContext';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ProductContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => item.category === category);
      productsCopy = productsCopy.filter((item) => item.subCategory === subCategory);
      setRelated(productsCopy.slice(0, 5));
      console.log("related products data",productsCopy.slice(0, 5));
      
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
  <div className='text-center text-3xl py-2'>
    <Title text1={'RELATED'} text2={'PRODUCTS'} />
  </div>
  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
    {related.map((item, index) => (
      <ProductItem
        key={index}
        id={item._id}
        name={item.name}
        price={item.price}
        image={item.image} 
      />
    ))}
  </div>
</div>

  );
};

export default RelatedProduct;
