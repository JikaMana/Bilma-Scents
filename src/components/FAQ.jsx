import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for all items. Items must be in original condition.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping typically takes 3-5 business days depending on your location.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we offer international shipping. Additional charges may apply.",
  },
  {
    question: "How do I track my order?",
    answer:
      "After placing your order, you will receive a tracking link via email.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-manrope italic font-bold text-center mb-12 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-6">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border-b pb-6 text-[#9c6a24] font-manrope cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold flex justify-between items-center">
                {faq.question}
                <span>{isOpen ? <Minus /> : <Plus />}</span>
              </h3>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[#9c6a2490] mt-2">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
