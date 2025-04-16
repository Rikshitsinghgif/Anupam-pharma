import React, { useState } from 'react';
import HorizontalGallery from './designs/HorizontalGalleryWithButtons';
import OverlappingGallery from './designs/OverlappingCentralImage';
import { GalleryPortfolioDesigns } from '../designs';
import { useAppSelector } from '../../../stores/hooks';

export default function GalleryPortfolioSection({
  projectName,
  images,
  mainText,
  design,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const corners = useAppSelector((state) => state.style.corners);
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const getPrevIndex = () =>
    currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  const getNextIndex = () =>
    currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  switch (design) {
    case GalleryPortfolioDesigns.HORIZONTAL_WITH_BUTTONS:
      return (
        <HorizontalGallery
          images={images}
          currentIndex={currentIndex}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          getPrevIndex={getPrevIndex}
          getNextIndex={getNextIndex}
          mainText={mainText}
          corners={corners}
        />
      );

    case GalleryPortfolioDesigns.OVERLAPPING_CENTRAL_IMAGE:
      return (
        <OverlappingGallery
          images={images}
          currentIndex={currentIndex}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          getPrevIndex={getPrevIndex}
          getNextIndex={getNextIndex}
          mainText={mainText}
          corners={corners}
        />
      );

    default:
      return (
        <HorizontalGallery
          images={images}
          currentIndex={currentIndex}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
          getPrevIndex={getPrevIndex}
          getNextIndex={getNextIndex}
          mainText={mainText}
          corners={corners}
        />
      );
  }
}
