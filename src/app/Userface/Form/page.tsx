'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/app/../components/ui/input"; // Adjust the import path as necessary
import { Button } from "@/app/../components/ui/button"; // Adjust the import path as necessary
import withAuth from '@/app/utils/withAuth';

import "@/app/assets/vendor/fonts/boxicons.css";
import "@/app/assets/vendor/css/core.css";
import "@/app/assets/vendor/css/theme-default.css";
import "@/app/assets/css/demo.css";
import "@/app/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "@/app/assets/vendor/libs/apex-charts/apex-charts.css";
import Sidebar from '@/app/Components/Userface/Sidebar';
import Navbar from '@/app/Components/Userface/Navbar';

interface FloatingLabelInputProps {
  type: string;
  name: string;
  placeholder: string;
  required?: boolean;
  defaultValue?: string;
}

const Form = () => {
  const [user, setUser ] = useState({ username: "", email: "", profile_image: "", fullname: "" });
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState([]);
  const [formTemplate, setFormTemplate] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false); // State for edit mode

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = sessionStorage.getItem("authToken");
        if (authToken) {
          const response = await axios.get("http://127.0.0.1:8000/api/user", {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          setUser ({
            username: response.data.username,
            email: response.data.email,
            profile_image: response.data.profile_image,
            fullname: response.data.fullname
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/forms");
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  const fetchFormTemplate = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/forms?status=enabled");
      if (response.data.length > 0) {
        const template = response.data[0];
        template.fields = JSON.parse(template.fields);
        setFormTemplate(template);
        fetchRecords(template.tableName);
        console.log("Fetched template:", response.data); // Log the fetched records
      }
    } catch (error) {
      console.error("Error fetching form template:", error);
    }
  };

  const fetchRecords = async (tableName: string) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/${tableName}`);
      console.log("Fetched records:", response.data); // Log the fetched records
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    const data = {}; // Collect form data here

    // Collect data from the form fields
    formTemplate.fields.forEach((section: any) => {
      section.fields.forEach((field: any) => {
        const input = document.querySelector(`input[name="${field.columnName}"]`) as HTMLInputElement;
        const textarea = document.querySelector(`textarea[name="${field.columnName}"]`) as HTMLTextAreaElement; // For Text Area
        if (input) {
          data[field.columnName] = input.value;
        } else if (textarea) {
          data[field.columnName] = textarea.value; // Collect value from Text Area
        }
      });
    });

    if (isEditing && selectedRecord) {
      await handleUpdate(selectedRecord.id, data);
    } else {
      await handleCreate(data);
    }
  };

  const handleCreate = async (data: any) => {
    if (formTemplate) {
      try {
        await axios.post(`http://127.0.0.1:8000/api/${formTemplate.tableName}`, data);
        alert("Form submitted successfully!");
        fetchRecords(formTemplate.tableName); // Refresh records after submission
        resetForm(); // Reset the form after submission
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
      }
    }
  };

  const handleUpdate = async (recordId: number, data: any) => {
    if (formTemplate) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/${formTemplate.tableName}/${recordId}`, data);
        alert("Form updated successfully!");
        fetchRecords(formTemplate.tableName); // Refresh records after update
        resetForm(); // Reset the form after update
        setIsEditing(false); // Reset editing mode
        setSelectedRecord(null); // Clear selected record
      } catch (error) {
        console.error("Error updating form:", error);
        alert("Error updating form. Please try again.");
      }
    }
  };

  const resetForm = () => {
    // Reset the form fields to their initial state
    setSelectedRecord(null);
    setIsEditing(false);
    // If you want to reset the user state as well, you can do that here
    setUser ({ username: "", email: "", profile_image: "", fullname: "" });
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setIsEditing(true); // Set editing mode
  };

  const handleDelete = async (recordId: number) => {
    if (formTemplate) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/${formTemplate.tableName}/${recordId}`);
        alert("Form deleted successfully!");
        fetchRecords(formTemplate.tableName); // Refresh records after deletion
      } catch (error) {
        console.error("Error deleting form:", error);
        alert("Error deleting form. Please try again.");
      }
    }
  };

  const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ type, name, placeholder, required, defaultValue }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="form-floating mb-3">
        {type === "textarea" ? ( // Check if the type is textarea
          <textarea
            className={`form-control ${isFocused || defaultValue ? 'active' : ''}`}
            name={name}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        ) : (
          <input
            type={type}
            className={`form-control ${isFocused || defaultValue ? 'active' : ''}`}
            name={name}
            placeholder={placeholder}
            required={required}
            defaultValue={defaultValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
        <label style={{ color: 'gray' }}>{placeholder}</label>
      </div>
    );
  };

  useEffect(() => {
    fetchFormTemplate(); // Fetch the enabled form template on component mount
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed">
        <div className="layout-container">
          {/* Menu */}
          <Sidebar />
          {/* / Menu */}

          {/* Layout container */}
          <div className="layout-page">
            {/* Navbar */}
            <Navbar />
            {/* / Navbar */}

            <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  {/* Render the form template if it exists */}
                  {formTemplate && formTemplate.fields && Array.isArray(formTemplate.fields) && (
                    <div className="col-lg-12 mb-4">
                      <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                          <div className="divider">
                            <div className="divider-text">
                              <h4 className="text-3xl font-semibold text-right text-green-600 mb-6">📄 Form Template</h4>
                            </div>
                          </div>
                          <form onSubmit={handleSubmit}>
                            {formTemplate.fields.map((section: any) => (
                              <div key={section.id}>
                                {Array.isArray(section.fields) && section.fields.length > 0 ? (
                                  <div className="row">
                                    {section.fields.map((field: any) => (
                                      <div key={field.id} className="col-md-6 mb-3">
                                        {field.type === "text" || field.type === "email" || field.type === "number" || field.type === "textarea" ? (
                                          <FloatingLabelInput
                                            type={field.type}
                                            name={field.columnName}
                                            placeholder={field.label}
                                            required={field.required}
                                            defaultValue={selectedRecord ? selectedRecord[field.columnName] : ''}
                                          />
                                        ) : field.type === "select" ? (
                                          <div className="form-floating mb-3">
                                            <select
                                              className="form-select"
                                              name={field.columnName}
                                              required={field.required}
                                              defaultValue={selectedRecord ? selectedRecord[field.columnName] : ''}
                                            >
                                              {field.options.map((option: string, index: number) => (
                                                <option key={index} value={option}>{option}</option>
                                              ))}
                                            </select>
                                            <label className="form-label">{field.label}</label>
                                          </div>
                                        ) : field.type === "datetime" ? (
                                          <FloatingLabelInput
                                            type="datetime-local"
                                            name={field.columnName}
                                            placeholder={field.label}
                                            required={field.required}
                                            defaultValue={selectedRecord ? selectedRecord[field.columnName] : ''}
                                          />
                                        ) : null}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p>No fields available in this section.</p>
                                )}
                              </div>
                            ))}
                            <button className="btn btn-sm btn-primary" type="submit">{isEditing ? "Update" : "Submit"}</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="row">
                  {/* Table to display records */}
                  {records.length > 0 && formTemplate.fields.length > 0 && (
                    <div className="col-lg-12 mb-4">
                      <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                          <div className="divider text-start">
                            <div className="divider-text">
                              <h4 className="text-3xl font-semibold text-right text-green-600 mb-6">Table</h4>
                            </div>
                          </div>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  {formTemplate.fields.flatMap((section: any) => 
                                    section.fields.map((field: any) => (
                                      <th key={field.id}>{field.label}</th>
                                    ))
                                  )}
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {records.map((record: any) => (
                                  <tr key={record.id}>
                                    {formTemplate.fields.flatMap((section: any) => 
                                      section.fields.map((field: any) => (
                                        <td key={field.id}>
                                          {record[field.columnName] !== undefined ? record[field.columnName] : 'N/A'}
                                        </td>
                                      ))
                                    )}
                                    <td>
                                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(record)}><i className='bx bx-edit'></i></button>
                                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(record.id)}><i className='bx bx-trash'></i></button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              </div>
            {/* / Content wrapper */}
          </div>
          {/* / Layout page */}
        </div>
        {/* Overlay */}
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </>
  );
}

export default withAuth(Form);