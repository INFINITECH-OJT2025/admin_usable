'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Admin/Sidebar';
import Navbar from '../Components/Admin/Navbar';
import './gallery.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { useDropzone } from 'react-dropzone'; // Import react-dropzone
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';  
import { ReactSortable } from 'react-sortablejs';

interface Gallery {
  id: number;
  gallery_name: string;
  images: string[];
  status?: number;
}

export default function Carousel() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [galleryName, setGalleryName] = useState('');
  const [images, setImages] = useState<File[]>([]); // Store selected files as an array
  const [editingId, setEditingId] = useState<number | null>(null);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}galleries`);
    setGalleries(res.data);
  };

  const handleOpen = () => {
    setModalOpen(true);
    clearForm();
  };

  const handleClose = () => {
    setModalOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setGalleryName('');
    setImages([]); // Reset the image array
    setEditingId(null);
    setExistingImages([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append('gallery_name', galleryName);
  
    // Include existing image paths to keep
    existingImages.forEach((url) => {
      formData.append('existing_images[]', url);
    });
  
    // Add new images
    images.forEach((img) => {
      formData.append('images[]', img);
    });

    if (editingId === null) {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}galleries`, formData);
    } else {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}galleries/${editingId}`, formData);
    }

    fetchGalleries();
    handleClose();
  };

  const handleEdit = (gallery: Gallery) => {
    setGalleryName(gallery.gallery_name);
    setEditingId(gallery.id);
    setImages([]); // Reset any pending uploads
    setExistingImages(gallery.images); // Load existing images
    setModalOpen(true);
  };  

  const handleDelete = async (id: number) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}galleries/${id}`);
    fetchGalleries();
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index)); // Remove image at the given index
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleEnable = async (id: number) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}galleries/${id}/enable`);
    fetchGalleries(); // Refresh data
  };
  
  

  // Use react-dropzone for drag-and-drop
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setImages([...images, ...acceptedFiles]),
    accept: 'image/*', // Only accept image files
  });

  return (
    <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed layout-navbar-fixed">
      <div className="layout-container">
        <Sidebar />
        <div className="layout-page">
          <Navbar />
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="divider">
                <div className="divider-text"><h4 className="text-3xl font-semibold text-right text-green-600 mb-6">Gallery Management</h4></div>
            </div>
            <div className="card p-4">
              <div className="d-flex justify-content-end align-items-center mb-3">
                <button className="btn btn-primary" onClick={handleOpen}>Add Gallery</button>
              </div>
              <div className="gallery-wrapper">
                <table className="gallery-table">
                  <thead>
                    <tr>
                      <th>Gallery Name</th>
                      <th>Images</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {galleries.map((gallery) => (
                      <tr key={gallery.id} className="gallery-row">
                        <td>
                          <div className="gallery-card">
                            {gallery.gallery_name}
                          </div>
                        </td>
                        <td>
                          <div className="image-count">
                            {gallery.images.length} Image{gallery.images.length !== 1 ? 's' : ''}
                          </div>

                          <PhotoProvider>
                            <Swiper
                              slidesPerView={3}
                              spaceBetween={10}
                              loop={true}
                              autoplay={{ delay: 2500, disableOnInteraction: false }}
                              modules={[Autoplay]}
                              className="gallery-slider"
                            >
                              {gallery.images.map((img, idx) => (
                                <SwiperSlide key={idx}>
                                  <PhotoView src={`http://127.0.0.1:8000${img}`}>
                                    <img
                                      src={`http://127.0.0.1:8000${img}`}
                                      alt={`slide-${idx}`}
                                      className="slider-image"
                                    />
                                  </PhotoView>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </PhotoProvider>
                        </td>
                        <td className="action-buttons">
                          <button className="btn warning" onClick={() => handleEdit(gallery)}>Edit</button>
                          <button className="btn danger" onClick={() => handleDelete(gallery.id)}>Delete</button>
                          {gallery.status != 1 ? (
                            <button className="btn success" onClick={() => handleEnable(gallery.id)}>Enable</button>
                          ) : (
                            <span className="badge success-badge">Enabled</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h5>{editingId ? 'Update' : 'Add'} Gallery</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Gallery Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={galleryName}
                  onChange={(e) => setGalleryName(e.target.value)}
                  placeholder="Galley Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Images</label>
                <div {...getRootProps()} className="dropzone-container">
                  <input {...getInputProps()} />
                  <p>Drag and drop images here, or click to select files</p>
                </div>
                <div className="preview-container">

                <label className="form-label">Existing Images (Reorder by Dragging)</label>
                <ReactSortable
                  list={existingImages}
                  setList={setExistingImages}
                  className="sortable-images"
                >
                  {existingImages.map((url, index) => (
                    <div key={url} className="image-preview">
                      <img src={`http://127.0.0.1:8000${url}`} className="image-thumb" />
                      <button type="button" className="remove-btn" onClick={() => handleRemoveExistingImage(index)}>X</button>
                    </div>
                  ))}
                </ReactSortable>


                <label className="form-label mt-3">New Images uploaded is shown here (Reorder by Dragging)</label>
                <hr />
                <ReactSortable
                  list={images}
                  setList={setImages}
                  className="sortable-images"
                >
                  {images.map((file, index) => (
                    <div key={file.name} className="image-preview">
                      <img src={URL.createObjectURL(file)} className="image-thumb" />
                      <button type="button" className="remove-btn" onClick={() => handleRemoveImage(index)}>X</button>
                    </div>
                  ))}
                </ReactSortable>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-secondary me-2" type="button" onClick={handleClose}>Cancel</button>
                <button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
}