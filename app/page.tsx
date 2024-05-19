import Pisa from "@/component/canvas";
import { Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col relative min-h-screen min-w-screen">
      <div id="tree-bg" className="absolute  w-full h-full" >
        <Pisa />
      </div>
      <section className="w-full">
        <div className="w-1/3 p-4">
          <div className="flex justify-between items-center flex-no-wrap m-1 pb-1">
            <div>
              <Image className="bg-accent" alt="cinema public" width={50} height={50} src="https://cinemapublic.ca/wp-content/uploads/2021/11/cinemapublic_official_logo_black.svg"/>
            </div>
            <div>
              <p>x</p>
            </div>
            <div>
              <p>Casa d&#39;Italia</p>
            </div>
          </div>
          <hr/>
          <div className="m-1">
            Des projections de films
            par le Cinema Public,
            chaque semaine
            a la casa d&#39;Italia.
          </div>
          <hr/>
          <div className="m-1">
            Film screenings
            from Cinema Public,
            every week
            at Casa d&#39;Italia
          </div>
          <hr/>
          <div className="m-1">
            505 Jean-Talon E,
            Via Berri
          </div>
        </div>
      </section>
      <footer className="flex w-full justify-between absolute bottom-0 p-4">
        <p>
          (438) 771-7747,
          cinemapublic.ca
        </p>
        <div>
          x
        </div>
      </footer>
    </main>
  );
}