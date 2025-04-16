import React, { useEffect, useState } from 'react';
import { getMultiplePexelsImages } from '../../../helpers/pexels';
import { useAppSelector } from '../../../stores/hooks';
import IconsTop from './designs/IconsTop';
import LargeNumbers from './designs/LargeNumbers';
import CardsGridWithIcons from './designs/CardsGridWithIcons';
import { FeaturesDesigns } from '../designs';
import IconsWithImage from './designs/IconsWithImage';

export default function FeaturesSection({
  projectName,
  withBg = 0,
  features,
  mainText,
  subTitle,
  design,
  image,
}) {
  const textColor = useAppSelector((state) => state.style.linkColor);
  const iconsColor = useAppSelector((state) => state.style.iconsColor);
  const corners = useAppSelector((state) => state.style.corners);
  const shadow = useAppSelector((state) => state.style.shadow);
  const websiteSectionStyle = useAppSelector(
    (state) => state.style.websiteSectionStyle,
  );
  const borders = useAppSelector((state) => state.style.borders);
  const textSecondary = useAppSelector((state) => state.style.textSecondary);
  const pexelsQueriesWebSite = image;
  const [imageFeatures, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      if (design === FeaturesDesigns.ICONS_WITH_IMAGE) {
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
      }
    };

    fetchImages();
  }, [pexelsQueriesWebSite, design]);

  let designComponent;

  switch (design) {
    case FeaturesDesigns.ICONS_TOP:
      designComponent = (
        <IconsTop
          features={features}
          projectName={projectName}
          withBg={withBg}
          iconsColor={iconsColor}
          mainText={mainText}
          subTitle={subTitle}
          websiteSectionStyle={websiteSectionStyle}
          textSecondary={textSecondary}
        />
      );
      break;

    case FeaturesDesigns.LARGE_NUMBERS:
      designComponent = (
        <LargeNumbers
          features={features}
          projectName={projectName}
          withBg={withBg}
          mainText={mainText}
          subTitle={subTitle}
          iconsColor={iconsColor}
          websiteSectionStyle={websiteSectionStyle}
          textSecondary={textSecondary}
        />
      );
      break;

    case FeaturesDesigns.CARDS_GRID_WITH_ICONS:
    case FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY:
      designComponent = (
        <CardsGridWithIcons
          features={features}
          projectName={projectName}
          iconsColor={iconsColor}
          corners={corners}
          design={design}
          borders={borders}
          shadow={shadow}
          mainText={mainText}
          subTitle={subTitle}
          websiteSectionStyle={websiteSectionStyle}
          textSecondary={textSecondary}
        />
      );
      break;

    case FeaturesDesigns.ICONS_WITH_IMAGE:
      designComponent = (
        <IconsWithImage
          features={features}
          projectName={projectName}
          withBg={withBg}
          iconsColor={iconsColor}
          mainText={mainText}
          subTitle={subTitle}
          corners={corners}
          image={imageFeatures}
          websiteSectionStyle={websiteSectionStyle}
          textSecondary={textSecondary}
        />
      );
      break;

    default:
      designComponent = (
        <IconsTop
          features={features}
          projectName={projectName}
          withBg={withBg}
          iconsColor={iconsColor}
          mainText={mainText}
          subTitle={subTitle}
          websiteSectionStyle={websiteSectionStyle}
          textSecondary={textSecondary}
        />
      );
      break;
  }

  return <div>{designComponent}</div>;
}
