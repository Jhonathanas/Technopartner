import React from 'react';
import { Link } from 'react-router-dom';

const Footbar = () => {
  return (
    <footer className='fixed bottom-0 left-0 right-0 bg-gray-300 flex justify-evenly items-center p-3 shadow-md'>
      <Link to={'/'}>
        <img src="/src/assets/home1.png" alt="Home" className='w-12 h-12 hover:opacity-80 transition-opacity duration-200' />
      </Link>
      <Link to={'/menu'}>
        <img src="/src/assets/menu1.png" alt="Menu" className='w-12 h-12 hover:opacity-80 transition-opacity duration-200' />
      </Link>
    </footer>
  );
}

export default Footbar;
