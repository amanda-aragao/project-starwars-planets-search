// FormStyles.js

import styled from 'styled-components';

export const FormContainer = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: 120px;
  padding: 0;

`;

export const StyledForm = styled.form`
  width: 620px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; 
`;

export const StyledButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #FFE000;
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding-left: 5px
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;
