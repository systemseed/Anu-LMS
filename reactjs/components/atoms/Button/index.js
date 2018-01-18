import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, size, block, active, disabled, onClick, loading, children }) => {

  let classes = ['btn'];

  if (type) {
    classes.push('btn-' + type);
  }

  if (size) {
    classes.push('btn-' + size);
  }

  if (block) {
    classes.push('btn-block');
  }

  if (active) {
    classes.push('btn-active');
  }

  if (disabled || loading) {
    classes.push('btn-disabled');
  }

  return (
    <button
      type="submit"
      onClick={onClick}
      className={classes.join(' ')}
    >

      {loading &&
      <svg className="progress-circle" viewBox='0 0 41 41'>
        <path d='M38,20.5 C38,30.1685093 30.1685093,38 20.5,38'/>
      </svg>
      }

      <span className={loading ? 'invisible' : ''}>
        {children}
      </span>

    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['lg', 'md', 'sm', 'xs']),
  block: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  type: 'primary',
  size: 'lg',
  block: false,
  active: false,
  disabled: false,
  loading: false,
  onClick: () => {},
};

export default Button;