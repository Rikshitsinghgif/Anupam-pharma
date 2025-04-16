import React from 'react';
import BaseButton from '../../../BaseButton';

const MultiCardDisplay = ({
  projectName,
  testimonials,
  getVisibleTestimonials,
  handlePrev,
  handleNext,
  textSecondary,
  corners,
  mainText,
  shadow,
}) => {
  return (
    <div className='flex flex-col items-center justify-center container mx-auto p-4 sm:p-8 md:p-12 lg:p-24 lg:px-0'>
      <div className='flex flex-col lg:flex-row justify-between items-center w-full mb-8 lg:mb-14'>
        <h2 className='text-2xl sm:text-3xl font-boldd text-center lg:text-left'>
          {mainText}
        </h2>
        <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4 lg:mt-0'>
          <BaseButton
            className=''
            type='reset'
            color='info'
            label='← Prev'
            outline
            onClick={handlePrev}
          />
          <BaseButton
            className=''
            type='reset'
            color='info'
            label='Next →'
            outline
            onClick={handleNext}
          />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row lg:justify-center lg:space-x-6 w-full items-stretch gap-6'>
        {getVisibleTestimonials().map((testimonial, index) => (
          <div
            key={index}
            className='flex flex-col items-center text-center flex-grow'
          >
            <div
              className={`${shadow} ${
                corners !== 'rounded-full' ? corners : 'rounded-3xl'
              } p-4 sm:p-6 md:p-8 lg:p-8 flex flex-col items-center text-center flex-grow shadow-md bg-gray-100`}
            >
              <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-2xl font-semibold mb-2'>
                Efficient Collaborating
              </h3>
              <p className={` ${textSecondary} mb-4 sm:mb-6 md:mb-8`}>
                {testimonial.text.replace(/\${projectName}/g, projectName)}
              </p>
            </div>
            <div className='text-center mt-4 sm:mt-6 md:mt-8 lg:mt-6'>
              <p className='font-bold text-lg sm:text-xl md:text-2xl lg:text-lg'>
                {testimonial.company}
              </p>
              <p
                className={`${textSecondary} text-sm sm:text-base md:text-lg lg:text-base`}
              >
                - {testimonial.user_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiCardDisplay;
