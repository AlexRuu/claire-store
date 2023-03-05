const FormRow = ({ value, onChange, type, name, placeholder, min, step }) => {
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
        step={step}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
