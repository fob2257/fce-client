import React, { useRef } from 'react'
import PropTypes from 'prop-types';

const InputGroup = ({
  type,
  id,
  placeholder,
  name,
  icon,
  value,
  onChange,
  required = false,
  disabled = false,
  showDelete = false,
  onClickDelete,
  errors = {},
}) => {
  const inputRef = useRef(null);

  return (
    <div className='input-group mb-3'>
      <div className='input-group-prepend'>
        <span className='input-group-text'>
          <i className={icon} />
        </span>
      </div>
      <input
        ref={inputRef}
        type={type}
        id={id}
        className={`form-control form-control-lg ${errors.hasOwnProperty(name) && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      {
        showDelete && (
          <div className='input-group-append'>
            <span className='input-group-text'>
              <button type='button' className='btn btn-danger btn-sm' onClick={() => onClickDelete(inputRef)}>
                <i className='fas fa-trash' />
              </button>
            </span>
          </div>
        )
      }
      {
        errors.hasOwnProperty(name) && errors[name].map((value, i) => <div key={i} className='invalid-feedback'>{value}</div>)
      }
    </div>
  );
};

InputGroup.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  showDelete: PropTypes.bool,
  onClickDelete: PropTypes.func,
  errors: PropTypes.object,
};

InputGroup.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  showDelete: false,
};

export default InputGroup;
