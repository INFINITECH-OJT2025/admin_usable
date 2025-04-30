'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Admin/Sidebar';
import Navbar from '../Components/Admin/Navbar';
import { ToastContainer, toast } from "react-toastify";

interface Testimonial {
    id: number;
    name: string;
    message: string;
    is_visible: boolean;
}

export default function ManageTestimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const itemsPerPage = 6; // Adjust how many forms to show per page
    const [currentPage, setCurrentPage] = useState(1);
    const [expanded, setExpanded] = useState(null); // Track expanded message

    const toggleMessage = (id) => {
      setExpanded(expanded === id ? null : id); // Toggle expand/collapse
    };
  
    const maxLength = 200; // Max characters to display for message

    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    // Get forms for the current page
    const paginatedForms = testimonials.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}testimonials`);
        setTestimonials(response.data);
    };

    const toggleVisibility = async (id: number) => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}testimonials/${id}/toggle-visibility`);
        fetchTestimonials();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const testimonialData = { name, message, is_visible: isVisible };

        if (editingId === null) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}testimonials`, testimonialData);
            toast.success(`Testimonial Added Successfully!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
        } else {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}testimonials/${editingId}`, testimonialData);
            toast.success(`Testimonial Edited Successfully!`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
              });
        }

        closeModal();
        fetchTestimonials();
    };

    const handleEdit = (testimonial: Testimonial) => {
        setName(testimonial.name);
        setMessage(testimonial.message);
        setIsVisible(testimonial.is_visible);
        setEditingId(testimonial.id);
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}testimonials/${id}`);
        fetchTestimonials();
        toast.success(`Testimonial Deleted Successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
    };

    const openModal = () => {
        resetForm();
        setShowModal(true);
    };

    const closeModal = () => {
        resetForm();
        setShowModal(false);
    };

    const resetForm = () => {
        setName('');
        setMessage('');
        setIsVisible(false);
        setEditingId(null);
    };

    return (
        <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed layout-navbar-fixed">
            <ToastContainer />
            <div className="layout-container">
                <Sidebar />
                <div className="layout-page">
                    <Navbar />

                    <div className="container-xxl flex-grow-1 container-p-y">
                        <div className="card p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="m-0">Manage Testimonials</h4>
                                <button className="btn btn-primary" onClick={openModal}>
                                    Add Testimony
                                </button>
                            </div>

                            <table className="table">   
                                <tbody>
                                {paginatedForms.map((t) => (
                                <tr key={t.id} className="mobile-table-row">
                                    <td colSpan={4}>
                                    <div className="mobile-card">
                                        <div className="mobile-card-name"><strong>{t.name}</strong></div>

                                        <div className="mobile-card-message">
                                        {expanded === t.id
                                            ? t.message
                                            : t.message.length > maxLength
                                            ? `${t.message.substring(0, maxLength)}...`
                                            : t.message}
                                        {t.message.length > maxLength && (
                                            <a onClick={() => toggleMessage(t.id)}>
                                            <span className="cursor-pointer" style={{ color: '#6b6bff' }}>
                                                {expanded === t.id ? ' See Less' : ' See More'}
                                            </span>
                                            </a>
                                        )}
                                        </div>

                                        <div className="mobile-card-footer">
                                        <div className="mobile-card-visible" style={{ marginBottom: '5px'}}>
                                            <strong>Visible:</strong>{' '}
                                            <span
                                                style={{
                                                display: 'inline-block',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                backgroundColor: t.is_visible ? '#22c55e' : '#ef4444', // green for Yes, red for No
                                                color: 'white',
                                                fontWeight: 'bold',
                                                marginLeft: '6px',
                                                fontSize: '12px',
                                                }}
                                            >
                                                {t.is_visible ? 'Yes' : 'No'}
                                            </span>
                                        </div>

                                        <div className="mobile-card-actions">
                                            <button
                                            onClick={() => handleEdit(t)}
                                            className="btn btn-sm btn-outline-warning"
                                            >
                                            Edit
                                            </button>
                                            <button
                                            onClick={() => handleDelete(t.id)}
                                            className="btn btn-sm btn-outline-danger ms-2"
                                            >
                                            Delete
                                            </button>
                                            <button
                                            onClick={() => toggleVisibility(t.id)}
                                            className="btn btn-sm btn-outline-primary ms-2"
                                            >
                                            Toggle Visibility
                                            </button>
                                        </div>
                                        </div>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                            <br />
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

                    {/* Modal */}
                    {showModal && (
                        <div className="modal fade show d-block" tabIndex={-1} style={{ background: 'rgba(0, 0, 0, 0.5)' }}>
                            <div className="modal-overlay">
                              <div className="modal-dialog">
                                  <div className="modal-content">
                                      <div className="modal-header">
                                          <h5 className="modal-title">
                                              {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                                          </h5>
                                          <button type="button" className="btn-close" onClick={closeModal}></button>
                                      </div>
                                      <form onSubmit={handleSubmit}>
                                          <div className="modal-body">
                                              <div className="mb-3">
                                                  <label htmlFor="name" className="form-label">Name</label>
                                                  <input
                                                      type="text"
                                                      id="name"
                                                      className="form-control"
                                                      value={name}
                                                      onChange={(e) => setName(e.target.value)}
                                                      required
                                                  />
                                              </div>
                                              <div className="mb-3">
                                                  <label htmlFor="message" className="form-label">Message</label>
                                                  <textarea
                                                      id="message"
                                                      className="form-control"
                                                      rows={4}
                                                      value={message}
                                                      onChange={(e) => setMessage(e.target.value)}
                                                      required
                                                  />
                                              </div>
                                              <div className="form-check">
                                                  <input
                                                      type="checkbox"
                                                      className="form-check-input"
                                                      checked={isVisible}
                                                      onChange={() => setIsVisible(!isVisible)}
                                                  />
                                                  <label className="form-check-label">Visible</label>
                                              </div>
                                          </div>
                                          <div className="modal-footer">
                                              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                                  Cancel
                                              </button>
                                              <button type="submit" className="btn btn-primary">
                                                  {editingId ? 'Update' : 'Add'}
                                              </button>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <div className="layout-overlay layout-menu-toggle"></div>
        </div>
    );
}