import { Poppins } from 'next/font/google'
import Navbar2 from "@/components/Navbar/navbar2";
import React from "react";
import AI4culture from '@/components/OurProjectPage/AI4Culture';
import Footer from '@/components/Footer/Footer';
 
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});
 
export default function Ai4culture() {
  return (
    <div className={poppins.className}>
      <Navbar2 />
     <AI4culture/>
     <Footer/>
    </div>
  );
}