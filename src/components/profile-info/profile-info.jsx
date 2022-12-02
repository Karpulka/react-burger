import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Input,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-info.module.css';

function ProfileInfo() {
  const { email: initialEmail, name: initialName } = useSelector((state) => state.user.user);
  const [password, setPassword] = useState('');
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  // const dispatch = useDispatch();

  const inputNameProps = {
    type: 'text',
    placeholder: 'Имя',
    onChange: (e) => {
      setName(e.target.value);
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
    },
    name: 'email',
    icon: 'EditIcon',
    extraClass: 'profile-field',
  };

  return (
    <form className={styles.info}>
      <Input {...inputNameProps} />
      <EmailInput {...emailProps} />
      <PasswordInput {...passwordProps} />
    </form>
  );
}

export default ProfileInfo;
