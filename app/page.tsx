import Hero from "@/components/main/hero";
import Navbar from "@/components/main/navbar";


export default function Home() {
  return (
    <main className="h-full w-full">
      <Navbar/>
      <div className="flex flex-col h-[850px] gap-20">
        <Hero/>
      </div>
    </main>
  );
}
