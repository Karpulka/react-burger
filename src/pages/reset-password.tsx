import React, { useEffect, FC } from 'react';
import AppForm from '../components/app-form/app-form';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { resetPassword } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { resetIsResetPasswordSuccess } from '../services/reducers/user';
import { useForm } from '../hooks/useForm';

const ResetPasswordPage: FC = () => {
  const { values, handleChange } = useForm({
    token: '',
    password: '',
  });
  const { isResetPasswordSuccess } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    isResetPasswordSuccess && history.push('/login');
    return () => {
      dispatch(resetIsResetPasswordSuccess());
    };
  }, [history, dispatch, isResetPasswordSuccess]);

  const onSubmitForm = () => {
    // @ts-ignore
    dispatch(resetPassword(values));
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
    value: values.password,
    onChange: handleChange,
    name: 'password',
    placeholder: 'Введите новый пароль',
    extraClass: 'mb-2',
    required: true,
  };

  const inputCodeProps = {
    type: 'text',
    placeholder: 'Введите код из письма',
    onChange: handleChange,
    value: values.token,
    name: 'token',
    error: false,
    size: 'default',
    extraClass: 'ml-1 mb-2',
    required: true,
  };

  return (
    <AppForm {...formProps}>
      <>
        <PasswordInput {...passwordProps} />
        <Input {...inputCodeProps} />
      </>
    </AppForm>
  );
};

export default ResetPasswordPage;
