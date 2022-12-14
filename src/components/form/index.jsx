import InputForm from '../input';
import { Container, FormCadastro } from './styles';

import './style.css';

import Button from '../button';
import Header from '../header';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import Api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";


function Form({ bancoDados ,setBancoDados }){

  const history = useHistory()

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome Obrigatório'),
    password: yup
      .string()
      .required('Senha obrigatória')
      .matches('([a-zA-Z0-9]{6,})', 'A senha precisa de no minimo 6 caracteres'),
    confirmedPassword: yup
      .string()
      .required('Confirmação de senha obrigatória')
      .oneOf([yup.ref('password')], 'A senha deve ser a mesma'),
    email: yup
      .string().email()
      .required('Email obrigatório'),
    course_module: yup
      .string()
      .required('Módulo obrigatório'),
    bio: yup
      .string()
      .required('Bio obrigatória'),
    contact: yup
      .string().url()
      .required('Link do contato obrigatório'),
  })

  const { 
    register, 
    handleSubmit,
    formState: { errors }, 
  } = useForm({
    resolver: yupResolver(formSchema)
  })

  const onSubmitFunction = ({name, email, password, bio, contact, course_module }) => {
    const data = { name, email, password, bio, contact, course_module}
    setBancoDados(data)
    Api
    .post('/users', data)
    .then((response) => {
      console.log(response.data)
      toast.success('Cadastro realizado com sucesso')
      history.push('/login')
    }) 
    .catch((err) => {
      toast.error('Erro ao realizar o cadastro')
      console.log(err)
    })
  }

  const handleHistory = () => {
    return history.push('/login')
  }

  return(
    <>
    <Header children='Login' functionBtn={ handleHistory } width={'small'}/>
    <Container>
      <div>
        <h1>Crie sua Conta</h1>
        <h3>Rápido e grátis, vamos nessa</h3>
      </div>
      <FormCadastro onSubmit={ handleSubmit(onSubmitFunction)}>

        <label>Nome</label>
        <span>{errors.name && errors.name.message}</span>
        <InputForm placeholder={'Digite aqui seu nome'} register={register('name')}/>
        
        <label>Email</label>
        <span>{errors.email && errors.email.message}</span>
        <InputForm placeholder={'Digite aqui seu email'} register={register('email')}/>

        <label>Senha</label>
        <span>{errors.password && errors.password.message}</span>
        <InputForm placeholder={'Digite aqui sua senha'} register={register('password')} type='password'/>

        <label>Confirmar a senha</label>
        <span>{errors.confirmedPassword && errors.confirmedPassword.message}</span>
        <InputForm placeholder={'Digite novamente sua senha'} register={register('confirmedPassword')} type='password'/>

        <label>Bio</label>
        <span>{errors.bio && errors.bio.message}</span>
        <InputForm placeholder={'Fale sobre você'}register={register('bio')}/>
        
        <label>Contato</label>
        <span>{errors.contact && errors.contact.message}</span>
        <InputForm placeholder={'Opção de contato'} register={register('contact')}/>

        <label>Selecionar módulo</label>
        <span>{errors.course_module && errors.course_module.message}</span>

        <select {...register('course_module')}>
          <option value='Primeiro Módulo (Introdução ao Front End)'>Primeiro Módulo</option>
          <option value='Segundo módulo (Frontend Avançado)'>Segundo Módulo</option>
          <option value='Terceiro módulo (Introdução ao Backend)'>Terceiro Módulo</option>
          <option value="Quarto módulo (Backend Avançado)">Quarto módulo</option>
        </select> 

        <Button color='true' type='submit'>Cadastrar</Button>
      </FormCadastro>
    </Container>
    </>
  )
}

export default Form