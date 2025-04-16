import React from 'react';
import BaseButton from '../../../BaseButton';

const HeroTextCenter = ({ mainText, subTitle, buttonText, textSecondary }) => (
  <div className='relative w-full h-auto flex items-center justify-center text-center'>
    <div className='absolute top-0 mt-2 left-0 w-full h-2/3 bg-gradient-to-b from-blue-700 to-transparent filter blur-lg opacity-25 z-0'></div>
    <div className='relative container z-10 my-40 p-8 md:p-16 '>
      <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-4  '>
        {mainText}
      </h1>
      <p className={`text-sm mb-8 ${textSecondary}`}>{subTitle}</p>
      <BaseButton
        href='/login'
        label={`${buttonText}`}
        color='info'
        className=' px-4 sm:px-6 py-2 '
      />
    </div>
  </div>
);

export default HeroTextCenter;
