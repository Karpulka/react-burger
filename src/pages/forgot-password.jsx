import React, { useState, useEffect } from 'react';
import AppForm from '../components/app-form/app-form';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory } from 'react-router-dom';
import { forgotPassword } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { resetIsForgotPasswordSuccess } from '../services/reducers/user';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const { isForgotPasswordSuccess } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    isForgotPasswordSuccess && history.push('/reset-password');

    return () => {
      dispatch(resetIsForgotPasswordSuccess());
    };
  }, [history, isForgotPasswordSuccess, dispatch, resetIsForgotPasswordSuccess]);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitForm = () => {
    dispatch(forgotPassword({ email }));
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
