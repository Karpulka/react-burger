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

class HeaderButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonType: this.props.isActive ? ButtonTypes.primary : ButtonTypes.secondary,
    };
  }

  toggleButtonType = () => {
    if (!this.props.isActive) {
      this.setState((prevState) => ({
        buttonType:
          prevState.buttonType === ButtonTypes.secondary
            ? ButtonTypes.primary
            : ButtonTypes.secondary,
      }));
    }
  };

  render() {
    const { icon, children } = this.props;
    const IconComponent = icon ? uiComponents[icon] : '';
    const textColorClass =
      this.state.buttonType === ButtonTypes.secondary ? 'text_color_inactive' : '';
    return (
      <button
        className={styles.button}
        onMouseEnter={this.toggleButtonType}
        onMouseLeave={this.toggleButtonType}>
        <span className={styles.button__icon}>
          {IconComponent && <IconComponent type={this.state.buttonType} />}
        </span>
        <span className={`${styles.button__text} ${textColorClass}`}>{children}</span>
      </button>
    );
  }
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
