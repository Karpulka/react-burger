import React, { useState, useEffect, FC } from 'react';
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
import { IProfile } from '../../utils/types';

const ProfileInfo: FC = () => {
  const {
    user: { email: initialEmail, name: initialName },
    updateUserInfoFailed,
  } = useSelector((state: any) => state.user);
  const initialPassword = '';
  const initialValues: IProfile = {
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

  const onFiledChange = (event: React.ChangeEvent) => {
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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let params: { [key: string]: string } = {};

    Object.keys(values).forEach((name) => {
      if (values[name] !== initialValues[name]) {
        params[name] = values[name];
      }
    });
    // @ts-ignore
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
};

export default ProfileInfo;
