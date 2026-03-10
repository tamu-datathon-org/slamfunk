"use client";
import Accordion from "./Accordion";
import Section from "./Section";
import Image from "next/image";

const MarchMadnessFAQ = () => {
  const faqItems = [
    {
      title: "Who can participate?",
      content: "Open to all Texas A&M students, regardless of major or experience level. Only individual submissions are allowed for both tracks."
    },
    {
      title: "What are the prizes?",
      content: "Compete for awesome prizes 😎. Peep the section above 👀‼️"
    },
    {
      title: "How many brackets can I submit?",
      content: "Participants can submit up to 5 NCAA March Madness brackets before the tournament starts."
    },
    {
      title: "What should my Data Science Write-Up include?",
      content: "Your write-up should include details on your methodology, the data you used, insights discovered, and your predictions. You can submit in written form or as a video."
    },
    {
      title: "Do I need to submit a bracket if I'm doing the Data Science track?",
      content: "Yes, participants in the Data Science Write-Up track must also submit at least one bracket."
    }
  ];

  return <Accordion items={faqItems} />;
};

export default function FAQ(){
    return (
        <div id="faq-section" className="flex flex-col items-center mb-12">
            <div className="mb-6">
            <Image
                src="/faq_text.svg"
                alt="Faq and Rules"
                width={1000}
                height={100}
                className="w-full max-w-4xl h-auto"
            />
            </div>

            <div style={{ fontFamily: 'Bayon, sans-serif' }}>
                <MarchMadnessFAQ />
            </div>

        </div>
    );
}