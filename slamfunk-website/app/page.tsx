import Header from "components/Header";
import Section from "components/Section";
import Footer from "components/Footer";
import Image from "next/image";  // will use for flyer
import Accordion from "components/Accordion";
import { FaBasketballBall, FaChartLine, FaTrophy, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";
import MarchMadnessHero from "../components/Hero";
import Prizes from "../components/Prizes";

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

export default function MarchMadnessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-blue-900">
      <Header />

      <main>
        <MarchMadnessHero />
        
        <section id="competition-tracks" className="relative w-full overflow-hidden py-16">
          <div className="absolute inset-0 bg-[#1e3a5f]">
            <Image
              src="/background.svg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center mb-12">
              <div className="mb-6">
                <Image
                  src="/competition_tracks.svg"
                  alt="Competition Tracks"
                  width={1000}
                  height={100}
                  className="w-full max-w-4xl h-auto"
                />
              </div>
              <h3
                className="text-white text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider"
                style={{ fontFamily: 'Bayon, sans-serif' }}
              >
                CHOOSE YOUR PATH TO VICTORY
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch mt-16">
              <div className="relative pt-16 flex">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-10">
                  <Image
                    src="/basketball1.svg"
                    alt="Basketball"
                    width={140}
                    height={140}
                    className="w-28 h-28 sm:w-32 sm:h-32"
                  />
                </div>
                <div className="bg-[#0f1e33] p-10 pt-16 rounded-3xl w-full flex flex-col justify-between">
                  <div className="text-white" style={{ fontFamily: 'Bayon, sans-serif' }}>
                    <h3 className="text-2xl sm:text-3xl text-center mb-8 uppercase">Best Basketball Track</h3>
                    <p className="text-xl sm:text-2xl mb-8">Test your basketball knowledge and prediction skills!</p>
                    <ul className="space-y-5">
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Submit up to 5 NCAA March Madness brackets</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Scoring follows the official NCAA bracket scoring system</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>The highest-scoring bracket wins, with a runner-up prize for second place</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white font-bold mt-8" style={{ fontFamily: 'Bayon, sans-serif' }}>Due: March 19th, 11:59 PM</p>
                </div>
              </div>
              <div className="relative pt-16 flex">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 z-10">
                  <Image
                    src="/lineup.svg"
                    alt="Data Science"
                    width={140}
                    height={140}
                    className="w-28 h-28 sm:w-32 sm:h-32"
                  />
                </div>
                <div className="bg-[#0f1e33] p-10 pt-16 rounded-3xl w-full flex flex-col justify-between">
                  <div className="text-white" style={{ fontFamily: 'Bayon, sans-serif' }}>
                    <h3 className="text-2xl sm:text-3xl text-center mb-8 uppercase">Best Data Science Write-Up Track</h3>
                    <p className="text-xl sm:text-2xl mb-8">Use your analytical skills to predict tournament outcomes!</p>
                    <ul className="space-y-5">
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Use data analytics, machine learning, or statistical models for your predictions</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Submit a written analysis detailing methodology, insights, and predictions</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Submissions can be written or video format</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Must also submit at least one bracket</span>
                      </li>
                      <li className="flex items-start text-xl sm:text-2xl">
                        <span className="mr-3">•</span>
                        <span>Judged on creativity, accuracy, and clarity of explanation</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-2xl sm:text-3xl text-white font-bold mt-8" style={{ fontFamily: 'Bayon, sans-serif' }}>Due: April 3rd 11:59 PM (right before Final Four games)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Prizes />

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
          />} // prob add a picture or sum and also the prizes
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
              {/*<Link
                href="/bracket"
                className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                Start Building Now!
              </Link>*/}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
