import Header from "components/Header";
import Section from "components/Section";
import Footer from "components/Footer";
import Image from "next/image";  // will use for flyer
import Accordion from "components/Accordion";
import { FaBasketballBall, FaChartLine, FaTrophy, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import MarchMadnessHero from "../components/Hero";
import Leaderboard from "components/Leaderboard";

const Timeline = () => {
  const events = [
    {
      date: "March 19th",
      title: "Bracket Submission Deadline",
      description: "All brackets must be submitted by Selection Sunday"
    },
    {
      date: "Night before the Final Four (April 4th)",
      title: "Data Science Write-Up Deadline",
      description: "Submit your analysis and methodology"
    },
    {
      date: "After NCAA Championship",
      title: "Winners Announced",
      description: "Winners for both tracks will be revealed"
    }
  ];

  return (
    <div className="py-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-12 text-gray-900 dark:text-white">
        Competition Timeline
      </h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-teal-400"></div>
        
        {events.map((event, index) => (
          <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
            </div>
            
            <div className="w-2/12 flex justify-center">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center z-10">
                <FaCalendarAlt className="text-white" />
              </div>
            </div>
            
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
              <span className="text-teal-500 font-bold">{event.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//faq items 
const MarchMadnessFAQ = () => {
  const faqItems = [
    {
      title: "Who can participate?",
      content: "Open to all Texas A&M students, regardless of major or experience level. Only individual submissions are allowed for both tracks."
    },
    {
      title: "What are the prizes?",
      content: "Compete for awesome prizes 😎. Specific prize details will be announced soon!"
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

export default function MarchMadnessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900">
      <Header />
      <main>
        <MarchMadnessHero />
        
        <section id="competition-tracks" className="container mx-auto px-4 py-16 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 transition-colors duration-200 rounded-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                Competition Tracks
              </h2>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 font-light">
                Choose your path to victory - make the best bracket or showcase your data science skills
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200 border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <FaBasketballBall size={34} className="text-blue-500" />
                  <h3 className="text-xl font-semibold ml-3 text-gray-800 dark:text-white">Best Bracket Track</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-light mb-4">Test your basketball knowledge and prediction skills!</p>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 font-light">
                  <li className="mb-2">Submit up to 5 NCAA March Madness brackets</li>
                  <li className="mb-2">Scoring follows the official NCAA bracket scoring system</li>
                  <li className="mb-2">The highest-scoring bracket wins, with a runner-up prize for second place</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200 border-l-4 border-teal-500">
                <div className="flex items-center mb-4">
                  <FaChartLine size={34} className="text-teal-500" />
                  <h3 className="text-xl font-semibold ml-3 text-gray-800 dark:text-white">Best Data Science Write-Up Track</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-light mb-4">Use your analytical skills to predict tournament outcomes!</p>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 font-light">
                  <li className="mb-2">Use data analytics, machine learning, or statistical models for your predictions</li>
                  <li className="mb-2">Submit a written analysis detailing methodology, insights, and predictions</li>
                  <li className="mb-2">Submissions can be written or video format</li>
                  <li className="mb-2">Must also submit at least one bracket</li>
                  <li className="mb-2">Judged on creativity, accuracy, and clarity of explanation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-16">
          <Timeline />
        </section>
        
        <Section
          leftHalf={
            <>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6">
                Why Participate?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaTrophy className="text-teal-400 mt-1 mr-3 text-xl" />
                  <p className="text-xl font-light">
                    Compete for awesome prizes and campus recognition
                  </p>
                </li>
                <li className="flex items-start">
                  <FaChartLine className="text-teal-500 mt-1 mr-3 text-xl" />
                  <p className="text-xl font-light">
                    Put your predictive skills to the test using real-world data
                  </p>
                </li>
                <li className="flex items-start">
                  <FaBasketballBall className="text-blue-500 mt-1 mr-3 text-xl" />
                  <p className="text-xl font-light">
                    Gain experience in sports analytics and statistical modeling
                  </p>
                </li>
                <li className="flex items-start">
                  <FaUserGraduate className="text-blue-400 mt-1 mr-3 text-xl" />
                  <p className="text-xl font-light">
                    Stay engaged with the TAMU Datathon community beyond hackathon events
                  </p>
                </li>
              </ul>
            </>
          }
 
          rightHalf={<Image
            src="/mmflyer.png"
            width={500}
            height={500}
            alt="TD March Madness Flyer"
          />} // prob add a picture or sum
        />
        
        <section id="faq-section">
          <Section
            leftHalf={<MarchMadnessFAQ />}
            rightHalf={
              <div className="flex flex-col justify-end">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-4">
                  Important Rules
                </h2>
                <p className="text-xl font-light mb-6">
                  Everything you need to know about the March Madness Mania competition
                </p>
              </div>
            }
          />
        </section>
        
        <section className="py-16 bg-blue-50 dark:bg-blue-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-900 dark:text-white">
              Ready to Join the Madness?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-light max-w-3xl mx-auto">
              Think you can outsmart the madness? Brackets are open until March 19, 11:59 PM.

              Put your bracket-making skills and data science knowledge to the test!
            </p>
            <div className="flex justify-center space-x-6">
              {/* Registration link commented out until ready
              <Link
                href="/register"
                className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                Register Now
              </Link>
              */}
            </div>
          </div>
        </section>

        <section id="leaderboard-section">
                <Leaderboard/>

        </section>
      </main>
      <Footer />
    </div>
  );
}