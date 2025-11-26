import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { categoryPagesConfig } from './categoryPagesConfig';

interface CategoryFAQProps {
  categoryId: string;
  backgroundColor?: string;
  accentColor?: string;
}

export function CategoryFAQ({ categoryId, backgroundColor = '#0A0A0F', accentColor = '#EC4899' }: CategoryFAQProps) {
  const config = categoryPagesConfig[categoryId];
  
  if (!config) {
    return null;
  }

  const faqs = config.faqItems || [];
  const categoryName = `${config.title} ${config.subtitle}`;
  
  // Determine gradient colors based on accentColor
  const isBlueTheme = accentColor === '#0A66C2';
  
  const getGradientColors = () => {
    // LinkedIn Blue theme
    if (isBlueTheme) {
      return 'from-blue-950/20 via-transparent to-blue-900/10';
    }
    // Default pink/purple theme
    return 'from-purple-900/10 via-transparent to-pink-900/10';
  };

  const getBorderClasses = () => {
    if (isBlueTheme) {
      return 'border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/10';
    }
    return 'border-pink-500/20 hover:border-pink-500/40 hover:shadow-pink-500/10';
  };

  const getHoverTextClass = () => {
    if (isBlueTheme) {
      return 'hover:text-blue-400';
    }
    return 'hover:text-pink-400';
  };

  const getLinkClass = () => {
    if (isBlueTheme) {
      return 'text-blue-400 hover:text-blue-300';
    }
    return 'text-pink-400 hover:text-pink-300';
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor }}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors()}`} />
      
      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header - CSS animation */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-600">
          <h2 className="text-4xl md:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about {categoryName}
          </p>
        </div>

        {/* Accordion - CSS animation */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-800">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border rounded-2xl px-6 py-2 hover:shadow-lg transition-all duration-300 ${getBorderClasses()}`}
              >
                <AccordionTrigger className={`text-left text-lg font-semibold text-white transition-colors py-4 ${getHoverTextClass()}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact support - CSS animation */}
        <div className="mt-16 text-center animate-in fade-in duration-600 delay-300">
          <p className="text-gray-400 text-lg">
            Still have questions?{" "}
            <a href="#" className={`${getLinkClass()} font-semibold underline decoration-2 underline-offset-4 transition-colors`}>
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
