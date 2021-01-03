import * as React from 'react';
import {CustomLink} from "../styles/misc";

const ExternalLink: React.FC<React.HTMLProps<HTMLAnchorElement> & {external?: boolean}> = (props) => {
    const {children, external = true} = props;
    // @ts-ignore
    return <CustomLink {...props} rel={external ? 'noopener noreferrer' : undefined}
                 target={external ? '_blank' : undefined}>{children}</CustomLink>;
}

export default ExternalLink;