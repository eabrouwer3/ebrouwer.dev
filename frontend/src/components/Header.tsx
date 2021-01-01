import * as React from "react";
import {Col, Row} from "../styles/grid";
import styled from "styled-components";
import {Link} from "react-router-dom";
// @ts-ignore
import Typewriter from "typewriter-effect";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import {useRef} from "react";

const HeaderDiv = styled(Row)`
  color: white;
  width: 100%;
  background: #32a852;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const HeaderLink = styled(Link)`
  color: white;
  padding: 1em 1.5em;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px transparent solid;
  text-decoration: none;
  
  &:visited, &:focus {
    color: white;
  }
  
  &:hover {
    border: 1px white solid;
    color: white;
  }
`;

const BackgroundImageOverlay = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, .5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const BackgroundImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  img {
    width: 100vw;
  }
`;

const TypewriterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  font-size: 2em;
  color: white;
  
  h1 {
    font-family: 'Lato', sans-serif;
  }
  
  .Typewriter {
    font-weight: bold;
  }
`;

// @ts-ignore
const scrollToRef = (ref: React.Ref<any>) => window.scrollTo({left: 0, top: ref?.current.offsetTop, behavior: 'smooth'})

const Header: React.FC = () => {
    const headerRef = useRef(null);

    return (
        <>
            <div style={{height: '100vh', overflow: 'hidden', position: 'relative'}}>
                <BackgroundImageOverlay/>
                <BackgroundImageContainer><img src='/img/angels-landing.jpg' alt="Angel's Landing"/></BackgroundImageContainer>
                <TypewriterContainer>
                    Hi, I am
                    <h1 style={{margin: 0}}>Ethan Brouwer</h1>
                    I am
                    <Typewriter
                        options={{
                            strings: ['a Husband.', 'a Father.', 'a Code Ninja.', 'a World Traveler.'],
                            autoStart: true,
                            loop: true
                        }}
                    />
                    <FontAwesomeIcon icon={faChevronDown} size={'lg'} style={{cursor: 'pointer'}} onClick={() => scrollToRef(headerRef)} />
                </TypewriterContainer>
            </div>
            <HeaderDiv ref={headerRef}>
                <Col style={{paddingLeft: '20px'}}>
                    <h1 className='header'>Ethan Brouwer</h1>
                </Col>
                <Col style={{textAlign: 'right', flex: 2, paddingRight: '20px'}}>
                    <HeaderLink to={'/'}>About Me</HeaderLink>
                    <HeaderLink to={'/resume'}>Resume</HeaderLink>
                    <HeaderLink to={'/portfolio'}>Portfolio</HeaderLink>
                    <HeaderLink to={'/contact'}>Contact Me</HeaderLink>
                </Col>
            </HeaderDiv>
        </>
    );
};

export default Header;