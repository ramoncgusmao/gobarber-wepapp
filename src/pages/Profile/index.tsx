import React, { useCallback, useRef } from 'react';
import { Container, Content } from './styles';
import { FormHandles } from '@unform/core';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const {addToast} = useToast();
  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {

      formRef.current?.setErrors([]);
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatorio')
          .email('Digite um e-mail valido'),
        password: Yup.string().min(6, "No mínimo 6 digitos"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode fazer seu logon no GoBarber!',
      });
    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      } else {
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao cadastrar, tente novamente',
        });
      }
    }
    console.log(data);
  }, [addToast, history ]);



  return (
    <Container>
      <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Meu perfil</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">Cadastrar</Button>

          </Form>

         

      
      </Content>

    </Container>
  )
};

export default Profile;