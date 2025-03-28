'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/app/../components/ui/input"; // Adjust the import path as necessary
import { Button } from "@/app/../components/ui/button"; // Adjust the import path as necessary
import withAuth from '@/app/utils/withAuth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "@/app/assets/vendor/fonts/boxicons.css";
import "@/app/assets/vendor/css/core.css";
import "@/app/assets/vendor/css/theme-default.css";
import "@/app/assets/css/demo.css";
import "@/app/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css";
import "@/app/assets/vendor/libs/apex-charts/apex-charts.css";
import Sidebar from '@/app/Components/Userface/Sidebar';
import Navbar from '@/app/Components/Userface/Navbar';

interface User {
  username: string;
  email: string;
  profile_image: string;
  fullname: string;
}

interface Field {
  id: number;
  columnName: string;
  label: string;
  type: string;
  options?: string[];
}

interface Section {
  id: number;
  fields: Field[];
}

interface FormTemplate {
  fields: Section[];
  tableName: string;
}

const Form = () => {
  const [user, setUser ] = useState<User>({ username: "", email: "", profile_image: "", fullname: "" });
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<any[]>([]);
  const [formTemplate, setFormTemplate] = useState<FormTemplate | null>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [activeColor, setActiveColor] = useState<string>(''); // State for active color

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = sessionStorage.getItem("authToken");
        if (authToken) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user`, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          setUser (response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}forms`);
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
        toast.error("Error fetching forms.");
      }
    };
    fetchForms();
  }, []);

  const fetchActiveColor = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}colors/active`);
      if (response.data) {
        setActiveColor(response.data.color); // Set the fetched color
      }
    } catch (error) {
      console.error("Error fetching active color:", error);
    }
  };

  const fetchFormTemplate = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}forms?status=enabled`);
      if (response.data.length > 0) {
        const template = response.data[0];
        template.fields = JSON.parse(template.fields);
        setFormTemplate(template);
        fetchRecords(template.tableName);
      }
    } catch (error) {
      console.error("Error fetching form template:", error);
      toast.error("Error fetching form template.");
    }
  };

  const fetchRecords = async (tableName: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${tableName}`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
      toast.error("Error fetching records.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: FormData = new FormData();

    formTemplate?.fields.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === "radio") {
          const radio = document.querySelector(`input[name="${field.columnName}"]:checked`) as HTMLInputElement;
          if (radio) {
            data.append(field.columnName, radio.value);
          }
        } else if (field.type === "checkbox") {
          const checkboxes = document.querySelectorAll(`input[name="${field.columnName}"]:checked`) as NodeListOf<HTMLInputElement>;
          const values = Array.from(checkboxes).map(checkbox => checkbox.value);
          data.append(field.columnName, JSON.stringify(values));
        } else {
          const input = document.querySelector(`input[name="${field.columnName}"]`) as HTMLInputElement;
          const textarea = document.querySelector(`textarea[name="${field.columnName}"]`) as HTMLTextAreaElement;
          const select = document.querySelector(`select[name="${field.columnName}"]`) as HTMLSelectElement;

          if (input) {
            data.append(field.columnName, input.value);
          } else if (textarea) {
            data.append(field.columnName, textarea.value);
          } else if (select) {
            data.append(field.columnName, select.value);
          }
        }
      });
    });

    if (file) {
      data.append('file', file);
    }

    if (isEditing && selectedRecord) {
      await handleUpdate(selectedRecord.id, data);
    } else {
      await handleCreate(data);
    }
  };

  const handleCreate = async (data: FormData) => {
    if (formTemplate) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${formTemplate.tableName}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Form submitted successfully!");
        fetchRecords(formTemplate.tableName);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form. Please try again.");
      }
    }
  };

  const handleUpdate = async (recordId: number, data: FormData) => {
    if (formTemplate) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${formTemplate.tableName}/${recordId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success("Form updated successfully!");
        fetchRecords(formTemplate.tableName);
        resetForm();
      } catch (error) {
        console.error("Error updating form:", error);
        toast.error("Error updating form. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setSelectedRecord({});
    setIsEditing(false);
    setFileName(null);
    setUser ({ username: "", email: "", profile_image: "", fullname: "" });
    setFile(null);
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setIsEditing(true);
    setFileName(record.profile_image);
    setFilePreview(`http://127.0.0.1:8000/${record.profile_image}`);
  };

  const handleDelete = async (recordId: number) => {
    if (formTemplate) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${formTemplate.tableName}/${recordId}`);
        toast.success("Form deleted successfully!");
        fetchRecords(formTemplate.tableName);
      } catch (error) {
        console.error("Error deleting form:", error);
        toast.error("Error deleting form. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchFormTemplate();
    fetchActiveColor();
  }, []);

  // Function to convert HSL to RGBA with 5% opacity
  const hslToRgba = (hsl: string, opacity: number) => {
    const hslParts = hsl.match(/hsl\((\d+), (\d+)%, (\d+)%\)/);
    if (!hslParts) return 'rgba(0, 0, 0, 0)'; // Default to transparent if parsing fails

    const h = parseInt(hslParts[1]);
    const s = parseInt(hslParts[2]) / 100;
    const l = parseInt(hslParts[3]) / 100;

    // Convert HSL to RGB
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // Achromatic
    } else {
            const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = Math.round(hue2rgb(p, q, h / 360 + 1 / 3) * 255);
      g = Math.round(hue2rgb(p, q, h / 360) * 255);
      b = Math.round(hue2rgb(p, q, h / 360 - 1 / 3) * 255);
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

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
          <Sidebar />
          <div className="layout-page">
            <Navbar />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  {formTemplate && formTemplate.fields && Array.isArray(formTemplate.fields) && (
                    <div className="col-lg-12 mb-4">
                      <div className="card shadow-sm border-0">
                        <div className="card-body p-4" style={{ backgroundColor: `${activeColor}` }}>
                          <form onSubmit={handleSubmit}>
                            {formTemplate.fields.map((section) => (
                              <div key={section.id}>
                                {Array.isArray(section.fields) && section.fields.length > 0 ? (
                                  <div className="row">
                                    {section.fields.map((field) => (
                                      <div key={field.id} className="col-md-6 mb-3">
                                        {field.type === "textarea" ? (
                                          <div className="form-floating mb-3">
                                            <textarea
                                              className={`form-control ${selectedRecord[field.columnName] ? 'active' : ''}`}
                                              name={field.columnName}
                                              placeholder={field.label}
                                              required
                                              value={selectedRecord[field.columnName] || ''}
                                              onChange={(e) => {
                                                const newValue = e.target.value;
                                                setSelectedRecord((prev) => ({
                                                  ...prev,
                                                  [field.columnName]: newValue,
                                                }));
                                              }}
                                            />
                                            <label style={{ color: 'gray' }}>{field.label}</label>
                                          </div>
                                        ) : field.type === "text" || field.type === "email" || field.type === "number" ? (
                                          <div className="form-floating mb-3">
                                            <input
                                              type={field.type}
                                              className={`form-control ${selectedRecord[field.columnName] ? 'active' : ''}`}
                                              name={field.columnName}
                                              placeholder={field.label}
                                              required
                                              value={selectedRecord[field.columnName] || ''}
                                              style={{ backgroundColor: hslToRgba(activeColor, 0.05) }} // Set background color with 5% opacity
                                              onChange={(e) => {
                                                const newValue = e.target.value;
                                                setSelectedRecord((prev) => ({
                                                  ...prev,
                                                  [field.columnName]: newValue,
                                                }));
                                              }}
                                            />
                                            <label style={{ color: 'gray' }}>{field.label}</label>
                                          </div>
                                        ) : field.type === "select" ? (
                                          <div className="form-floating mb-3">
                                            <select
                                              className="form-select"
                                              name={field.columnName}
                                              required
                                              value={selectedRecord[field.columnName] || ''}
                                              onChange={(e) => {
                                                const newValue = e.target.value;
                                                setSelectedRecord((prev) => ({
                                                  ...prev,
                                                  [field.columnName]: newValue,
                                                }));
                                              }}
                                            >
                                              <option value="" disabled>Select an option</option>
                                              {field.options?.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                              ))}
                                            </select>
                                            <label className="form-label">{field.label}</label>
                                          </div>
                                        ) : field.type === "radio" ? (
                                          <div className="form-group">
                                            <label>{field.label}</label>
                                            {field.options?.map((option, index) => (
                                              <div key={index} className="form-check">
                                                <input
                                                  type="radio"
                                                  className="form-check-input"
                                                  name={field.columnName}
                                                  value={option}
                                                  checked={selectedRecord[field.columnName] === option}
                                                  onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedRecord((prev) => ({
                                                      ...prev,
                                                      [field.columnName]: newValue,
                                                    }));
                                                  }}
                                                />
                                                <label className="form-check-label">{option}</label>
                                              </div>
                                            ))}
                                          </div>
                                        ) : field.type === "checkbox" ? (
                                          <div className="form-group">
                                            <label>{field.label}</label>
                                            {field.options?.map((option, index) => (
                                              <div key={index} className="form-check">
                                                <input
                                                  type="checkbox"
                                                  className="form-check-input"
                                                  name={field.columnName}
                                                  value={option}
                                                  checked={selectedRecord[field.columnName]?.includes(option) || false}
                                                  onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    setSelectedRecord((prev) => {
                                                      const currentValues = Array.isArray(prev[field.columnName])
                                                        ? [...prev[field.columnName]]
                                                        : [];

                                                      if (e.target.checked) {
                                                        return {
                                                          ...prev,
                                                          [field.columnName]: [...currentValues, newValue],
                                                        };
                                                      } else {
                                                        const index = currentValues.indexOf(newValue);
                                                        if (index > -1) {
                                                          currentValues.splice(index, 1);
                                                        }
                                                        return {
                                                          ...prev,
                                                          [field.columnName]: currentValues,
                                                        };
                                                      }
                                                    });
                                                  }}
                                                />
                                                <label className="form-check-label">{option}</label>
                                              </div>
                                            ))}
                                          </div>
                                        ) : field.type === "datetime" ? (
                                          <div className="form-floating mb-3">
                                            <input
                                              type="datetime-local"
                                              className={`form-control ${selectedRecord[field.columnName] ? 'active' : ''}`}
                                              name={field.columnName}
                                              required
                                              placeholder={field.label}
                                              value={selectedRecord[field.columnName] || ''}
                                              onChange={(e) => {
                                                const newValue = e.target.value;
                                                setSelectedRecord((prev) => ({
                                                  ...prev,
                                                  [field.columnName]: newValue,
                                                }));
                                              }}
                                            />
                                            <label style={{ color: 'gray' }}>{field.label}</label>
                                          </div>
                                        ) : field.type === "file" ? (
                                          <div className="mb-3">
                                            <label className="form-label">{field.label}</label>
                                            <input
                                              type="file"
                                              className="form-control"
                                              onChange={(e) => {
                                                if (e.target.files && e.target.files.length > 0) {
                                                  const selectedFile = e.target.files[0];
                                                  setFile(selectedFile);
                                                  setFileName(selectedFile.name);
                                                  const fileURL = URL.createObjectURL(selectedFile);
                                                  setFilePreview(fileURL);
                                                }
                                              }}
                                            />
                                            {fileName && <p className="mt-2">Selected file: {fileName}</p>}
                                            {filePreview && (
                                              <div className="mt-3">
                                                <h5>File Preview:</h5>
                                                {file?.type.startsWith("image/") ? (
                                                  <img
                                                    src={filePreview}
                                                    alt="File Preview"
                                                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                                                  />
                                                ) : file?.type === "application/pdf" ? (
                                                  <iframe
                                                    src={filePreview}
                                                    style={{ width: "100%", height: "300px" }}
                                                  />
                                                ) : (
                                                  <p>Preview not available for this file type.</p>
                                                )}
                                              </div>
                                            )}
                                            {isEditing && selectedRecord.file && (
                                              <div className="mt-3">
                                                <h5>Existing File Preview:</h5>
                                                {selectedRecord.file.endsWith(".jpg") ||
                                                selectedRecord.file.endsWith(".jpeg") ||
                                                selectedRecord.file.endsWith(".png") ? (
                                                  <img
                                                    src={`http://127.0.0.1:8000/saved_files/file_upload/${selectedRecord.file}`}
                                                    alt="Existing File"
                                                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                                                  />
                                                ) : selectedRecord.file.endsWith(".pdf") ? (
                                                  <iframe
                                                    src={`http://127.0.0.1:8000/saved_files/file_upload/${selectedRecord.file}`}
                                                    style={{ width: "100%", height: "300px" }}
                                                  />
                                                ) : (
                                                  <p>No existing file to preview.</p>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        ) : null}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p>No fields available in this section.</p>
                                )}
                                </div>
                              ))}
                              <button className="btn btn-sm btn-primary" type="submit">
                                {isEditing ? "Update" : "Submit"}
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    {records.length > 0 ? (
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
                                    {formTemplate.fields.flatMap((section) => 
                                      section.fields.map((field) => (
                                        <th key={field.id}>{field.label}</th>
                                      ))
                                    )}
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentRecords.map((record) => (
                                    <tr key={record.id}>
                                      {formTemplate.fields.flatMap((section) => 
                                        section.fields.map((field) => (
                                          <td key={field.id}>
                                            {record[field.columnName] !== undefined ? record[field.columnName] : 'N/A'}
                                          </td>
                                        ))
                                      )}
                                      <td>
                                        <button className="btn btn-sm btn-warning" onClick={() => handleEdit(record)}>
                                          <i className='bx bx-edit'></i>
                                        </button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(record.id)}>
                                          <i className='bx bx-trash'></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {/* Pagination Controls */}
                            <nav>
                              <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                  <button className="page-link" onClick={() => paginate(currentPage - 1)}>&laquo;</button>
                                </li>
                                {Array.from({ length: totalPages }, (_, index) => (
                                  <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(index + 1)}>
                                      {index + 1}
                                    </button>
                                  </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                  <button className="page-link" onClick={() => paginate(currentPage + 1)}>&raquo;</button>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-lg-12 mb-4">
                        <div className="alert alert-info" role="alert">
                          No records found.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="layout-overlay layout-menu-toggle"></div>
        </div>
      </>
    );
  }
  
  export default withAuth(Form);