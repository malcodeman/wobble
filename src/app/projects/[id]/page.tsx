import dynamic from "next/dynamic";

const DynamicCanvas = dynamic(() => import("./components/Canvas"), {
  ssr: false,
});

export default function Home() {
  return <DynamicCanvas />;
}
