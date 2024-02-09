"use client";
import dynamic from "next/dynamic";

import { TEMPLATES } from "./constants";
import { Header } from "../components/Header";

const DynamicTemplate = dynamic(() => import("./components/Template"), {
  ssr: false,
});

export default function Templates() {
  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="mb-2 text-xl text-white">Templates</h1>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(272px,1fr))] gap-4">
          {TEMPLATES.map((item) => (
            <DynamicTemplate
              key={item.id}
              id={item.id}
              title={item.title}
              shapes={item.shapes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
