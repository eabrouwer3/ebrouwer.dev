import { Link } from "@remix-run/react";
import { useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import { ChevronDown, Hamburger } from "~/components/icons";
import headerImage from "~/assets/images/angels-landing.jpg";

// @ts-ignore
const scrollToRef = (ref: React.Ref<any>) => window.scrollTo({ left: 0, top: ref?.current.offsetTop, behavior: 'smooth' })

const HeaderLink: React.FC<{to: string, name: string, block?: boolean}> = ({to, name, block = false}) => {
  return <Link preventScrollReset className={`text-white py-4 px-6 uppercase font-bold border border-transparent border-solid no-underline ${block ? 'block' : 'inline'} visited:text-white focus:text-white hover:text-white hover:border-white`} to={to}>{name}</Link>;
};

export const Header: React.FC = () => {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const showMenu: React.MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };

  const hideMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    setMenuOpen(false);
  };

  return (
    <>
      <div className="h-screen overflow-hidden relative">
        <div className="h-screen w-screen opacity-50 bg-black absolute inset-0 z-10"/>
        <div className="flex flex-col absolute inset-0">
          <img className="min-h-full min-w-full object-cover object-center" src={headerImage} alt="Angel's Landing" />
        </div>
        <div className="flex flex-col justify-center items-center absolute inset-x-0 bottom-0 z-20 text-3xl text-white">
          Hi, I am
          <h1 className="font-header m-0 text-6xl font-mediumn text-center">Ethan Brouwer</h1>
          I am
          <Typewriter
            options={{
              strings: ['a Husband', 'a Father', 'a Code Ninja', 'a World Traveler'],
              autoStart: true,
              loop: true
            }}
          />
          <ChevronDown className="cursor-pointer" height="96" width="96" onClick={() => scrollToRef(headerRef)} />
        </div>
      </div>
      <div className="flex text-white w-full items-center sticky top-0 z-50 bg-skalex" style={{background: '#32a852'}} ref={headerRef}>
        <div className="grow pl-5">
          <h1 className='font-header text-4xl font-medium m-4'>Ethan Brouwer</h1>
        </div>
        <div className="grow-[2] pr-5 text-right">
          <div className="hidden lg:block">
            <HeaderLink to={'/'} name={'About Me'} />
            <HeaderLink to={'/resume'} name={'Resume'} />
            <HeaderLink to={'/portfolio'} name={'Portfolio'} />
            {/* <HeaderLink to={'/contact'} name={'Contact Me'} /> */}
          </div>
          <div className="lg:hidden">
            <Hamburger onClick={showMenu} className="float-right cursor-pointer" />
            <div onClick={hideMenu} className={`fixed box-border h-screen w-fit top-0 m-0 bg-skalex duration-500 transition-[right] z-20 ${menuOpen ? 'right-0' : '-right-[100vw]'}`}>
              <HeaderLink to={'/'} name={'About Me'} block />
              <HeaderLink to={'/resume'} name={'Resume'} block />
              <HeaderLink to={'/portfolio'} name={'Portfolio'} block />
              {/* <HeaderLink to={'/contact'} name={'Contact Me'} block /> */}
            </div>
            <div onClick={hideMenu} className={`fixed h-screen w-screen inset-0 m-0 opacity-50 bg-black z-10 ${menuOpen ? 'block' : 'hidden'}`} />
          </div>
        </div>
      </div>
    </>
  );
};
