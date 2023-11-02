const ModalInput = ({ label, defaultValue, onChange, name }) => {
  return (
    <div className="form-group flex flex-col flex-auto mb-5">
      <label htmlFor={name} className="text-xs pb-1">
        {label}
      </label>
      <input
        className="w-48 py-2 px-4 text-xs rounded-xl border border-grey"
        min="0"
        max="60"
        step="any"
        type="number"
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default ModalInput;
