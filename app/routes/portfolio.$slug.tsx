import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import SlideDeck from "~/components/SlideDeck";
import { PDF } from "~/components/PDF";

// TODO: I'd rather do this... but I can't right now
// https://github.com/remix-run/remix/discussions/2468
// import trafficPDF from '~/assets/documents/traffic.pdf';
// import climbingPDF from '~/assets/documents/climbing.pdf';

interface PDFPortoflioItem {
  type: 'pdf',
  title: string,
  document: string,
}

interface SlidesPortfolioItem {
  type: 'slides',
  title: string,
  url: string,
}

const portfolioItems: Record<string, PDFPortoflioItem | SlidesPortfolioItem> = {
  traffic: {
    type: 'pdf',
    title: 'Modeling Traffic Flow',
    // document: trafficPDF,
    document: '/documents/traffic.pdf',
  },
  climbing: {
    type: 'pdf',
    title: 'Predicting Climbing Champions',
    // document: climbingPDF,
    document: '/documents/climbing.pdf',
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

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'params.slug is required');
  if (portfolioItems[params.slug]) {
    return json(portfolioItems[params.slug]);
  }
  throw new Response("Not Found", { status: 404 });
}

export default function PorfolioDetail() {
  const portfolioItem = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex pb-6 pt-12">
        <div className="flex flex-col justify-center grow">
          <h1 className="font-header text-4xl tracking-widest block">{portfolioItem.title}</h1>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="grow">
          {
            portfolioItem.type === 'pdf'
              ? <PDF title={portfolioItem.title} document={portfolioItem.document} />
              : <SlideDeck title={portfolioItem.title} url={portfolioItem.url} />
          }
        </div>
      </div>
    </>
  );
}
