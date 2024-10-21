// common/Brand.jsx
import React from 'react';
import Logo from '../common/Logo';

const Brand = () => {
  return (
    <div className="flex items-center space-x-3">
      <Logo />
      <h1 className="text-xl font-bold">Handcrafted Haven</h1>
    </div>
  );
};

export default Brand;
