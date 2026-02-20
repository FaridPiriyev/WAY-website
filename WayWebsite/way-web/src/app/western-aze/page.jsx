import { Poppins } from 'next/font/google'
import Navbar2 from "@/components/Navbar/navbar2";


import Footer from "@/components/Footer/Footer";
import WestAze from '@/components/OurProjectPage/WesternAzerbaijan';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
});

export default function WesternAze() {
  return (
    <div className={poppins.className}>
      <Navbar2 />
      
     <WestAze/>
     <Footer/>
    </div>
  );
}