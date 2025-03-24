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

  useEffect(() => {
    setFormData(field);
  }, [field]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen || !formData) return null;

  const handleDefaultChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setShowInput(value === "defined");
    handleChange(event);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Field</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Label</label>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="Enter Label"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="form-select">
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
            <label>Column Name</label>
            <input
              type="text"
              name="columnName"
              value={formData.columnName || ''}
              onChange={handleChange}
              placeholder="Enter column name"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Data Type</label>
            <select name="datatype" value={formData.datatype || ''} onChange={handleChange} className="form-select">
              <option value="" hidden>Choose datatype</option>
              <option value="INT">INT</option>
              <option value="TINYINT">TINYINT</option>
              <option value="SMALLINT">SMALLINT</option>
              <option value="MEDIUMINT">MEDIUMINT</option>
              <option value="BIGINT">BIGINT</option>
              <option value="DECIMAL">DECIMAL</option>
              <option value="FLOAT">FLOAT</option>
              <option value="DOUBLE">DOUBLE</option>
              <option value="BIT">BIT</option>
              <option value="CHAR">CHAR</option>
              <option value="VARCHAR">VARCHAR</option>
              <option value="TEXT">TEXT</option>
              <option value="TINYTEXT">TINYTEXT</option>
              <option value="MEDIUMTEXT">MEDIUMTEXT</option>
              <option value="LONGTEXT">LONGTEXT</option>
              <option value="DATE">DATE</option>
              <option value="DATETIME">DATETIME</option>
              <option value="TIMESTAMP">TIMESTAMP</option>
              <option value="TIME">TIME</option>
              <option value="YEAR">YEAR</option>
              <option value="BOOLEAN">BOOLEAN</option>
              <option value="JSON">JSON</option>
              <option value="BLOB">BLOB</option>
              <option value="TINYBLOB">TINYBLOB</option>
              <option value="MEDIUMBLOB">MEDIUMBLOB</option>
              <option value="LONGBLOB">LONGBLOB</option>
              <option value="ENUM">ENUM</option>
              <option value="SET">SET</option>
            </select>
          </div>
          <div className="form-group">
            <label>Length/Values</label>
            <input
              type="number"
              name="length"
              value={formData.length || ''}
              onChange={handleChange}
              placeholder="Enter length or values"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Default</label>
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
            <label>Index</label>
            <select name="index" value={formData.index || ''} onChange={handleChange} className="form-select">
              <option value="">None</option>
              <option value="PRIMARY">PRIMARY</option>
              <option value="UNIQUE">UNIQUE</option>
              <option value="INDEX">INDEX</option>
              <option value="FULLTEXT">FULLTEXT</option>
              <option value="SPATIAL">SPATIAL</option>
            </select>
          </div>
          <div className="form-group" style={{ marginTop: '25px'}}>
            <div className="checkbox-group">
              <label>Null</label>
              <input
                type="checkbox"
                name="nullValue"
                checked={formData.nullValue || false}
                onChange={handleChange}
                className="form-checkbox"
              />
            </div>
            <div className="checkbox-group">
              <label>Auto Increment</label>
              <input
                type="checkbox"
                name="autoIncrement"
                checked={formData.autoIncrement || false}
                onChange={handleChange}
                className="form-checkbox"
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" onClick={onClose} className="form-button cancel">Cancel</button>
            <button type="submit" className="form-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;