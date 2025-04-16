import React from 'react';
import BaseButton from '../../../BaseButton';

const HorizontalGallery = ({
  images,
  currentIndex,
  prevSlide,
  nextSlide,
  getPrevIndex,
  getNextIndex,
  mainText,
  corners,
}) => {
  return (
    <div className='container mx-auto p-4 sm:p-8 md:p-12 lg:p-24 lg:px-0'>
      <div className='flex flex-col lg:flex-row justify-between items-center mb-4 lg:mb-8'>
        <div className='text-2xl sm:text-3xl md:text-4xl lg:text-3xl font-bold text-center lg:text-left'>
          {mainText}
        </div>
        <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0'>
          <BaseButton
            className=''
            type='reset'
            color='info'
            label='← Prev'
            outline
            onClick={prevSlide}
          />
          <BaseButton
            className=''
            type='reset'
            color='info'
            label='Next →'
            outline
            onClick={nextSlide}
          />
        </div>
      </div>

      {/* Image section */}
      <div className='flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0'>
        <div className='w-full lg:w-1/3'>
          <img
            src={images[getPrevIndex()]?.src}
            alt='Previous'
            className={`w-full h-48 sm:h-60 md:h-96 object-cover ${
              corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
            }`}
          />
          <div className='flex justify-center w-full '>
            <a
              href={images[getPrevIndex()]?.photographer_url}
              className='text-[10px] sm:text-[8px]'
              target='_blank'
              rel='noreferrer'
            >
              Photo by {images[getPrevIndex()]?.photographer} on Pexels
            </a>
          </div>
        </div>

        <div className='w-full lg:w-1/3'>
          <img
            src={images[currentIndex]?.src}
            alt='Current'
            className={`w-full h-48 sm:h-60 md:h-96 object-cover ${
              corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
            }`}
          />
          <div className='flex justify-center w-full '>
            <a
              href={images[currentIndex]?.photographer_url}
              className='text-[10px] sm:text-[8px]'
              target='_blank'
              rel='noreferrer'
            >
              Photo by {images[currentIndex]?.photographer} on Pexels
            </a>
          </div>
        </div>

        <div className='w-full lg:w-1/3'>
          <img
            src={images[getNextIndex()]?.src}
            alt='Next'
            className={`w-full h-48 sm:h-60 md:h-96 object-cover ${
              corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
            }`}
          />
          <div className='flex justify-center w-full '>
            <a
              href={images[getNextIndex()]?.photographer_url}
              className='text-[10px] sm:text-[8px]'
              target='_blank'
              rel='noreferrer'
            >
              Photo by {images[getNextIndex()]?.photographer} on Pexels
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalGallery;
