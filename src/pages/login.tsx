import React, { FC } from 'react';
import AppForm from '../components/app-form/app-form';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../services/actions/user';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { IUserActionsFields } from '../utils/types';

const LoginPage: FC = () => {
  const { values, handleChange } = useForm<IUserActionsFields>({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  const onSubmitForm = () => {
    dispatch(login(values));
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
      <>
        <EmailInput onChange={handleChange} value={values.email} name={'email'} isIcon={false} />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          extraClass="mb-2"
        />
      </>
    </AppForm>
  );
};

export default LoginPage;
