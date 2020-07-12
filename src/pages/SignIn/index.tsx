import React, { useCallback, useRef } from 'react';
import { Container, Content, Background, AnimationContainer } from './styles';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.svg';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';
import { Link, useHistory } from 'react-router-dom';
interface SignFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
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
      history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
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
        <AnimationContainer>

          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">Entrar</Button>
            <a href="forgot">esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>

        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;