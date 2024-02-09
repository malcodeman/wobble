"use client";
import dynamic from "next/dynamic";

import { TEMPLATES } from "./constants";

const DynamicTemplate = dynamic(() => import("./components/Template"), {
  ssr: false,
});

export default function Templates() {
  return (
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
  );
}
