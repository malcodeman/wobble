import { Metadata } from "next";

const TITLE = "wobblewideo";
const DESCRIPTION = "Motion design made simple.";
const URL = "https://wobblewideo.vercel.app";

export const METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: TITLE,
    images: [
      {
        url: `${URL}/opengraph.png`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};
