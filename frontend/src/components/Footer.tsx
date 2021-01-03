import * as React from "react";
// import styled from "styled-components";
// import {Col, Row} from "../styles/grid";
// import {Link} from "react-router-dom";

// const FooterDiv = styled(Row)`
//   color: white;
//   width: 100%;
//   background: #32a852;
//   align-items: center;
//   top: 0;
//   height: 50px;
//   margin-top: 20px;
// `;
//
// const FooterLink = styled(Link)`
//   color: white;
//   padding: 1em;
//   font-weight: bold;
//   text-decoration: none;
//
//   &:visited, &:focus {
//     color: white;
//   }
//
//   &:hover {
//     color: white;
//     text-decoration: underline;
//   }
// `;

const Footer: React.FC = () => {
    return (
        // <FooterDiv>
        //     {/*<Col style={{paddingLeft: '20px'}}>*/}
        //     {/*    <h3 className='header'>Ethan Brouwer</h3>*/}
        //     {/*</Col>*/}
        //     <Col style={{textAlign: 'right', flex: 2, paddingRight: '20px'}}>
        //         <FooterLink to={'/'}>About Me</FooterLink>
        //         <FooterLink to={'/resume'}>Resume</FooterLink>
        //         <FooterLink to={'/portfolio'}>Portfolio</FooterLink>
        //         <FooterLink to={'/contact'}>Contact Me</FooterLink>
        //     </Col>
        // </FooterDiv>
        <div style={{height: '10px'}}>&nbsp;</div>
    );
};

export default Footer;