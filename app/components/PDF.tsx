import {Document, Page} from 'react-pdf';
import {pdfjs} from 'react-pdf';
import {useState} from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
    document: string,
    title: string
}

export const PDF: React.FC<Props> = ({document, title}) => {
    const [numPages, setNumPages] = useState<number>();

    const onDocumentLoadSuccess = ({ numPages }: {numPages: number}) => {
        setNumPages(numPages);
    };

    return (
      <>
        <a href={document} rel="noopener noreferrer" target={'_blank'}>Download</a>
        <Document file={document} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(
                new Array(numPages),
                (_, i) => (
                    <Page key={`page_${i + 1}`} pageNumber={i + 1}/>
                )
            )}
        </Document>
      </>
    );
};
