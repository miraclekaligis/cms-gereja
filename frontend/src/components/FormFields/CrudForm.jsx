const CrudForm = ({ fields, value, onChange, onSubmit, submitLabel }) => (
  <form className="card form-grid" onSubmit={onSubmit}>
    {fields.map((field) => (
      <label key={field.key}>
        {field.label}
        {field.type === 'textarea' ? (
          <textarea
            value={value[field.key] || ''}
            onChange={(event) => onChange(field.key, event.target.value)}
            rows={4}
            required
          />
        ) : (
          <input
            type={field.type || 'text'}
            value={value[field.key] || ''}
            onChange={(event) => onChange(field.key, event.target.value)}
            required
          />
        )}
      </label>
    ))}
    <button type="submit">{submitLabel}</button>
  </form>
);

export default CrudForm;
