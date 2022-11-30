import React, { useState } from 'react';
import AppForm from '../components/app-form/app-form';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function LoginPage() {
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
    title: 'Вход',
    btnText: 'Войти',
    onSubmitForm,
    description: (
      <>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы&nbsp;— новый пользователь?
          <Link to="/register" className="form__link">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link to="/forgot-password" className="form__link">
            Восстановить пароль
          </Link>
        </p>
      </>
    ),
  };

  return (
    <AppForm {...formProps}>
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

export default LoginPage;
