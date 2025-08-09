import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

import trafficPDF from '$lib/assets/documents/traffic.pdf';
import climbingPDF from '$lib/assets/documents/climbing.pdf';

type PDFPortoflioItem = {
  type: 'pdf',
  title: string,
  document: string,
}

type SlidesPortfolioItem = {
  type: 'slides',
  title: string,
  url: string,
}

type PortfolioItem = PDFPortoflioItem | SlidesPortfolioItem;

const portfolioItems: Record<string, PortfolioItem> = {
  traffic: {
    type: 'pdf',
    title: 'Modeling Traffic Flow',
    document: trafficPDF,
  },
  climbing: {
    type: 'pdf',
    title: 'Predicting Climbing Champions',
    document: climbingPDF,
  },
  blockchain: {
    type: 'slides',
    title: 'Blockchain Slide Deck',
    url: 'https://slides.com/ethanbrouwer/blockchain'
  },
  'react-useeffect': {
    type: 'slides',
    title: 'React `useEffect()` Slide Deck',
    url: 'https://slides.com/ethanbrouwer/react-useeffect'
  },
}

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  const item = portfolioItems[slug];

  if (!item) {
    return error(404, 'Not found');
  }

  return item;
};
