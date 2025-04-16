import React from 'react';
import BaseButton from '../../../BaseButton';
import { TestimonialsDesigns } from '../../designs';

const HorizontalCarousel = ({
  projectName,
  testimonials,
  currentIndex,
  handlePrev,
  handleNext,
  design,
  websiteSectionStyle,
  textSecondary,
  iconsColor,
}) => {
  return (
    <div className='flex flex-col items-center justify-center container mx-auto p-4 sm:p-8 md:p-24 md:px-0'>
      <div className='flex items-center px-4 justify-between w-full overflow-x-auto'>
        <BaseButton
          className={`    flex-shrink-0`}
          type='reset'
          color={`info`}
          label='←'
          outline={
            design === TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY
              ? false
              : true
          }
          onClick={handlePrev}
        />

        <div
          className={` ${
            design === TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY
              ? ' text-white '
              : ' text-black'
          }  text-center p-4 sm:p-8 md:p-12 flex-grow`}
        >
          <p
            className={` ${
              design === TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY
                ? ' '
                : iconsColor
            } text-4xl sm:text-5xl md:text-7xl font-bold`}
          >
            “
          </p>
          <p className='text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10'>
            {testimonials[currentIndex].text.replace(
              /\${projectName}/g,
              projectName,
            )}
          </p>
          <h3 className='font-bold text-base sm:text-lg md:text-xl'>
            {testimonials[currentIndex].company}
          </h3>
          <p
            className={`${
              design === TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY
                ? '  '
                : textSecondary
            }`}
          >
            - {testimonials[currentIndex].user_name}
          </p>
        </div>

        <BaseButton
          className={`    flex-shrink-0`}
          type='reset'
          color={`info`}
          label='→'
          outline={
            design === TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY
              ? false
              : true
          }
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default HorizontalCarousel;
