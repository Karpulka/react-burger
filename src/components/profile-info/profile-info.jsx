import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserInfo } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import styles from './profile-info.module.css';

function ProfileInfo() {
  const {
    user: { email: initialEmail, name: initialName },
    updateUserInfoFailed,
  } = useSelector((state) => state.user);
  const initialPassword = '';
  const initialValues = {
    name: initialName,
    email: initialEmail,
    password: initialPassword,
  };
  const { values, handleChange, setValues } = useForm(initialValues);
  const [isChanges, setIsChanges] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    updateUserInfoFailed && onCancelClick();
  }, [updateUserInfoFailed]);

  const onFiledChange = (event) => {
    handleChange(event);
    setIsChanges(true);
  };

  const inputNameProps = {
    type: 'text',
    placeholder: 'Имя',
    onChange: onFiledChange,
    value: values.name,
    name: 'name',
    error: false,
    size: 'default',
    extraClass: 'ml-1 profile-field',
    icon: 'EditIcon',
  };

  const passwordProps = {
    value: values.password,
    onChange: onFiledChange,
    name: 'password',
    icon: 'EditIcon',
    extraClass: 'profile-field',
  };

  const emailProps = {
    value: values.email,
    placeholder: 'Логин',
    onChange: onFiledChange,
    name: 'email',
    icon: 'EditIcon',
    extraClass: 'profile-field',
  };

  const onCancelClick = () => {
    setValues(initialValues);
    setIsChanges(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let params = {};

    Object.keys(values).forEach((name) => {
      if (values[name] !== initialValues[name]) {
        params[name] = values[name];
      }
    });

    dispatch(updateUserInfo(params));
    setIsChanges(false);
  };

  return (
    <form className={styles.info} onSubmit={onSubmit}>
      <Input {...inputNameProps} />
      <EmailInput {...emailProps} />
      <PasswordInput {...passwordProps} />
      {updateUserInfoFailed && (
        <div className={styles.error}>Что-то пошло не так. Попробуйте позже.</div>
      )}
      {isChanges && (
        <div className={styles.buttons}>
          <button className={styles.cancel} type="button" onClick={onCancelClick}>
            Отменить
          </button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default ProfileInfo;
