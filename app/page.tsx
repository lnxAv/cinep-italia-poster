import React from "react";
import Image from "next/image";
import Pisa from "@/component/canvas";

export default function Home() {
  return (
    <main className="flex flex-col relative min-h-screen min-w-screen">
      <div id="tree-bg" className="absolute  w-full h-full">
        <Pisa />
      </div>
      <section className="w-full">
        <div className="w-1/2 max-w-60 p-4 mix-blend-difference">
          <div className="flex justify-between items-center flex-no-wrap m-1 pb-1">
            <div>
              <Image
                className="p-1 bg-accent"
                alt="cinema public"
                width={50}
                height={50}
                src="/Basic_logo.svg"
              />
            </div>
            <div>
              <p>x</p>
            </div>
            <div>
              <p>Casa d&#39;Italia</p>
            </div>
          </div>
          <hr />
          <div className="m-1">
            Des projections de films par le Cinema Public, <br />
            chaque semaine a la casa d&#39;Italia.
          </div>
          <hr />
          <div className="m-1">
            505 Jean-Talon E,
            <br />
            Via Berri
          </div>
        </div>
      </section>
      <footer className="flex w-full justify-between absolute bottom-0 p-4">
        <p>
          (438) 771-7747,
          <br />
          cinemapublic.ca
        </p>
        <div>
          Mtl designs,
          <br />
          study. p.1
        </div>
      </footer>
    </main>
  );
}
