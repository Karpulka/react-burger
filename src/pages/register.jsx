import React, { useState } from 'react';
import AppForm from '../components/app-form/app-form';
import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitForm = () => {
    console.log('submit');
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

  return (
    <AppForm {...formProps}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={(e) => setName(e.target.value)}
        value={name}
        name={'name'}
        error={false}
        size={'default'}
        extraClass="ml-1"
      />
      <EmailInput onChange={onChangeEmail} value={email} name={'email'} isIcon={false} />
      <PasswordInput
        onChange={onChangePassword}
        value={password}
        name={'password'}
        extraClass="mb-2"
      />
    </AppForm>
  );
}

export default RegisterPage;
