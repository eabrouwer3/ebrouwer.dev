import * as React from "react";
import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';
import {useState} from "react";
import {Body, Row} from "../../styles/grid";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
    document: string,
    title: string
}

const PDF: React.FC<Props> = ({document, title}) => {
    const [numPages, setNumPages] = useState<number>();

    const onDocumentLoadSuccess = ({ numPages }: {numPages: number}) => {
        setNumPages(numPages);
    };

    return (
        <Row style={{justifyContent: 'center'}}>
            <Body>
                <h1 className='header'>{title}</h1>
                <a href={document} rel="noopener noreferrer" target={'_blank'}>Download</a>
                <Document file={document} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(
                        new Array(numPages),
                        (el, i) => (
                            <Page key={`page_${i + 1}`} pageNumber={i + 1}/>
                        )
                    )}
                </Document>
            </Body>
        </Row>
    );
};

export default PDF;