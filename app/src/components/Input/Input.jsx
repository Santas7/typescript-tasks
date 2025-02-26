import styles from './Input.module.scss';

export default function Input({
  id,
  className = '',
  name,
  type = 'text',
  placeholder = '',
  required = false,
  onChange,
  onClick,
  value,
  checked,
  disabled = false,
  error = '',
  icon = null,
  radius = 'md',
  label = '',
  size = 'md',
  ...rest
}) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.inputContainer}>
        {icon && <span className={styles.icon}>{icon}</span>}

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          disabled={disabled}
          label={label}
          className={`
            ${styles.input} 
            ${styles[size]} 
            ${styles[radius]} 
            ${icon ? styles.withIcon : ''} 
            ${disabled ? styles.disabled : ''} 
            ${error ? styles.error : ''}
          `}
          {...rest}
        />
      </div>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
