import React, { FC } from 'react';
import AppForm from '../components/app-form/app-form';
import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { register } from '../services/actions/user';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { IProfile } from '../utils/types';

const RegisterPage: FC = () => {
  const { values, handleChange } = useForm<IProfile>({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const onSubmitForm = () => {
    dispatch(register(values));
  };

  const formProps = {
    title: 'Регистрация',
    btnText: 'Зарегистрироваться',
    onSubmitForm,
    description: (
      <>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?
          <Link to="/login" className="form__link">
            Войти
          </Link>
        </p>
      </>
    ),
  };

  const inputNameProps = {
    type: 'text',
    placeholder: 'Имя',
    onChange: handleChange,
    value: values.name,
    name: 'name',
    error: false,
    size: 'default',
    extraClass: 'ml-1',
  };

  const passwordProps = {
    value: values.password,
    onChange: handleChange,
    name: 'password',
    extraClass: 'mb-2',
  };

  const emailProps = {
    value: values.email,
    onChange: handleChange,
    name: 'email',
    isIcon: false,
  };

  return (
    <AppForm {...formProps}>
      <>
        <Input {...inputNameProps} />
        <EmailInput {...emailProps} />
        <PasswordInput {...passwordProps} />
      </>
    </AppForm>
  );
};

export default RegisterPage;
