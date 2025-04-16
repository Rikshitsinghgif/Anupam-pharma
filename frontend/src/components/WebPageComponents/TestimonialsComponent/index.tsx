// TestimonialsSection.js
import React, { useEffect, useState } from 'react';
import HorizontalCarousel from './designs/HorizontalCarousel';
import MultiCardDisplay from './designs/MultiCardDisplay';
import { useAppSelector } from '../../../stores/hooks';
import { TestimonialsDesigns } from '../designs';

export default function TestimonialsSection({
  projectName,
  mainText,
  testimonials,
  design,
}) {
  const textSecondary = useAppSelector((state) => state.style.textSecondary);
  const corners = useAppSelector((state) => state.style.corners);
  const websiteSectionStyle = useAppSelector(
    (state) => state.style.websiteSectionStyle,
  );
  const iconsColor = useAppSelector((state) => state.style.iconsColor);
  const shadow = useAppSelector((state) => state.style.shadow);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const getVisibleTestimonials = () => {
    const visibleTestimonials = [];
    for (let i = 0; i < 3; i++) {
      visibleTestimonials.push(
        testimonials[(currentIndex + i) % testimonials.length],
      );
    }
    return visibleTestimonials;
  };

  const renderDesign = () => {
    switch (design) {
      case TestimonialsDesigns.HORIZONTAL_CAROUSEL:
      case TestimonialsDesigns.HORIZONTAL_CAROUSEL_WITH_BG:
      case TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY:
        return (
          <HorizontalCarousel
            projectName={projectName}
            testimonials={testimonials}
            currentIndex={currentIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            design={design}
            iconsColor={iconsColor}
            websiteSectionStyle={websiteSectionStyle}
            textSecondary={textSecondary}
          />
        );

      case TestimonialsDesigns.MULTI_CARD_DISPLAY:
        return (
          <MultiCardDisplay
            projectName={projectName}
            testimonials={testimonials}
            getVisibleTestimonials={getVisibleTestimonials}
            handlePrev={handlePrev}
            handleNext={handleNext}
            textSecondary={textSecondary}
            corners={corners}
            shadow={shadow}
            mainText={mainText}
          />
        );

      default:
        return (
          <HorizontalCarousel
            projectName={projectName}
            testimonials={testimonials}
            currentIndex={currentIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            design={design}
            iconsColor={iconsColor}
            websiteSectionStyle={websiteSectionStyle}
            textSecondary={textSecondary}
          />
        );
    }
  };

  return (
    <div
      className={`${
        design === TestimonialsDesigns.HORIZONTAL_CAROUSEL_WITH_BG
          ? `bg-blue-700 bg-opacity-25`
          : ''
      }
    ${
      design === TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY
        ? `bg-blue-700 `
        : ''
    }`}
    >
      {renderDesign()}
    </div>
  );
}
