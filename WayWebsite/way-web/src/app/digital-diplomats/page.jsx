import { Poppins } from 'next/font/google'
import Navbar2 from "@/components/Navbar/navbar2";
import DigitalDiplomatsComponent from "@/components/OurProjectPage/DigitalDiplomats";
import React from "react";
import Footer from '@/components/Footer/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});

export default function DigitalDiplomats() {
  return (
    <div className={poppins.className}>
      <Navbar2 />
      
     <DigitalDiplomatsComponent/>
     <Footer/>
    </div>
  );
}