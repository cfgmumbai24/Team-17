import React, { useEffect, useState } from 'react';
import './FaqPage.css';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // Adjust based on your UI library
import faqDataImport from './faq.json'; // Adjust the path based on your project structure

interface Faq {
  question: string;
  answer: string;
}

interface FaqCategory {
  FAQs: Faq[];
}

interface FaqData {
  [key: string]: FaqCategory;
}

const FaqPage: React.FC = () => {
  const [faqData, setFaqData] = useState<FaqData | null>(faqDataImport);

  useEffect(() => {
    const storedFaqData = localStorage.getItem('faqData');
    if (storedFaqData) {
      setFaqData(JSON.parse(storedFaqData));
    } else {
      // Store the FAQ data in local storage if not already stored
      localStorage.setItem('faqData', JSON.stringify(faqDataImport));
      setFaqData(faqDataImport);
    }
  }, []);

  if (!faqData) {
    return <div>Loading FAQs...</div>;
  }

  return (
    <div className='faq-css'>
    <>
      {Object.keys(faqData).map((category, categoryIndex) => (
        <div key={categoryIndex} className="my-4">
          <h2 className="text-xl font-bold mb-2">{category}</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData[category].FAQs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </>
    </div>
  );
  
};

export default FaqPage;
