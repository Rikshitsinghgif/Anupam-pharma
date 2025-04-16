import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      name: 'Automated Prescription Handling',
      description:
        'Streamline the prescription process with automated checks and alerts. Reduce errors and ensure timely fulfillment for better patient care.',
      icon: 'mdiPill',
    },
    {
      name: 'Real-Time Inventory Management',
      description:
        'Monitor stock levels and expiration dates in real-time. Receive alerts for low stock and manage your inventory efficiently.',
      icon: 'mdiWarehouse',
    },
    {
      name: 'Comprehensive Reporting Tools',
      description:
        'Gain insights into your operations with detailed reports. Track performance, identify trends, and make informed decisions to optimize your business.',
      icon: 'mdiChartLine',
    },
  ];

  const faqs = [
    {
      question: 'How does ${projectName} improve prescription management?',
      answer:
        '${projectName} automates the prescription process, reducing errors and ensuring timely fulfillment. It provides alerts and checks to streamline operations.',
    },
    {
      question: 'Can I customize the reporting tools?',
      answer:
        'Yes, ${projectName} offers customizable reporting tools that allow you to track performance, identify trends, and make informed decisions tailored to your needs.',
    },
    {
      question: 'Is training available for new users?',
      answer:
        "Absolutely! We provide comprehensive training sessions to ensure all users are comfortable and proficient with ${projectName}'s features and functionalities.",
    },
    {
      question: 'How secure is the payment processing feature?',
      answer:
        'Our payment processing is highly secure, utilizing encryption and secure access controls to protect all transactions and sensitive information.',
    },
    {
      question: 'What support options are available?',
      answer:
        'We offer 24/7 customer support via email and phone. Our dedicated team is ready to assist you with any questions or issues you may encounter.',
    },
    {
      question: 'Can ${projectName} integrate with existing systems?',
      answer:
        'Yes, ${projectName} is designed to integrate seamlessly with various third-party systems, including accounting and shipping services, for a cohesive workflow.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services | Comprehensive Pharmaceutical Solutions`}</title>
        <meta
          name='description'
          content={`Discover the range of services offered by ${projectName}, designed to enhance pharmaceutical operations. From prescription management to secure payment processing, we provide solutions tailored to your needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'pharmaceutical website'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'pharmaceutical website'}
          image={['Pharmacist using digital tools']}
          mainText={`Transform Your Pharmacy with ${projectName}`}
          subTitle={`Explore our tailored services designed to streamline your pharmaceutical operations. From efficient prescription management to secure payment solutions, ${projectName} is your partner in excellence.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Discover Our Services`}
        />

        <FeaturesSection
          projectName={'pharmaceutical website'}
          image={['Digital tools for pharmacists']}
          withBg={0}
          features={features_points}
          mainText={`Unleash the Power of ${projectName}`}
          subTitle={`Discover the core features of ${projectName} that enhance your pharmaceutical operations, ensuring efficiency and accuracy.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <FaqSection
          projectName={'pharmaceutical website'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Your Questions Answered about ${projectName} `}
        />

        <ContactFormSection
          projectName={'pharmaceutical website'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Customer service team ready']}
          mainText={`Connect with ${projectName} Support `}
          subTitle={`Reach out to us anytime for assistance or inquiries. Our team is available 24/7 to ensure you receive prompt and effective support.`}
        />
      </main>
      <WebSiteFooter projectName={'pharmaceutical website'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
