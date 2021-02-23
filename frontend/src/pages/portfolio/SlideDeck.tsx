import * as React from "react";
import {Body, Row} from "../../styles/grid";

interface Props {
    title: string,
    url: string
}

const SlideDeck: React.FC<Props> = ({title, url}) => {
    return (
        <Row style={{justifyContent: 'center'}}>
            <Body>
                <h1 className='header'>{title}</h1>
                <a href={url} rel="noopener noreferrer" target={'_blank'}>Open on slides.com</a>
                <iframe src={`${url}/embed`} width="576" height="420" title={title} allowFullScreen
                        // @ts-ignore
                        scrolling="no" frameBorder="0" webkitallowfullscreen mozallowfullscreen/>
            </Body>
        </Row>
    );
};

export default SlideDeck;