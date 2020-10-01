import styled, {keyframes} from 'styled-components';
import signUpBackgroundImg from '../../assets/sign-up-background.png'
import {shade} from 'polished';
export const Container = styled.div`
 
 > header {
  height: 144px;
  background: #28262e;
  display: flex;
  align-items: center;
  div {
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    svg{
      color: #999591;
      width: 24px;
      height: 24px;
    }
  }
 }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  align-items: center;
  justify-content: center;
  margin: -176px auto 0;
  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
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

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img{
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ff9000;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    svg {
      width: 24px;
      height: 24px; 
      color: #321e38;
    }
    input {
      display: none;
    }
    &:hover{
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;