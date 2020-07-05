import React, {useCallback} from 'react';
import {Container, Content, Background} from './styles';
import { FiUser, FiMail, FiLock, FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

const SignUp: React.FC = () => {
 
 const handleSubmit = useCallback( async (data: object) => {
    try{
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatorio')
                            .email('Digite um e-mail valido'),
        password: Yup.string().min(6, "No mínimo 6 digitos"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    }catch ( err){
      console.log(err);
    }
    console.log(data);
  },[] );



  return (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="GoBarber"/>
      <Form initialData={{ name: 'Ramon'}} onSubmit={handleSubmit}>
        <h1>Faça seu cadastro</h1>
        <Input name="name" icon={FiUser} placeholder="Nome"/>
        <Input name="email" icon={FiMail} placeholder="E-mail"/>
        <Input  name="password"  icon={FiLock} type="password" placeholder="Senha"  />
        <Button type="submit">Cadastrar</Button>
     
      </Form>

      <a href="">
        <FiArrowLeft />
       Voltar para Login
      </a>
    
    </Content>
    
  </Container>
)};

export default SignUp;