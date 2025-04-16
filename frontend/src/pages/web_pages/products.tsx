import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  ContactFormDesigns,
  HeroDesigns,
  FeaturesDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'pharmaceutical website';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/products',
      label: 'products',
    },

    {
      href: '/contact',
      label: 'contact',
    },
  ];

  const features_points = [
    {
      name: 'Intelligent Prescription Management',
      description:
        'Automate and streamline prescription handling with intelligent checks and alerts. Enhance accuracy and ensure timely delivery for improved patient care.',
      icon: 'mdiPill',
    },
    {
      name: 'Dynamic Inventory Control',
      description:
        'Monitor and manage inventory in real-time. Receive alerts for low stock and track expiration dates to maintain optimal stock levels.',
      icon: 'mdiWarehouse',
    },
    {
      name: 'Secure Transaction Processing',
      description:
        'Facilitate secure and efficient payment processing. Protect sensitive data with robust encryption and ensure seamless transactions.',
      icon: 'mdiCreditCardOutline',
    },
  ];

  const faqs = [
    {
      question: 'What makes ${projectName} unique?',
      answer:
        '${projectName} offers a comprehensive suite of tools designed specifically for pharmaceutical management, ensuring efficiency, accuracy, and security in all operations.',
    },
    {
      question: 'How does ${projectName} handle data security?',
      answer:
        'We prioritize data security with advanced encryption and secure access controls, ensuring all sensitive information is protected and compliant with industry standards.',
    },
    {
      question: 'Can I customize the features of ${projectName}?',
      answer:
        'Yes, ${projectName} is highly customizable, allowing you to tailor features to meet the specific needs of your pharmacy or organization.',
    },
    {
      question: 'Is there a trial version available for ${projectName}?',
      answer:
        'Absolutely! We offer a trial version so you can explore the features and see how ${projectName} can benefit your operations before committing.',
    },
    {
      question: 'How can I get support if needed?',
      answer:
        'Our dedicated support team is available 24/7 to assist you with any questions or issues. You can contact us via email or phone for prompt assistance.',
    },
    {
      question: 'Does ${projectName} integrate with other systems?',
      answer:
        'Yes, ${projectName} is designed to integrate seamlessly with various third-party systems, including accounting and shipping services, for a cohesive workflow.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Products | Innovative Pharmaceutical Solutions`}</title>
        <meta
          name='description'
          content={`Explore the innovative products offered by ${projectName}, designed to streamline pharmaceutical operations and enhance efficiency. From advanced management tools to secure payment solutions, discover how our products can transform your business.`}
        />
      </Head>
      <WebSiteHeader projectName={'pharmaceutical website'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'pharmaceutical website'}
          image={['Innovative pharmaceutical management tools']}
          mainText={`Discover ${projectName} Products Today`}
          subTitle={`Explore our range of innovative products designed to revolutionize pharmaceutical management. From advanced tools to secure solutions, ${projectName} offers everything you need to enhance efficiency and accuracy.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Explore Our Products`}
        />

        <FeaturesSection
          projectName={'pharmaceutical website'}
          image={['Advanced management tools in action']}
          withBg={1}
          features={features_points}
          mainText={`Unveil the Power of ${projectName}`}
          subTitle={`Discover the cutting-edge features of ${projectName} that redefine pharmaceutical management, ensuring precision and efficiency.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <FaqSection
          projectName={'pharmaceutical website'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'pharmaceutical website'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support team available']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`Have questions or need assistance? Contact us anytime, and our team will respond promptly to ensure you have the support you need.`}
        />
      </main>
      <WebSiteFooter projectName={'pharmaceutical website'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
