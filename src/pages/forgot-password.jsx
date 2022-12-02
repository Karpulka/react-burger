import React, { useState } from 'react';
import AppForm from '../components/app-form/app-form';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
// import {register} from '../services/actions/user';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitForm = () => {
    // dispatch(register({ name, email, password }));
    history.push('/reset-password');
  };

  const formProps = {
    title: 'Восстановление пароля',
    btnText: 'Восстановить',
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

  const emailProps = {
    value: email,
    onChange: onChangeEmail,
    name: 'email',
    isIcon: false,
    placeholder: 'Укажите e-mail',
  };

  return (
    <AppForm {...formProps}>
      <EmailInput {...emailProps} />
    </AppForm>
  );
}

export default ForgotPasswordPage;
