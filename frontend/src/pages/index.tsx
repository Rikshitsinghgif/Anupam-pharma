import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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
      name: 'Prescription Management',
      description:
        'Easily manage and track prescriptions with our intuitive interface. Ensure accuracy and compliance with automated checks and alerts.',
      icon: 'mdiPill',
    },
    {
      name: 'Inventory Tracking',
      description:
        'Keep your inventory up-to-date with real-time tracking. Monitor stock levels, expiration dates, and receive alerts for low stock.',
      icon: 'mdiWarehouse',
    },
    {
      name: 'Secure Payment Processing',
      description:
        'Process payments securely and efficiently. Our system ensures all transactions are logged and verified for complete transparency.',
      icon: 'mdiCreditCardOutline',
    },
  ];

  const faqs = [
    {
      question: 'What features does ${projectName} offer?',
      answer:
        '${projectName} provides comprehensive features including prescription management, inventory tracking, and secure payment processing. These tools are designed to streamline pharmaceutical operations and enhance efficiency.',
    },
    {
      question: 'How does ${projectName} ensure data security?',
      answer:
        'We prioritize data security by implementing robust encryption protocols and secure access controls. All sensitive information is protected to ensure confidentiality and compliance with industry standards.',
    },
    {
      question: 'Can ${projectName} integrate with existing systems?',
      answer:
        'Yes, ${projectName} is designed to seamlessly integrate with various third-party systems, including accounting and shipping services, to provide a cohesive and efficient workflow.',
    },
    {
      question: 'Is there a trial version available?',
      answer:
        'Yes, we offer a trial version of ${projectName} so you can explore its features and see how it fits your needs before committing to a subscription.',
    },
    {
      question: 'How can I get support if I encounter issues?',
      answer:
        'Our dedicated support team is available to assist you with any issues or questions. You can reach out to us via the contact form, and we will respond promptly to provide the necessary support.',
    },
    {
      question: 'What are the pricing plans for ${projectName}?',
      answer:
        '${projectName} offers flexible pricing plans to suit different needs. Please visit our pricing page for detailed information on the available packages and their features.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Pharmaceutical Management Solutions | Your Trusted Partner`}</title>
        <meta
          name='description'
          content={`Explore our comprehensive pharmaceutical management solutions designed for pharmacists and inventory managers. Manage prescriptions, track inventory, and streamline payment processes with ease.`}
        />
      </Head>
      <WebSiteHeader projectName={'pharmaceutical website'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'pharmaceutical website'}
          image={['Pharmacist managing inventory efficiently']}
          mainText={`Revolutionize Your Pharmaceutical Management Today`}
          subTitle={`Discover ${projectName}, your all-in-one solution for efficient pharmaceutical management. Streamline prescriptions, manage inventory, and ensure seamless transactions with ease.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'pharmaceutical website'}
          image={['Efficient pharmaceutical management tools']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Key Features`}
          subTitle={`Unlock the full potential of your pharmaceutical operations with ${projectName}. Streamline processes, enhance efficiency, and ensure accuracy.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'pharmaceutical website'}
          image={['Team collaborating on innovative solutions']}
          mainText={`Empowering Pharmaceutical Excellence with ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to transforming the pharmaceutical industry with innovative solutions. Our mission is to streamline operations, enhance accuracy, and support healthcare professionals in delivering exceptional care.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
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
          image={['Customer support team assisting clients']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We're here to assist you with any inquiries or support you need. Reach out to us anytime, and our team will respond promptly to ensure your questions are answered.`}
        />
      </main>
      <WebSiteFooter projectName={'pharmaceutical website'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
