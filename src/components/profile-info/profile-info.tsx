import React, { useState, useEffect, FC } from 'react';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserInfo } from '../../services/actions/user';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useForm } from '../../hooks/useForm';
import styles from './profile-info.module.css';
import { IProfile, IUserFields } from '../../utils/types';

const ProfileInfo: FC = () => {
  const { user, updateUserInfoFailed } = useAppSelector((state) => state.user);
  const { email: initialEmail, name: initialName } = user as IUserFields;
  const initialPassword = '';
  const initialValues: IProfile = {
    name: initialName as string,
    email: initialEmail as string,
    password: initialPassword,
  };
  const { values, handleChange, setValues } = useForm(initialValues);
  const [isChanges, setIsChanges] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    updateUserInfoFailed && onCancelClick();
  }, [updateUserInfoFailed]);

  const onFiledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
