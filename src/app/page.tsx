import Hero from "@/components/Hero";
import { Cpu, BriefcaseMedical, GraduationCap, Car, Zap, Sprout, Scale, CircleDollarSign } from 'lucide-react';


export default function Home() {
  return (
    <div className="w-full">
      <Hero/>
      <div className="w-[99%] mx-auto bg-amber-50 mt-2 pb-10" id="category">
        <h1 className="text-4xl bg-nepBlue p-4 text-white font-bold text-center">Welcome to eTender</h1>
        <p className="text-center mt-4">
          Browse some of the latest tenders and projects available.
        </p>
        <div className="mt-10 w-[80%] mx-auto flex items-center justify-center gap-10 flex-wrap">
          <a href="/tender?department=technology">
            <Cpu size={100} strokeWidth={1.5} className="text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-center">Technology</h2>
          </a>
          <a href="/tender?department=health" >
            <BriefcaseMedical size={100} strokeWidth={1.5} className="text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-center">Health</h2>
          </a>
          <a href="/tender?department=education" >
            <GraduationCap size={100} strokeWidth={1.5} className="text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-center">Education</h2>
          </a>
          <a href="/tender?department=transportation" >
            <Car size={100} strokeWidth={1.5} className="text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-center">Transportation</h2>
          </a>
          <a href="/tender?department=energy" >
            <Zap size={100} strokeWidth={1.5} className="text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-center">Energy</h2>
          </a>
          <a href="/tender?department=agriculture" >
            <Sprout size={100} strokeWidth={1.5} className="text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-center">Agriculture</h2>
          </a>
          <a href="/tender?department=legal" >
            <Scale size={100} strokeWidth={1.5} className="text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-center">Legal</h2>
          </a>
          <a href="/tender?department=finance" >
            <CircleDollarSign size={100} strokeWidth={1.5} className="text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold text-center">Finance</h2>
          </a>  
        </div>
      </div>
    </div>
  );
}
