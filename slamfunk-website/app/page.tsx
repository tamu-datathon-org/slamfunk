import Header from "components/Header";
import Footer from "components/Footer";
import Image from "next/image";  // will use for flyer
import MarchMadnessHero from "../components/Hero";
import Prizes from "../components/Prizes";
import FAQ from "components/Faq";
import Tracks from "components/Tracks";

//FIXME: until prizes are final its just gonna be commented out -layla

export default function MarchMadnessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white bg-[#1e3a5f]">
      <Header />
      <main>
        <MarchMadnessHero />
        <Tracks />

        {/* <Prizes /> */}

        <section className="relative w-full overflow-hidden">
          <div className="relative z-10">
            <div className="max-w-7xl mx-auto px-4 ">
                <FAQ/>
            </div>

            <div className="container mx-auto px-4 text-center py-16" style={{ fontFamily: 'Bayon, sans-serif' }}>
              <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 text-white">
                Ready to Join the Madness?
              </h2>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
