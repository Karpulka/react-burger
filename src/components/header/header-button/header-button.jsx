import React from 'react';
import PropTypes from 'prop-types';
import styles from './header-button.module.css';
import * as uiComponents from '@ya.praktikum/react-developer-burger-ui-components';

export const ButtonTypes = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  success: 'success',
};

function HeaderButton(props) {
  const [buttonType, setButtonType] = React.useState(
    props.isActive ? ButtonTypes.primary : ButtonTypes.secondary
  );

  const toggleButtonType = () => {
    if (!props.isActive) {
      setButtonType((prevState) =>
        prevState === ButtonTypes.secondary ? ButtonTypes.primary : ButtonTypes.secondary
      );
    }
  };

  const { icon, children } = props;
  const IconComponent = icon ? uiComponents[icon] : '';
  const textColorClass = buttonType === ButtonTypes.secondary ? 'text_color_inactive' : '';
  return (
    <button
      className={styles.button}
      onMouseEnter={toggleButtonType}
      onMouseLeave={toggleButtonType}>
      <span className={styles.button__icon}>
        {IconComponent && <IconComponent type={buttonType} />}
      </span>
      <span className={`${styles.button__text} ${textColorClass}`}>{children}</span>
    </button>
  );
}

HeaderButton.defaultProps = {
  isActive: false,
};

HeaderButton.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.string,
  isActive: PropTypes.bool,
};

export default HeaderButton;
