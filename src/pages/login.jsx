import React, { useState, useEffect } from 'react';
import AppForm from '../components/app-form/app-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/actions/user';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const isUserInfo = Object.keys(user).length;

  useEffect(() => {
    isUserInfo && history.push('/');
  }, [isUserInfo, history]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitForm = () => {
    dispatch(login({ email, password }));
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
