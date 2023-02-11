import * as React from 'react';

const CustomLink: React.FC<React.HTMLProps<HTMLAnchorElement> & {external?: boolean}> = (props) => {
  const {children, external = false} = props;
  return (
    <a {...props}
       className="text-link no-underline focus:text-link focus:no-underline visited:text-link visited:no-underline hover:text-hover-link hover:no-underline"
       rel={external ? 'noopener noreferrer' : undefined}
       target={external ? '_blank' : undefined}>
      {children}
    </a>
  );
};

const ExternalLink: React.FC<React.HTMLProps<HTMLAnchorElement>> = (props) => <CustomLink {...props} external />

export { CustomLink, ExternalLink };
