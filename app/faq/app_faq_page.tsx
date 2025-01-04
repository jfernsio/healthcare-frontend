import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is HealthHub?",
    answer: "HealthHub is a platform that helps you find and connect with healthcare facilities in your area. It provides information about hospitals, clinics, pharmacies, and other medical services."
  },
  {
    question: "How do I search for healthcare facilities?",
    answer: "You can search for healthcare facilities by using the search function on our homepage. Select the type of facility you're looking for and click the 'Search' button to see results in your area."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take data security very seriously. All personal information is encrypted and stored securely. We never share your data with third parties without your explicit consent."
  },
  {
    question: "How do I create an account?",
    answer: "To create an account, click on the 'Sign Up' button in the top right corner of the page. Fill in the required information including your name, email, and health details, then click 'Sign Up'."
  },
  {
    question: "Can I update my health information after signing up?",
    answer: "Yes, you can update your health information at any time by logging into your account and navigating to your profile settings."
  }
]

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

