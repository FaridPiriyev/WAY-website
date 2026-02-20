import Navbar2 from "@/components/Navbar/navbar2";
import PythonTraining from "@/components/OurProjectPage/PythonTraining"
import Footer from "@/components/Footer/Footer";

export default function PyhthonTrainingPage () {
     return ( 
        <>
       <div>
        <Navbar2/>
       </div>

       <section>
       <PythonTraining/>
       <Footer/>
       </section>
       </>
     )
}