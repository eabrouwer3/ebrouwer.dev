import { ExternalLink } from "./CustomLink";

interface Props {
  href: string;
  img: any;
  alt: string;
}

const CenteredLogoLink: React.FC<Props> = ({href, img, alt}) => {
  return (
    <div className="flex justify-center px-8 py-4 lg:py-2 object-cover">
      <ExternalLink href={href} className="w-1/3">
        <img src={img} alt={alt} className="w-full"/>
      </ExternalLink>
    </div>
  );
};

export default CenteredLogoLink;
