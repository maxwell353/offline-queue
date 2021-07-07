import styled from 'styled-components/native';

export const Container = styled.View`
  flex-grow: 1;
  padding: 0 16px;

  justify-content: center;
`;

export const Input = styled.TextInput`
  height: 48px;

  border: 1px solid #e3e3e3;
  border-radius: 8px;
  background-color: #e3e3e3;

  margin-bottom: 16px;

  font-size: 18px;
  font-weight: 500;
  padding-left: 16px;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 48px;

  background-color: #374d75;
  border-radius: 8px;
  margin-top: 16px;

  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
`;
