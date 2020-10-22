import styled from "styled-components";

const Label = styled.label`
  
`;

const Input = styled.input`
  width: 100%;
  margin: 5px 0;
  height: 40px;
  border: none;
  border-bottom: gray 1px solid;
  
  &:focus {
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  margin: 5px 0;
  height: 200px;
  resize: none;
  border: none;
  border-bottom: gray 1px solid;
  
  &:focus {
    outline: none;
  }
`;

export {Label, Input, Textarea};