const FormRow = ({ value, onChange, type, name, placeholder, min }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
