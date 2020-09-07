import React, { useCallback, useRef, useState } from 'react';
import { Container, Content, Background, AnimationContainer } from './styles';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import logoImg from '../../assets/logo.svg';
import { Form } from '@unform/web';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/Toast';
import { Link } from 'react-router-dom';
import api from '../../services/api';
interface ForgotPasswordFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      formRef.current?.setErrors([]);
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatorio')
          .email('Digite um e-mail valido'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

     await api.post('/password/forgot', {
        email: data.email,
      });

      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado',
        description: 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada'
      });

      // recuperacao de senha
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
        addToast({
          type: 'error',
          title: 'Erro de recuperacao de senha',
          description: 'Ocorreu um erro ao tentar fazer a recuperação de senha, tente novamente',
        });
      }

    } finally {
      setLoading(false);
    }

  }, [addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>

          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button  loading={loading} type="submit">Recuperar</Button>
          </Form>

          <Link to="/signup">
            <FiLogIn />
           Voltar ao login
          </Link>

        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;