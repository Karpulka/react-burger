import React, { useCallback, FC, ReactElement } from 'react';
import styles from './app-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

interface IAppForm {
  title?: string;
  btnText?: string;
  onSubmitForm: () => void;
  description?: ReactElement;
  children?: ReactElement;
}

const AppForm: FC<IAppForm> = (props) => {
  const { title, btnText, onSubmitForm, children, description } = props;

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSubmitForm();
    },
    [onSubmitForm]
  );

  return (
    <div className={styles['form-wrapper']}>
      <form className={styles.form} onSubmit={onSubmit}>
        {title && <div className={styles.form__title}>{title}</div>}
        {children}
        <Button htmlType="submit" className={styles.form__button}>
          {btnText ? btnText : 'Отправить'}
        </Button>
        {description && <div className={styles.form__description}>{description}</div>}
      </form>
    </div>
  );
};

export default AppForm;
