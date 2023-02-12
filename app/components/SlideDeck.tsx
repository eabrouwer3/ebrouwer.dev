import * as React from "react";

interface Props {
    title: string,
    url: string
}

const SlideDeck: React.FC<Props> = ({title, url}) => {
    return (
      <>
        <a href={url} rel="noopener noreferrer" target={'_blank'}>Open on slides.com</a>
        <iframe src={`${url}/embed`} width="576" height="420" title={title} allowFullScreen
                // @ts-ignore
                scrolling="no" frameBorder="0" webkitallowfullscreen mozallowfullscreen/>
      </>
    );
};

export default SlideDeck;
