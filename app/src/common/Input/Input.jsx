export default function Input( {
    id,
    className,
    name,
    type,
    placeholder,
    required,
    onChange,
    onClick,
    checked,
    value }) {

    return (
        <input 
            id={id}
            className={className}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
            onClick={onClick}
            value={value}
            checked={checked}
        />
    )
}