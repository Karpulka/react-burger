import React, { useState, useEffect } from 'react';
import AppForm from '../components/app-form/app-form';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { resetPassword } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { resetIsResetPasswordSuccess } from '../services/reducers/user';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const { isResetPasswordSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    isResetPasswordSuccess && history.push('/login');
    return () => {
      dispatch(resetIsResetPasswordSuccess());
    };
  }, [history, dispatch, isResetPasswordSuccess]);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };

  const onSubmitForm = () => {
    dispatch(resetPassword({ password, token: code }));
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
    required: true,
  };

  const inputCodeProps = {
    type: 'text',
    placeholder: 'Введите код из письма',
    onChange: onChangeCode,
    value: code,
    name: 'code',
    error: false,
    size: 'default',
    extraClass: 'ml-1 mb-2',
    required: true,
  };

  return (
    <AppForm {...formProps}>
      <PasswordInput {...passwordProps} />
      <Input {...inputCodeProps} />
    </AppForm>
  );
}

export default ResetPasswordPage;
