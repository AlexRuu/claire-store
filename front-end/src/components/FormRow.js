const FormRow = ({ value, onChange, type, name }) => {
  return (
    <div>
      <label htmlFor={name} className="login-label">
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="login-input"
      />
    </div>
  );
};

export default FormRow;
