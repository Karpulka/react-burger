import React from 'react';
import PropTypes from 'prop-types';
import styles from './app-header-button.module.css';
import * as uiComponents from '@ya.praktikum/react-developer-burger-ui-components';

export const ButtonTypes = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  success: 'success',
};

function AppHeaderButton(props) {
  const { icon, type, children } = props;
  const IconComponent = icon ? uiComponents[icon] : '';
  const textColorClass = type === ButtonTypes.secondary ? 'text_color_inactive' : '';
  return (
    <button className={styles.button}>
      <span className={styles.button__icon}>{IconComponent && <IconComponent type={type} />}</span>
      <span className={`${styles.button__text} ${textColorClass}`}>{children}</span>
    </button>
  );
}

AppHeaderButton.defaultProps = {
  type: 'primary',
};

AppHeaderButton.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.string,
  type: ButtonTypes.primary | ButtonTypes.secondary | ButtonTypes.error | ButtonTypes.success,
};

export default AppHeaderButton;
