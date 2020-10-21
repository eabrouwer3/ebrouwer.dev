import * as React from "react";
import {Col, Row} from "../styles/grid";
import styled from "styled-components";
import {Link} from "react-router-dom";

const HeaderDiv = styled(Row)`
  color: white;
  width: 100%;
  background: #32a852;
  align-items: center;
`;

const HeaderLink = styled.span`
  cursor: pointer;
  padding: 1em 1.5em;
  text-transform: uppercase;
  font-weight: bold;
  border: 1px transparent solid;
  
  a {
    text-decoration: none;
    
    &:visited {
      color: white;
    }
  }
  
  &:hover {
    border: 1px white solid;
  }
`;

const Header: React.FC = () => {
    return (
        <HeaderDiv>
            <Col style={{paddingLeft: '20px'}}>
                <h1 className='header'>Ethan Brouwer</h1>
            </Col>
            <Col style={{textAlign: 'right', flex: 2, paddingRight: '20px'}}>
                <HeaderLink><Link to={'/'}>Home</Link></HeaderLink>
                <HeaderLink><Link to={'/'}>About</Link></HeaderLink>
                <HeaderLink><Link to={'/'}>Resume</Link></HeaderLink>
                <HeaderLink><Link to={'/'}>Cool Stuff</Link></HeaderLink>
            </Col>
        </HeaderDiv>
    );
};

export default Header;