import React, { useCallback, useRef } from 'react';
import { Container, Content, Background } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.svg';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';
import {useToast} from '../../hooks/Toast';
interface SignFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const handleSubmit = useCallback(async (data: SignFormData) => {
    try {

      formRef.current?.setErrors([]);
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatorio')
          .email('Digite um e-mail valido'),
        password: Yup.string().required("senha obrigatoria"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

     await signIn({ email: data.email, password: data.password });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }else{
          addToast({
            type: 'error',
            title: 'Erro na autenticacao',
            description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
          });
      }

    }

  }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button type="submit">Entrar</Button>
          <a href="forgot">esqueci minha senha</a>
        </Form>

        <a href="">
          <FiLogIn />
        Criar conta
      </a>

      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;