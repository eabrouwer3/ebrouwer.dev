import styled from "styled-components";

const CardDiv = styled.div`
  display: flex;
  padding: 15px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const CardImage = styled.div`
  max-width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 5px;
  @media (max-width: 480px) {
    display: none;
  }
  img {
    width: 100%;
  }
`;

const CardHeader = styled.h2`
  display: inline-block;
  //padding-bottom: 5px;
  margin: 0;
`;

const CardSubHeader = styled.a`
  display: inline-block;
  color: #666666;
  margin: 0;
  font-size: .8rem;
  text-decoration: none;
  &:focus { color: #666666; text-decoration: none; }
  &:visited { color: #666666; text-decoration: none; }
  &:hover { color: #444444; text-decoration: none; }
`;

const CardBody = styled.div`
  flex-grow: 1;
  padding-left: 5px;
  p {
    margin-top: 10px;
    margin-bottom: 0;
  }
`;

export {CardDiv, CardImage, CardSubHeader, CardHeader, CardBody};