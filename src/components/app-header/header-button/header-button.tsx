import React, { FC } from 'react';
import styles from './header-button.module.css';
import * as uiComponents from '@ya.praktikum/react-developer-burger-ui-components';

export const ButtonTypes = {
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  success: 'success',
};

interface IHeaderButtonProps {
  icon: string;
  children: string;
  isActive?: boolean;
  onButtonClick?: () => void;
}

const HeaderButton: FC<IHeaderButtonProps> = (props) => {
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

  const { icon, children, onButtonClick } = props;
  const IconComponent = icon ? uiComponents[icon] : '';
  const textColorClass = buttonType === ButtonTypes.secondary ? 'text_color_inactive' : '';

  const onClick = () => {
    onButtonClick && onButtonClick();
  };

  return (
    <button
      className={styles.button}
      onMouseEnter={toggleButtonType}
      onMouseLeave={toggleButtonType}
      onClick={onClick}>
      <span className={styles.button__icon}>
        {IconComponent && <IconComponent type={buttonType} />}
      </span>
      <span className={`${styles.button__text} ${textColorClass}`}>{children}</span>
    </button>
  );
};

HeaderButton.defaultProps = {
  isActive: false,
};

export default HeaderButton;
