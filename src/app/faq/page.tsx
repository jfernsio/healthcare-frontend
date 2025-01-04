import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
      "question": "What is a Health Platform?",
      "answer": "A health platform is a service or application that helps individuals find and connect with healthcare facilities. It provides information about hospitals, clinics, pharmacies, and other medical services."
    },
    {
      "question": "How can I find healthcare facilities near me?",
      "answer": "You can find healthcare facilities by using online search tools or maps. Specify the type of facility you're looking for, such as a hospital or pharmacy, and browse the results to locate options in your area."
    },
    {
      "question": "Is it important to keep my health information secure?",
      "answer": "Yes, protecting health information is essential. Ensure your data is encrypted and stored securely. Only share it with trusted healthcare providers or platforms that guarantee your privacy."
    },
    {
      "question": "How do I keep track of my health records?",
      "answer": "You can manage your health records by using apps or platforms that allow you to organize and access your medical history, prescriptions, and other health details. Regularly update your records to ensure accuracy."
    },
    {
      "question": "Can I update my health details regularly?",
      "answer": "Yes, it’s important to update your health details as they change. Keeping them current ensures you receive accurate and effective healthcare when needed."
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

