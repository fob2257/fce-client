import React from 'react'
import PropTypes from 'prop-types';

const InputGroup = ({
  type,
  placeholder,
  name,
  icon,
  value,
  onChange,
  required = false,
  disabled = false,
  errors = {},
}) => (
    <div className='input-group mb-3'>
      <div className='input-group-prepend'>
        <span className='input-group-text'>
          <i className={icon} />
        </span>
      </div>
      <input
        type={type}
        className={`form-control form-control-lg ${errors.hasOwnProperty(name) && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      {
        errors.hasOwnProperty(name) && errors[name].map((value, i) => <div key={i} className='invalid-feedback'>{value}</div>)
      }
    </div>
  );

InputGroup.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  errors: PropTypes.object,
};

InputGroup.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
};

export default InputGroup;
