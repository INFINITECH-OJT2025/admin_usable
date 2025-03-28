import React, { useState, useEffect } from 'react';
import './style.css';
import "@/app/assets/css/dark-mode.css";

interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "email" | "select" | "datetime" | "checkbox" | "radio" | "button" | "file" | "textarea";
  required: boolean;
  placeholder?: string;
  options?: string[];
  length?: number;
  defaultValue?: string;
  nullValue?: boolean;
  index?: string;
  autoIncrement?: boolean;
  columnName?: string;
  datatype?: "INT" | "TINYINT" | "SMALLINT" | "MEDIUMINT" | "BIGINT" | "DECIMAL" | "FLOAT" | "DOUBLE" | "BIT" | "CHAR" | "VARCHAR" | "TEXT" | "TINYTEXT" | "MEDIUMTEXT" | "LONGTEXT" | "DATE" | "DATETIME" | "TIMESTAMP" | "TIME" | "YEAR" | "BOOLEAN" | "JSON" | "BLOB" | "TINYBLOB" | "MEDIUMBLOB" | "LONGBLOB" | "ENUM" | "SET";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormField) => void;
  field: FormField | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, field }) => {
  const [formData, setFormData] = useState<FormField | null>(field);
  const [showInput, setShowInput] = useState(formData?.defaultValue === "defined");
  const [newOption, setNewOption] = useState("");

  useEffect(() => {
    setFormData(field);
  }, [field]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
  
    // Update formData based on the input type
    setFormData((prev) => ({
      ...prev!,
      [name]: type === 'checkbox' ? checked : value,
    }));
  
    // Update columnName and datatype based on label and type
    if (name === 'label') {
      // Only update columnName if the type is not 'file'
      const columnName = formData?.type === 'file' ? 'file' : value.toLowerCase().replace(/\s+/g, '_');
      const datatype = getDataType(formData?.type);
      setFormData((prev) => ({
        ...prev!,
        columnName,
        datatype,
      }));
    }
  
    if (name === 'type') {
      let columnName = '';
      let datatype = '';
  
      if (value === 'file') {
        columnName = 'file'; // Set column name to 'file' for File Upload
        datatype = 'VARCHAR'; // Set data type to VARCHAR for File Upload
      } else {
        columnName = formData?.label.toLowerCase().replace(/\s+/g, '_') || ''; // Generate column name from label
        datatype = getDataType(value as FormField['type']); // Get data type based on selected type
      }
  
      setFormData((prev) => ({
        ...prev!,
        columnName,
        datatype,
      }));
    }
  };

  const getDataType = (type: FormField['type'] | undefined): FormField['datatype'] => {
    switch (type) {
      case 'text':
      case 'email':
      case 'number':
      case 'select':
      case 'textarea':
        return 'VARCHAR';
      case 'datetime':
        return 'DATETIME';
      case 'checkbox':
        return 'JSON';
      case 'radio':
        return 'VARCHAR';
      case 'file':
        return 'VARCHAR'; // File Upload will be handled as VARCHAR
      default:
        return 'VARCHAR'; // Default case
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  const handleDefaultChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setShowInput(value === "defined");
    handleChange(event);
  };

  const addOption = () => {
    if (newOption.trim() && formData) {
      const updatedOptions = [...(formData.options || []), newOption];
      setFormData({ ...formData, options: updatedOptions });
      setNewOption(""); // Clear the input after adding
    }
  };

  const removeOption = (optionToRemove: string) => {
    if (formData) {
      const updatedOptions = formData.options?.filter(option => option !== optionToRemove);
      setFormData({ ...formData, options: updatedOptions });
    }
  };

  if (!isOpen || !formData) return null;

  return (
<div className="modal">
  <div className="modal-content">
    <div className="modal-curve"></div>
    <div className="bottom-left-gradient"></div>
    <div className="divider">
      <div className="divider-text">
        <h4 className="text-3xl font-semibold text-right text-green-600 mb-6">📝Edit Tool</h4>
      </div>
    </div>
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label className="form-label">Label <span style={{ color: 'red' }}>*</span></label>
        <input
          type="text"
          name="label"
          onChange={handleChange}
          placeholder="Enter Label"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Type <span style={{ color: 'red' }}>*</span></label>
        <select name="type" value={formData.type} onChange={handleChange} className="form-select" required>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="select">Select</option>
          <option value="datetime">Datetime</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
          <option value="button">Button</option>
          <option value="file">File Upload</option>
          <option value="textarea">Text Area</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Column Name <span style={{ color: 'red' }}>*</span></label>
        <input
          type="text"
          name="columnName"
          value={formData.columnName || ''}
          readOnly
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Data Type <span style={{ color: 'red' }}>*</span></label>
        <input
          type="text"
          name="datatype"
          value={formData.datatype || ''}
          readOnly
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Length/Values <span style={{ color: 'red' }}>*</span></label>
        <input
          type="number"
          name="length"
          value={formData.length || ''}
          onChange={handleChange}
          placeholder="Enter length or values"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Default</label>
        <select name="defaultOption" value={formData.defaultValue || ''} onChange={handleDefaultChange} className="form-select">
          <option value="none">None</option>
          <option value="defined">As defined:</option>
          <option value="NULL">NULL</option>
          <option value="CURRENT_TIMESTAMP">CURRENT_TIMESTAMP</option>
        </select>

        {showInput && (
          <input
            type="text"
            name="defaultValue"
            value={formData.defaultValue || ""}
            onChange={handleChange}
            placeholder="Enter default value"
            className="form-input"
          />
        )}
      </div>

      <div className="form-group">
        {(formData.type === "select" || formData.type === "radio" || formData.type === "checkbox") && (
          <>
            <label className="form-label">Options (for Select, Radio, and Checkbox Types)</label>
            <div className="option-input-container">
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add new option"
                className="form-input attached-input"
              />
              <button type="button" onClick={addOption} className="form-button small-button attached-button">
                Add
              </button>
            </div>
          </>
        )}
      </div>

      <div className="form-group">
        {(formData.type === "select" || formData.type === "radio" || formData.type === "checkbox") && (
                    <div className="options-list-container">
                    <label className="form-label">Options:</label>
                    <div className="options-list">
                      {formData.options?.map((option, index) => (
                        <div key={index} className="option-item">
                          {option}
                          <button onClick={() => removeOption(option)} className="btn btn-outline-primary">
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="reset" onClick={onClose} className="btn btn-cancel">Cancel</button>
                <button type="submit" className="btn btn-save">Save</button>
              </div>
            </form>
          </div>
        </div>
  );
};

export default Modal;