import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './app-form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

function AppForm(props) {
  const { title, btnText, onSubmitForm, children, description } = props;

  const onSubmit = useCallback(
    (e) => {
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
}

AppForm.propTypes = {
  title: PropTypes.string,
  btnText: PropTypes.string,
  onSubmitForm: PropTypes.func.isRequired,
  description: PropTypes.node,
  children: PropTypes.node,
};

export default AppForm;
