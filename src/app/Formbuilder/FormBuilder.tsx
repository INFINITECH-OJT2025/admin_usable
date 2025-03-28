"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { Input } from "@/app/../components/ui/input";
import { Button } from "@/app/../components/ui/button";
import { Select } from "@/app/../components/ui/select";
import axios from "axios";
import Modal from './Modal'; // Adjust the import path as necessary
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FaRegKeyboard, FaEnvelope, FaHashtag, FaList, FaCalendarAlt, FaCheckSquare, FaDotCircle, FaMousePointer, FaFileUpload, FaChalkboard } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "./style.css";
import button from "./Button.module.css";
import style from "./Loader.module.css"
import DeleteConfirmationModal from './DeleteConfirmationModal';
import styles from './HoverButton.module.css';

interface FormField {
  id: string; // Unique ID for each field
  label: string; // Column Name
  type: "text" | "number" | "email" | "select" | "datetime" | "checkbox" | "radio" | "button" | "file" | "textarea"; // Include textarea type
  required: boolean;
  placeholder?: string; // Added placeholder property
  options?: string[]; // for select dropdown, radio buttons, and checkboxes
  length?: number; // New field for Length/Values
  defaultValue?: string; // New field for Default value
  nullValue?: boolean; // New field for Null
  index?: string; // New field for Index
  autoIncrement?: boolean; // New field for Auto Increment
  tableName?: string; // New field for Table Name
  columnName?: string; // New field for Column Name
  datatype?: "INT" | "TINYINT" | "SMALLINT" | "MEDIUMINT" | "BIGINT" | "DECIMAL" | "FLOAT" | "DOUBLE" | "BIT" | "CHAR" | "VARCHAR" | "TEXT" | "TINYTEXT" | "MEDIUMTEXT" | "LONGTEXT" | "DATE" | "DATETIME" | "TIMESTAMP" | "TIME" | "YEAR" | "BOOLEAN" | "JSON" | "BLOB" | "TINYBLOB" | "MEDIUMBLOB" | "LONGBLOB" | "ENUM" | "SET"; // New field for Data Type
}

interface ToolSection {
  id: string; // Unique ID for each section
  fields: FormField[];
}

export default function FormBuilder() {
  const [availableFields] = useState<FormField[]>([
    { id: "100", label: "Text", type: "text", required: true, placeholder: "Enter text" },
    { id: "200", label: "Email", type: "email", required: true, placeholder: "Enter email" },
    { id: "300", label: "Age", type: "number", required: false, placeholder: "Enter age" },
    { id: "400", label: "Selection", type: "select", required: false, options: ["Male", "Female", "Other"] },
    { id: "500", label: "DateTime", type: "datetime", required: false, placeholder: "Select date and time" },
    { id: "600", label: "Checkbox", type: "checkbox", required: false },
    { id: "700", label: "Radio", type: "radio", required: false, options: ["Red", "Green", "Blue"] },
    { id: "800", label: "Button", type: "button", required: false },
    { id: "900", label: "File Upload", type: "file", required: false }, // Added file upload field
    { id: "1000", label: "Text Area", type: "textarea", required: false, placeholder: "Enter text here" }, // Added Text Area field
  ]);

  const [toolSections, setToolSections] = useState<ToolSection[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<FormField | null>(null);
  const [highlightedFieldId, setHighlightedFieldId] = useState<string | null>(null);
  const [fetchedForms, setFetchedForms] = useState<any[]>([]);
  const itemsPerPage = 6; // Adjust how many forms to show per page
  const [currentPage, setCurrentPage] = useState(1);
  const [tableName, setTableName] = useState<string>(''); // State for table name
  const [existingTables, setExistingTables] = useState<string[]>([]); // State for existing tables
  const [enabledFormId, setEnabledFormId] = useState<number | null>(null);
  const [loadingTemplate, setLoadingTemplate] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<number | null>(null);
  const [collapsedForms, setCollapsedForms] = useState<{ [key: string]: boolean }>({});


  const totalPages = Math.ceil(fetchedForms.length / itemsPerPage);

  // Get forms for the current page
  const paginatedForms = fetchedForms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const idCounters = useRef<{ [key: string]: number }>({
    text: 100,
    email: 200,
    number: 300,
    select: 400,
    datetime: 500,
    checkbox: 600,
    radio: 700,
    button: 800,
    file: 900, // Added counter for file uploads
    textarea: 1000,
  });

  const fieldIcons: Record<string, JSX.Element> = {
    text: <FaRegKeyboard size={20} color={'#5A9BD5'}/>,
    email: <FaEnvelope size={20} color={'#5A9BD5'}/>,
    number: <FaHashtag size={20} color={'#5A9BD5'}/>,
    select: <FaList size={20} color={'#5A9BD5'}/>,
    datetime: <FaCalendarAlt size={20} color={'#5A9BD5'}/>,
    checkbox: <FaCheckSquare size={20} color={'#5A9BD5'}/>,
    radio: <FaDotCircle size={20} color={'#5A9BD5'}/>,
    button: <FaMousePointer size={20} color={'#5A9BD5'}/>,
    file: <FaFileUpload size={20} color={'#5A9BD5'}/>,
    textarea: <FaChalkboard size={20} color={'#5A9BD5'}/>
  };

  const schema = yup.object().shape(
    toolSections.reduce((acc, section) => {
      section.fields.forEach(field => {
        acc[field.label] = field.required
          ? yup.string().required(`${field.label} is required`)
          : yup.string();
      });
      return acc;
    }, {} as Record<string, any>)
  );

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchExistingTables(); // Fetch existing tables on component mount
    fetchForms(); // Fetch forms as before
  }, [])

  const fetchForms = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}forms`);
      const formsWithParsedFields = response.data.map((form: any) => {
        let parsedFields = [];
        try {
          parsedFields = JSON.parse(form.fields);
        } catch (error) {
          console.error("Error parsing fields for form ID:", form.id, error);
        }
        return {
          ...form,
          fields: Array.isArray(parsedFields) ? parsedFields : [],
        };
      });
      setFetchedForms(formsWithParsedFields);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []); // Empty dependency array to run once on mount

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    
    // Append fields to FormData
    for (const key in data) {
      if (data[key] instanceof FileList) {
        // If it's a file input, append the first file
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}forms`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const createTable = async (fields: FormField[]) => {
      try {
          const requestData = {
              tableName, // Pass the table name here
              fields: fields.map(field => ({
                  columnName: field.columnName,
                  datatype: field.datatype, // Ensure this is being set correctly
                  length: field.length,
                  defaultValue: field.defaultValue,
                  nullValue: field.nullValue,
                  index: field.index,
                  autoIncrement: field.autoIncrement,
                  options: field.options || [], // Include options for ENUM fields
              })),
          };

          console.log("Request Data:", requestData); // Log the request data

          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}tables`, requestData);
          console.log(response.data);
      } catch (error) {
          console.error("Error creating table:", error);
      }
  };


  const saveForm = async () => {
    // Check if the table name is empty
    if (!tableName.trim()) {
      toast.warning("Table name is required. Please enter a valid table name.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return; // Exit the function if the table name is empty
    }
  
    // Check if there are any fields in the Workplace
    if (toolSections.length === 0 || toolSections.every(section => section.fields.length === 0)) {
      toast.warning("Kindly place some inputs first before creating a form and a table. Thank you!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return; // Exit the function if there are no fields
    }
  
    // Check for duplicate table names
    if (existingTables.includes(tableName)) {
      toast.warning("A table with this name already exists. Please choose a different name.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return; // Exit the function if the table name is a duplicate
    }
  
    try {
      const formData = { fields: toolSections, tableName }; // Include tableName in the form data
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}forms`, formData);
      toast.success(`${tableName} saved successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });

      fetchExistingTables();
      fetchForms();
      createTable(toolSections.flatMap((section) => section.fields));
  
      // Clear the Workplace and Form Preview
      setToolSections([]); // Clear the fields
      setTableName(''); // Clear the table name
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("Error saving form. Please try again!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };
  
  useEffect(() => {
  }, [toolSections, tableName]);

  const useFormTemplate = async (tableName: string, formId: number) => {
    setLoadingTemplate(true); // Set loading state to true
      try {
          // Call the backend to create the model and controller
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}createModelAndController`, { tableName, formId });
          
          // Check the response message and alert accordingly
          if (response.data.message) {
            toast.success(`${response.data.message.toUpperCase()}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
          } else {
              toast.error(`${response.data.message.toUpperCase()}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
          }
          
          console.log("id:", formId);
      } catch {
        toast.error('CONTROLLER, MODEL, and ROUTES already created!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      } finally {
          setLoadingTemplate(false); // Reset loading state
      }
  };
  
  // Function to fetch existing forms
  const fetchExistingTables = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}getTables`);
      const tables = response.data.map((table: any) => Object.values(table)[0]); // Adjust based on your response structure
      setExistingTables(tables);
    } catch (error) {
      console.error("Error fetching existing tables:", error);
    }
  };

  useEffect(() => {
    fetchExistingTables(); // Fetch existing tables on component mount
    fetchForms(); // Fetch forms as before
  }, []); // Empty dependency array to run once on mount

  const handleToolboxItemDrop = (item: FormField) => {
    const newId = `${idCounters.current[item.type]}`;
    idCounters.current[item.type] += 1;

    const newField = { ...item, id: newId };
    console.log(`Adding new field: ${newField.label} with ID: ${newField.id}`);
    
    setToolSections((prevSections) => {
      if (prevSections.length === 0) {
        const newSectionId = `${prevSections.length + 1}`;
        return [{ id: newSectionId, fields: [newField] }];
      } else {
        return prevSections.map((section, index) =>
          index === prevSections.length - 1
            ? { ...section, fields: [...section.fields, newField] }
            : section
        );
      }
    });
  };

  const deleteForm = async (formId: number, tableName: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}forms/${formId}/${tableName}`);
      toast.success(`${tableName} deleted successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      fetchExistingTables();
      fetchForms();
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error(`${tableName}'s deletion was interrupted. Kindly fix the issue!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setToolSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, fields: section.fields.filter((field) => field.id !== fieldId) }
          : section
      )
    );
  };

  const removeSection = (sectionId: string) => {
    setToolSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
  };


  const clearAll = () => {
    setToolSections([]); // Clear all sections
    setTableName(''); // Clear the table name
    toast.success("All sections and tools have been cleared!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const addNewSection = () => {
    const newSectionId = `${toolSections.length + 1}`;
    setToolSections((prevSections) => [...prevSections, { id: newSectionId, fields: [] }]);
  };

  const openEditModal = (field: FormField) => {
    setCurrentField(field);
    setIsModalOpen(true);
    console.log('Opening modal');
  };

  const saveFieldChanges = (updatedField: FormField) => {
    setToolSections((prevSections) =>
      prevSections.map((section) => ({
        ...section,
        fields: section.fields.map((field) =>
          field.id === updatedField.id ? updatedField : field
        ),
      }))
    );
    setIsModalOpen(false); // Close the modal after saving changes
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside the list

    const { source, destination } = result;

    const updatedSections = toolSections.map((section) => {
      if (section.id === source.droppableId) {
        const fields = Array.from(section.fields);
        const [movedField] = fields.splice(source.index, 1);
        fields.splice(destination.index, 0, movedField);
        return { ...section, fields };
      }
      return section; // Return the section unchanged
    });
    
    setToolSections(updatedSections); // Update the state with the new order
  };

  const toggleFormStatus = async (formId: number, currentStatus: string) => {
    setLoadingTemplate(true);
    try {
      if (currentStatus === 'enabled') {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}forms/${formId}`, { status: 'disabled' });
        setEnabledFormId(null); // Reset the enabled form ID
        setLoadingTemplate(false);
        toast.success(`${tableName.toUpperCase()} enabled successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
      } else {
        // Enable the current form and disable any previously enabled form
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}forms/${formId}`, { status: 'enabled' });
        setEnabledFormId(formId); // Set the current form as enabled
        setLoadingTemplate(false);
        toast.success(`${tableName.toUpperCase()} enabled successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
      });
      }
      fetchForms(); // Refetch forms to update the UI
    } catch (error) {
      console.error("Error toggling form status:", error);
      alert("Error toggling form status. Please try again.");
    }
  };

  const handleDeleteForm = (formId: number, tableName: string) => {
    setFormToDelete(formId);
    setIsDeleteModalOpen(true);
  };
  
  // Confirm delete action
  const confirmDelete = async () => {
    if (formToDelete !== null) {
      const formToDeleteData = fetchedForms.find(form => form.id === formToDelete);
      if (formToDeleteData) {
        await deleteForm(formToDelete, formToDeleteData.tableName);
      }
      setIsDeleteModalOpen(false);
      setFormToDelete(null);
    }
  };

  const handleRedirect = () => {
    window.open('http://localhost/phpmyadmin/', '_blank');
  };

  const toggleCollapse = (formId: string) => {
    setCollapsedForms((prev) => ({
      ...prev,
      [formId]: !prev[formId],
    }));
  };

  return (
    <>
    <ToastContainer />
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="row">
        <div className="col-lg-12 mb-2 order-0">
          <div className="card">
            <div className="d-flex align-items-end row">
              <div className="col-sm-12">
                <div className="card-body">
                  {/* Navigation Bar for Tools */}
                  <Swiper
                    spaceBetween={20} // Increased space between slides
                    slidesPerView={3}
                    loop={true} // Enable infinite loop
                    pagination={{ clickable: true }}
                    breakpoints={{
                      430: {
                        slidesPerView: 3, // Show 3 items on mobile
                      },
                      768: {
                        slidesPerView: 5, // Show 5 items on tablet
                      },
                      1024: {
                        slidesPerView: 7, // Show 7 items on desktop
                      },
                    }}
                  >
                    {availableFields.map((field) => (
                      <SwiperSlide key={field.id}>
                        <div
                          className="p-2 bg-light-blue border rounded cursor-pointer nav-items flex flex-col items-center text-center space-y-4"
                          onClick={() => handleToolboxItemDrop(field)}
                        >
                          {/* Icon displayed on all screen sizes */}
                          <div className="icon-container mb-1">
                            <span className="text-3xl">{fieldIcons[field.type]}</span>
                          </div>

                          {/* Label and Type shown only on larger screens */}
                          <div className="label-container hidden md:block">
                            <span className="font-semibold text-black text-base">
                              {field.label}
                            </span>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-7 mb-4 order-1">
          <div className="card scrollable" style={{ height: '630px', overflowY: 'auto' }}>
            <div className="d-flex align-items-end row">
              <div className="col-sm-12">
                <div className="card-body">
                  {/* Workplace */}
                  <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="text-3xl font-semibold text-right text-green-600">✏️ Workplace</h4>
                    </div>
                    {/* Table Name Input */}
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="form-floating w-full">
                          <input
                            type="text"
                            value={tableName}
                            onChange={(e) => setTableName(e.target.value)}
                            id="tableNameInput"
                            placeholder=""
                            className="form-control border rounded"
                          />
                          <label htmlFor="tableNameInput" className="text-muted">Table Name</label> {/* Floating label */}
                        </div>
                        <button onClick={addNewSection} className="btn btn-primary" style={{ padding: '8px'}}>
                          <span>Add Section </span>
                          <i className='bx bx-folder-plus' style={{ padding: '3px'}}></i>
                        </button>
                      </div>
                      <br />
                      {toolSections.map((section) => (
                        <Droppable key={section.id} droppableId={section.id}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`space-y-4 mb-4 ${snapshot.isDraggingOver ? 'bg-blue-100' : ''}`} // Highlight when dragging over
                            >
                              <div className="p-4 bg-gray-200 border rounded mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                  <h4 className="font-semibold">Section: {section.id}</h4>
                                  <button onClick={() => removeSection(section.id)} className="btn btn-outline-danger">Remove Section</button>
                                </div>
                                <div className="row mt-2">
                                  {section.fields.map((field, index) => (
                                    <Draggable key={field.id} draggableId={field.id} index={index}>
                                      {(provided) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          className={`d-flex justify-content-between align-items-center col-6 p-3 border rounded mb-2 ${highlightedFieldId === field.id ? 'bg-yellow-200' : 'bg-gray-100'}`} // Highlight when clicked
                                          onClick={() => setHighlightedFieldId(field.id)} // Set highlighted field on click
                                        >
                                          <span>{field.label} ({field.type})</span>
                                          <div>
                                          <button onClick={() => openEditModal(field)} className="btn btn-outline-primary">
                                            <i className='bx bx-edit'></i>
                                          </button>
                                          <button onClick={() => removeField(section.id, field.id)} className="btn btn-outline-danger">
                                            <i className='bx bx-trash'></i>
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                              </div>
                              {provided.placeholder}
                            </div>
                            </div>
                          )}
                        </Droppable>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        <div className="col-lg-5 mb-4 order-2">
          <div className="card scrollable" style={{ height: '630px', overflowY: 'auto' }}>
            <div className="d-flex align-items-end row">
              <div className="col-sm-12">
                <div className="card-body">
                  {/* Form Preview */}
                  <div className="mt-6 p-4 bg-gray-100 border rounded-lg">
                    <div className="d-flex justify-content-between align-items-center w-full">
                      <h4 className="text-lg font-semibold">📃 Form Preview</h4>
                      <div>
                        <button className="btn btn-primary" onClick={saveForm} style={{ padding: '8px'}}>
                          <i className='bx bx-save'></i>
                          <span>Save Form</span>
                        </button>
                      </div>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {toolSections.flatMap(section => 
                      section.fields.length > 0 ? (
                        <div key={section.id} className="row">
                          {section.fields.map((field) => (
                            <div key={field.id} className={`col-6 ${section.fields.length === 1 ? 'col-12' : ''}`}>
                              <label className="block font-medium">{field.label}</label>
                              {field.type === "text" || field.type === "email" || field.type === "number" ? (
                                <Controller
                                  name={field.label}
                                  control={control}
                                  render={({ field }) => (
                                    <Input {...field} type={field.type} placeholder={field.placeholder} />
                                  )}
                                />
                              ) : field.type === "select" ? (
                                <Controller
                                  name={field.label}
                                  control={control}
                                  render={({ field: controllerField }) => (
                                    <select {...controllerField} className="form-select">
                                      <option value="">Select an option</option>
                                      {field.options?.map((option, index) => (
                                        <option key={index} value={option}>
                                          {option}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                />
                              ) : field.type === "datetime" ? (
                                <Controller
                                  name={field.label}
                                  control={control}
                                  render={({ field }) => <Input {...field} type="datetime-local" placeholder={field.placeholder} />}
                                />
                              ) : field.type === "checkbox" ? (
                                <div>
                                  {field.options?.map((option, index) => (
                                    <div key={index} className="form-check">
                                      <Controller
                                        name={`${field.label}-${option}`} // Unique name for each checkbox
                                        control={control}
                                        render={({ field: checkboxField }) => (
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={checkboxField.value}
                                            onChange={(e) => {
                                              const checked = e.target.checked;
                                              checkboxField.onChange(checked);
                                            }}
                                          />
                                        )}
                                      />
                                      <label className="form-check-label ml-2">{option}</label>
                                    </div>
                                  ))}
                                </div>
                              ) : field.type === "radio" ? (
                                <div>
                                  {field.options?.map((option, index) => (
                                    <div key={index} className="form-check">
                                      <Controller
                                        name={field.label} // Use the same name for all radio buttons in the group
                                        control={control}
                                        render={({ field: radioField }) => (
                                          <input
                                            type="radio"
                                            className="form-check-input"
                                            value={option}
                                            checked={radioField.value === option}
                                            onChange={(e) => {
                                              radioField.onChange(e.target.value);
                                            }}
                                          />
                                        )}
                                      />
                                      <label className="form-check-label ml-2">{option}</label>
                                    </div>
                                  ))}
                                </div>
                              ) : field.type === "file" ? (
                                  <Controller
                                  name={field.label}
                                  control={control}
                                  render={({ field }) => (
                                    <input
                                      type="file"
                                      className="form-control"
                                      onChange={(e) => {
                                        field.onChange(e.target.files);
                                      }}
                                    />
                                  )}
                                />
                              ) : field.type === "textarea" ? (
                                <Controller
                                  name={field.label}
                                  control={control}
                                  render={({ field }) => (
                                    <textarea
                                      {...field}
                                      placeholder={field.placeholder}
                                      className="border rounded w-full p-2"
                                      rows={4} // Adjust the number of rows as needed
                                    />
                                  )}
                                />
                              ) : field.type === "button" ? (
                                <button className="btn btn-primary" type="button">{field.label}</button>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      ) : null
                    )}
                  </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Modal for editing field */}
    {isModalOpen && currentField && (
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveFieldChanges}
        field={currentField}
      />
    )}

    {isDeleteModalOpen && (
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    )}
  </DragDropContext>
  </>
);
}