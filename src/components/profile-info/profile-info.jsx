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
import styles from './profile-info.module.css';

function ProfileInfo() {
  const {
    user: { email: initialEmail, name: initialName },
    updateUserInfoFailed,
  } = useSelector((state) => state.user);
  const initialPassword = '';
  const [password, setPassword] = useState(initialPassword);
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [isChanges, setIsChanges] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    updateUserInfoFailed && onCancelClick();
  }, [updateUserInfoFailed]);

  const inputNameProps = {
    type: 'text',
    placeholder: 'Имя',
    onChange: (e) => {
      setName(e.target.value);
      setIsChanges(true);
    },
    value: name,
    name: 'name',
    error: false,
    size: 'default',
    extraClass: 'ml-1 profile-field',
    icon: 'EditIcon',
  };

  const passwordProps = {
    value: password,
    onChange: (e) => {
      setPassword(e.target.value);
      setIsChanges(true);
    },
    name: 'password',
    icon: 'EditIcon',
    extraClass: 'profile-field',
  };

  const emailProps = {
    value: email,
    placeholder: 'Логин',
    onChange: (e) => {
      setEmail(e.target.value);
      setIsChanges(true);
    },
    name: 'email',
    icon: 'EditIcon',
    extraClass: 'profile-field',
  };

  const onCancelClick = () => {
    setName(initialName);
    setEmail(initialEmail);
    setPassword(initialPassword);
    setIsChanges(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let params = {};

    if (name !== initialName) {
      params.name = name;
    }
    if (email !== initialEmail) {
      params.email = email;
    }
    if (password !== initialPassword) {
      params.password = password;
    }

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
