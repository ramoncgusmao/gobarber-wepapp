import styled, {keyframes} from 'styled-components';
import signUpBackgroundImg from '../../assets/sign-up-background.png'
import {shade} from 'polished';
export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: #F4EDE8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transiction: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#F4ede8')};
      }
    }


  }


`;

const appearsFromRigth = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`


export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;

`;