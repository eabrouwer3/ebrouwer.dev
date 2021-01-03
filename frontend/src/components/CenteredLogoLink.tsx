import * as React from "react";
import ExternalLink from "./ExternalLink";

interface Props {
    href: string,
    img: any,
    alt: string
}

const CenteredLogoLink: React.FC<Props> = ({href, img, alt}) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <ExternalLink href={href} style={{width: '35%'}}><img src={img} alt={alt} style={{width: '100%'}}/></ExternalLink>
        </div>
    );
};

export default CenteredLogoLink;