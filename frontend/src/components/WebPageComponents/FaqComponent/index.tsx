import React from 'react';
import { useAppSelector } from '../../../stores/hooks';
import FAQAccordion from './designs/FAQAccordion';
import FAQSplitList from './designs/FAQSplitList';
import FAQTwoColumn from './designs/FAQTwoColumn';
import { FaqDesigns } from '../designs';

const FaqSection = ({ projectName, mainText, faqs, design }) => {
  const textSecondary = useAppSelector((state) => state.style.textSecondary);
  const borders = useAppSelector((state) => state.style.borders);
  const corners = useAppSelector((state) => state.style.corners);
  const websiteSectionStyle = useAppSelector(
    (state) => state.style.websiteSectionStyle,
  );

  let designComponent;

  switch (design) {
    case FaqDesigns.ACCORDION:
      designComponent = (
        <FAQAccordion
          faqs={faqs}
          projectName={projectName}
          textSecondary={textSecondary}
          corners={corners}
          borders={borders}
          mainText={mainText}
        />
      );
      break;

    case FaqDesigns.SPLIT_LIST:
    case FaqDesigns.SPLIT_LIST_DIVERSITY:
      designComponent = (
        <FAQSplitList
          faqs={faqs}
          projectName={projectName}
          textSecondary={textSecondary}
          borders={borders}
          mainText={mainText}
          websiteSectionStyle={websiteSectionStyle}
          design={design}
        />
      );
      break;

    case FaqDesigns.TWO_COLUMN:
      designComponent = (
        <FAQTwoColumn
          faqs={faqs}
          projectName={projectName}
          textSecondary={textSecondary}
          mainText={mainText}
        />
      );
      break;

    default:
      designComponent = (
        <FAQAccordion
          faqs={faqs}
          projectName={projectName}
          textSecondary={textSecondary}
          corners={corners}
          borders={borders}
          mainText={mainText}
        />
      );
      break;
  }

  return <div>{designComponent}</div>;
};

export default FaqSection;
