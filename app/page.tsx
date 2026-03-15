'use client';

import Image from "next/image";
import CanvasLoader from "./components/common/CanvasLoader";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";

const Home = () => {
  return (
    <>
      <div className="fixed top-6 left-6 z-10 flex items-center gap-4 hidden md:flex opacity-80 hover:opacity-100 transition-opacity">
        <Image src="/profile.jpg" alt="Neel Salot" width={48} height={48} className="rounded-full shadow-lg border-2 border-white/20" />
        <span className="font-soria text-xl tracking-wider dark:text-white text-black">NS.</span>
      </div>
      <CanvasLoader>
        <ScrollWrapper>
          <Hero/>
          <Experience/>
          <Footer/>
        </ScrollWrapper>
      </CanvasLoader>
    </>
  );
};
export default Home;
