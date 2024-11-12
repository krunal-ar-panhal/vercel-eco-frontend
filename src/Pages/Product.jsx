import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import RelatedProduct from '../Components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const fetchProductData = () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  return productData ? (
    <div className="container mx-auto p-6  gap-8">
      <div className='flex flex-col lg:flex-row '>
      {/* Product Images */}
      <div className="lg:w-1/2 flex items-start gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4">
          {productData.image.map((item, index) => (
            <img
              key={index}
              onClick={() => setImage(item)}
              src={item}
              alt="Product Thumbnail"
              className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                image === item ? 'border-orange-500' : 'border-gray-200'
              }`}
            />
          ))}
        </div>
        
        {/* Main Image */}
        <div className="w-full">
          <img src={image} alt="Selected Product" className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 ml-6">
        <h1 className="text-3xl font-semibold text-gray-800">{productData.name}</h1>
        
        {/* Ratings */}
        <div className="flex items-center gap-1 mt-3">
          {[...Array(4)].map((_, i) => (
            <img key={i} src='./star_icon.png' alt="Star" className="w-4 h-4" />
          ))}
          <img src='./star_dull_icon.png' alt="Star" className="w-4 h-4" />
          <p className="text-gray-600 text-sm ml-2">(122)</p>
        </div>

        {/* Price */}
        <p className="mt-4 text-3xl font-bold text-orange-600">{currency} {productData.price}</p>
        
        {/* Description */}
        <p className="mt-4 text-gray-600">{productData.description}</p>

        {/* Size Selection */}
        <div className="mt-6">
          <p className="text-lg font-medium text-gray-700">Select Size</p>
          <div className="flex gap-2 mt-2">
            {productData.sizes.map((item, index) => (
              <button
                key={index}
                onClick={() => setSize(item)}
                className={`py-2 px-4 rounded-md border text-gray-700 ${
                  size === item ? 'border-orange-500 bg-orange-100' : 'border-gray-300 hover:bg-gray-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-8 py-3 px-6 rounded-md bg-black text-white font-semibold hover:bg-orange-600 transition active:bg-black">
          ADD TO CART
        </button>

        {/* Additional Product Details */}
        <hr className="my-8" />
        <div className="space-y-2 text-gray-600">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Nam sed urna ac risus dignissim convallis.</p>
        </div>
      </div>
      </div>
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen text-gray-500">Loading product...</div>
  );
};

export default Product;
