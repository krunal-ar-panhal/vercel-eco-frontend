import React from 'react';

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-gray-600'>
        <div>
          <img src='./logo.png' className='mb-5 w-32' alt="Company Logo" />
          <p className='w-full md:w-2/3'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1'>
            <li>contact</li>
            <li>Social</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@forever.com - All Righr Resrved</p>
      </div>
    </div>
  );
};

export default Footer;
