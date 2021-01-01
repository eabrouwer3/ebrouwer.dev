import styled from "styled-components";
import {Row} from "./grid";

const FormRow = styled(Row)`
  margin-bottom: 20px;
`;

const Label = styled.label`
  
`;

const Input = styled.input`
  width: 100%;
  margin: 5px 0;
  height: 20px;
  border: none;
  border-bottom: rgba(0, 0, 0, 0.2) 1px solid;
  background: rgba(0, 0, 0, 0.025);
  padding: 10px;
  
  &:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  margin: 5px 0;
  height: 200px;
  resize: none;
  border: none;
  border-bottom: rgba(0, 0, 0, 0.2) 1px solid;
  background: rgba(0, 0, 0, 0.025);
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  
  &:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.05);
  }
`;

const Button = styled.button`
  width: 100%;
  color: white;
  height: 35px;
  border-radius: 3px;
  border: none;
  background: #3071F1;
  cursor: pointer;
  
  &:hover {
    background: #1C5DDD;
  }
  
  &:focus {
    outline: none;
  }
`;

export {FormRow, Label, Input, Textarea, Button};