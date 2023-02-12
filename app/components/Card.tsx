import { Link } from "@remix-run/react";
import { Share } from "./icons";

interface CardProps {
  title: string,
  img?: string,
  link: {
    type: 'internal',
    to: string,
  } | {
    type: 'external',
    href: string,
    text: string,
  },
}

export const Card: React.FC<React.HTMLProps<HTMLDivElement> & CardProps> = ({children, img, title, link}) => {
  return (
    <div className="flex p-4 m-2.5 shadow-lg duration-300 hover:shadow-2xl">
      <div className="grow pl-1.5">
        <h2 className="font-header text-2xl inline-block m-0">{title}</h2>
        <br/>
        {
          link.type === 'internal'
            ? <Link preventScrollReset className="inline-block text-sm no-underline font-header text-gray-400 focus:text-gray-400 visited:text-gray-400	hover:text-gray-600" to={link.to}>
              {link.to}
            </Link>
            : <a className="inline-block text-sm no-underline font-header text-gray-400 focus:text-gray-400 visited:text-gray-400	hover:text-gray-600" href={link.href}  rel="noopener noreferrer" target={'_blank'}>
              {link.text} <sup><Share className="text-xs inline w-3"/></sup>
            </a>
        }
        <p className="mt-2.5 mb-0">
          {img && <img className="w-1/4 float-left hidden lg:block mr-4 ml-2 my-2" src={img} alt={title} />}
          {children}
        </p>
      </div>
    </div>
  )
};
