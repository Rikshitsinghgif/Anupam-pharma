import React from 'react';

const OverlappingGallery = ({
  images,
  currentIndex,
  prevSlide,
  nextSlide,
  getPrevIndex,
  getNextIndex,
  mainText,
  corners,
}) => {
  const applyLeftCorner = (corners) => {
    if (corners === 'rounded-full') {
      return 'rounded-l-2xl';
    }
    if (corners.startsWith('rounded-lg')) {
      return 'rounded-l-lg';
    }
    if (corners.startsWith('rounded-md')) {
      return 'rounded-l-md';
    }
    if (corners.startsWith('rounded-sm')) {
      return 'rounded-l-sm';
    }
    if (corners.startsWith('rounded-xl')) {
      return 'rounded-l-xl';
    }
    if (corners.startsWith('rounded')) {
      return 'rounded-l';
    }
    return corners;
  };

  const applyRightCorner = (corners) => {
    if (corners === 'rounded-full') {
      return 'rounded-r-2xl';
    }
    if (corners.startsWith('rounded')) {
      return corners.replace('rounded', 'rounded-r');
    }
    return corners.replace('rounded-', 'rounded-r-');
  };
  const buttonCornersLeft = applyLeftCorner(corners);
  const buttonCornersRight = applyRightCorner(corners);
  return (
    <div className='container mx-auto py-24 overflow-hidden'>
      <div className='pb-8 text-3xl font-bold text-center'>{mainText}</div>
      <div className='flex justify-center items-center w-full'>
        <div className='flex justify-between items-center w-full'>
          <div className='left-0 transform translate-x-1/4 scale-90 z-10 overflow-hidden'>
            <img
              src={images[getPrevIndex()]?.src}
              alt='Previous'
              className={`w-full ${
                corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
              }  h-80 object-cover  opacity-60`}
            />
            <div className='flex justify-center w-full '>
              <a
                href={images[getNextIndex()]?.photographer_url}
                className='text-[8px]'
                target='_blank'
                rel='noreferrer'
              >
                Photo by {images[getNextIndex()]?.photographer} on Pexels
              </a>
            </div>
          </div>
          <div className='flex items-center lg:w-full z-20'>
            <button
              onClick={prevSlide}
              className={`${buttonCornersLeft} bg-blue-700 text-white  h-16 z-30 p-2 bg-blue-700 focus:outline-none`}
            >
              <span className=' text-xl'>&larr;</span>
            </button>
            <div className='lg:w-full'>
              <img
                src={images[currentIndex]?.src}
                alt='Current'
                className={`w-full ${
                  corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
                } h-96 w-2/3 object-cover  shadow-lg`}
              />
              <div className='flex justify-center w-full '>
                <a
                  href={images[getNextIndex()]?.photographer_url}
                  className='text-[8px]'
                  target='_blank'
                  rel='noreferrer'
                >
                  Photo by {images[getNextIndex()]?.photographer} on Pexels
                </a>
              </div>
            </div>
            <button
              onClick={nextSlide}
              className={`${buttonCornersRight} bg-blue-700 text-white  h-16 z-30 p-2 bg-blue-700 focus:outline-none`}
            >
              <span className=' text-xl'>&rarr;</span>
            </button>
          </div>
          <div className='-translate-x-1/4 scale-90 z-10 overflow-hidden'>
            <img
              src={images[getNextIndex()]?.src}
              alt='Next'
              className={`w-full h-80 object-cover ${
                corners != 'rounded-full' ? `${corners}` : 'rounded-3xl'
              }  opacity-60`}
            />
            <div className='flex justify-center w-full '>
              <a
                href={images[getNextIndex()]?.photographer_url}
                className='text-[8px]'
                target='_blank'
                rel='noreferrer'
              >
                Photo by {images[getNextIndex()]?.photographer} on Pexels
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlappingGallery;
