import styled from "styled-components";
import {Row} from "./grid";

const FormRow = styled(Row)`
  margin-bottom: 20px;
`;

const Label = styled.label`
  
`;

const Input = styled.input`
  width: calc(100% - 20px);
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
  width: calc(100% - 20px);
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
  &:disabled {
    background: #8d8d8d;
    cursor: not-allowed;
  }
`;

const Alert = styled.div<{error?: boolean}>`
  width: 100%;
  background: ${props => props.error ? '#ff6666' : '#43aeff'};
  padding: 5px;
  border-radius: 3px;
`;

export {FormRow, Label, Input, Textarea, Button, Alert};