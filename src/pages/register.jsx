import React, { useState } from 'react';
import AppForm from '../components/app-form/app-form';
import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { register } from '../services/actions/user';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitForm = () => {
    dispatch(register({ name, email, password }));
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
    onChange: (e) => setName(e.target.value),
    value: name,
    name: 'name',
    error: false,
    size: 'default',
    extraClass: 'ml-1',
  };

  const passwordProps = {
    value: password,
    onChange: onChangePassword,
    name: 'password',
    extraClass: 'mb-2',
  };

  const emailProps = {
    value: email,
    onChange: onChangeEmail,
    name: 'email',
    isIcon: false,
  };

  return (
    <AppForm {...formProps}>
      <Input {...inputNameProps} />
      <EmailInput {...emailProps} />
      <PasswordInput {...passwordProps} />
    </AppForm>
  );
}

export default RegisterPage;
