import React, { useEffect, useState } from 'react';
import { getMultiplePexelsImages } from '../../../helpers/pexels';
import { useAppSelector } from '../../../stores/hooks';
import { AboutUsDesigns } from '../designs';
import ImageLeft from './designs/ImageLeft';
import ImageRight from './designs/ImageRight';

const AboutUsComponent = ({
  projectName,
  image,
  mainText,
  subTitle,
  design,
  buttonText,
}) => {
  const textSecondary = useAppSelector((state) => state.style.textSecondary);
  const corners = useAppSelector((state) => state.style.corners);
  const [imageAbout, setImages] = useState([]);
  const pexelsQueriesWebSite = image;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
        const formattedImages = images.map((image) => ({
          src: image.src || undefined,
          photographer: image.photographer || undefined,
          photographer_url: image.photographer_url || undefined,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [pexelsQueriesWebSite]);

  const renderComponent = () => {
    switch (design) {
      case AboutUsDesigns.IMAGE_LEFT:
        return (
          <ImageLeft
            projectName={projectName}
            mainText={mainText}
            subTitle={subTitle}
            imageAbout={imageAbout}
            buttonText={buttonText}
            corners={corners}
            textSecondary={textSecondary}
          />
        );

      case AboutUsDesigns.IMAGE_RIGHT:
        return (
          <ImageRight
            projectName={projectName}
            mainText={mainText}
            subTitle={subTitle}
            imageAbout={imageAbout}
            buttonText={buttonText}
            corners={corners}
            textSecondary={textSecondary}
          />
        );

      default:
        return (
          <ImageRight
            projectName={projectName}
            mainText={mainText}
            subTitle={subTitle}
            imageAbout={imageAbout}
            buttonText={buttonText}
            corners={corners}
            textSecondary={textSecondary}
          />
        );
    }
  };

  return renderComponent();
};

export default AboutUsComponent;
