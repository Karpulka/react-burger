import React, { useState } from 'react';
import AppForm from '../components/app-form/app-form';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
// import {register} from '../services/actions/user';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const history = useHistory();

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onSubmitForm = () => {
    // dispatch(register({ name, email, password }));
    history.push('/login');
  };

  const formProps = {
    title: 'Восстановление пароля',
    btnText: 'Сохранить',
    onSubmitForm,
    description: (
      <>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?
          <Link to="/login" className="form__link">
            Войти
          </Link>
        </p>
      </>
    ),
  };

  const passwordProps = {
    value: password,
    onChange: onChangePassword,
    name: 'password',
    placeholder: 'Введите новый пароль',
    extraClass: 'mb-2',
  };

  const inputCodeProps = {
    type: 'number',
    placeholder: 'Введите код из письма',
    onChange: onChangeCode,
    value: code,
    name: 'code',
    error: false,
    size: 'default',
    extraClass: 'ml-1 mb-2',
  };

  return (
    <AppForm {...formProps}>
      <PasswordInput {...passwordProps} />
      <Input {...inputCodeProps} />
    </AppForm>
  );
}

export default ResetPasswordPage;
