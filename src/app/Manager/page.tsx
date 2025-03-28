'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from '../Components/Admin/Sidebar';
import Navbar from '../Components/Admin/Navbar';
import './style.css';
import style from './LineLoader.module.css'
import ValidateAdmin from '../Components/Admin/ValidateAdmin';

type FileItem = {
    name: string;
    path: string;
    size?: number;
    type: string;
    last_modified?: string;
};

export default function Manager() {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [folders, setFolders] = useState<FileItem[]>([]);
    const [currentPath, setCurrentPath] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
    const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
    const [pathHistory, setPathHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}files`, {
                params: { path: currentPath },
            });
            setFiles(response.data.files);
            setFolders(response.data.folders);
    
            // Update path history
            if (historyIndex === -1 || pathHistory[historyIndex] !== currentPath) {
                setPathHistory((prev) => [...prev.slice(0, historyIndex + 1), currentPath]);
                setHistoryIndex((prev) => prev + 1);
            }
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchFiles();
    }, [currentPath]);


    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("path", currentPath); // Add the current path to the form data
        setUploadProgress(0);
    
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}upload`, formData, {
                onUploadProgress: (progressEvent) => {
                    const total = progressEvent.total || 0;
                    const current = progressEvent.loaded;
                    const percentage = Math.round((current * 100) / total);
                    setUploadProgress(percentage);
                },
            });
            fetchFiles();
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setUploadProgress(null);
        }
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const fileArray = Array.from(files);
            fileArray.forEach(file => {
                uploadFile(file);
                setUploadedFiles(prevFiles => [...prevFiles, file]); // Update state with uploaded files
                toast.success(`File/Files was imported successfully!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                  });
            });
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const createFolder = async () => {
        const folderName = prompt("Enter new folder name");
        if (!folderName) return;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}create-folder`, {
            folder_name: currentPath ? `${currentPath}/${folderName}` : folderName,
        });
        toast.success(`${folderName} folder created successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        fetchFiles();
    };

    const deleteFolder = async (folderName: string) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}delete-folder`, {
            data: { folder: currentPath ? `${currentPath}/${folderName}` : folderName },
        });
        toast.success(`${folderName} folder is deleted successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        fetchFiles();
    };

    const renameFolder = async (oldName: string) => {
        const newName = prompt("Enter new folder name");
        if (!newName) return;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}rename-folder`, {
            old_name: currentPath ? `${currentPath}/${oldName}` : oldName,
            new_name: currentPath ? `${currentPath}/${newName}` : newName,
        });
        toast.success(`"${oldName}" is renamed into "${newName}" successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        fetchFiles();
    };

    const deleteFile = async (fileName: string) => {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}delete`, {
            data: { file: currentPath ? `${currentPath}/${fileName}` : fileName },
        });
        toast.success(`${fileName} file is deleted successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        fetchFiles();
    };

    const renameFile = async (oldName: string) => {
        const newName = prompt("Enter new file name");
        if (!newName) return;
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}rename`, {
            old_name: currentPath ? `${currentPath}/${oldName}` : oldName,
            new_name: currentPath ? `${currentPath}/${newName}` : newName,
        });
        toast.success(`"${oldName}" is renamed into "${newName}" successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        fetchFiles();
    };

    const handleFileClick = (file: FileItem) => {
        setPreviewFile(file);
    };

    const closePreview = () => {
        setPreviewFile(null);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex((prev) => prev - 1);
            setCurrentPath(pathHistory[historyIndex - 1]);
        }
    };
    
    const goForward = () => {
        if (historyIndex < pathHistory.length - 1) {
            setHistoryIndex((prev) => prev + 1);
            setCurrentPath(pathHistory[historyIndex + 1]);
        }
    };
    
    const refreshData = () => {
        fetchFiles();
    };

    const renderPreviewContent = () => {
        if (!previewFile) return null;

        const fileUrl = `http://127.0.0.1:8000${previewFile.path}`;
        const fileType = previewFile.type;

        if (fileType.startsWith('image/')) {
            return <img src={fileUrl} alt={previewFile.name} className="preview-image" />;
        } else if (fileType === 'application/pdf') {
            return (
                <iframe
                    src={fileUrl}
                    className="preview-iframe"
                    frameBorder="0"
                    style={{ width: '100%', height: '400px' }}
                />
            );
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || fileType === 'application/vnd.ms-excel') {
            return (
                <iframe
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                    className="preview-iframe"
                    frameBorder="0"
                    style={{ width: '100%', height: '400px' }}
                />
            );
        } else if (fileType === 'image/svg+xml') {
            return <img src={fileUrl} alt={previewFile.name} className="preview-image" />;
        } else {
            return (
                <div className="text-center">
                    <p>Preview not available for this file type.</p>
                </div>
            );
        }
    };

    const handleAdminValidationSuccess = () => {
        // Logic to execute after successful admin validation
        console.log("Admin validated successfully.");
    };

    return (
        <>
        <ValidateAdmin onSuccess={handleAdminValidationSuccess} />
        <ToastContainer />
        <div className="layout-wrapper layout-content-navbar light-style layout-menu-fixed layout-navbar-fixed">
            <div className="layout-container">
                <Sidebar />
                <div className="layout-page">
                    <Navbar />
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                            <div className="divider">
                                <div className="divider-text"><h4 className="text-3xl font-semibold text-right text-green-600 mb-6">📂 File Manager</h4></div>
                            </div>
                                <div className="col-lg-8 mb-4 order-0">
                                    <div className="card">
                                        <div className="d-flex align-items-end row">
                                            <div className="col-sm-12">
                                                <div className="card-body max-w-7xl mx-auto p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div className="d-flex items-center w-full space-x-2">
                                                            <button className="btn rounded-pill btn-primary" onClick={goBack} disabled={historyIndex <= 0}>
                                                                <i className='bx bxs-left-arrow'></i>
                                                            </button>
                                                            <button className="btn rounded-pill btn-primary" onClick={goForward} disabled={historyIndex >= pathHistory.length - 1}>
                                                                <i className='bx bxs-right-arrow'></i>
                                                            </button>
                                                            <button className="btn rounded-pill btn-primary" onClick={refreshData}>
                                                                <i className='bx bx-refresh'></i>
                                                            </button>
                                                            <span className="path-container bg-gray-200 rounded flex-1 overflow-hidden whitespace-nowrap text-ellipsis px-2">
                                                                public/{currentPath} 📂
                                                            </span>
                                                            <button className="btn rounded-pill btn-primary" onClick={createFolder}>
                                                                <i className='bx bx-folder-plus'></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {loading ? (
                                                        <div className="d-flex items-center w-full">
                                                            <span>
                                                                <div className={style.loader} style={{ marginLeft: '340px'}}></div>
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-6 scrollable" style={{ height: '550px', overflow: 'auto' }} onDrop={handleDrop} onDragOver={handleDragOver}>
                                                            {folders.length > 0 || files.length > 0 ? (
                                                                <div className="folder-section">
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                        {folders.map((folder) => (
                                                                            <div key={folder.name} className="flex items-center justify-between folder-card w-full">
                                                                                <div className="flex items-center justify-between w-full">
                                                                                    <div className="d-flex justify-content-between align-items-center w-full">
                                                                                        <div onClick={() => setCurrentPath(currentPath ? `${currentPath}/${folder.name}` : folder.name)}>
                                                                                            <span className="folder-icon">📁</span>
                                                                                            <span className="ml-4 text-lg font-semibold text-gray-800 ellipsis">
                                                                                                {folder.name}
                                                                                            </span>
                                                                                        </div>
                                                                                        <span>
                                                                                        <button
                                                                                                onClick={() => setIsMenuOpen((prev) => (prev === folder.name ? null : folder.name))}
                                                                                                className="file-menu-button"
                                                                                                style={{ marginLeft: 'auto' }}
                                                                                            >
                                                                                                ⋮
                                                                                            </button>
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="flex cursor-pointer">
                                                                                        {isMenuOpen === folder.name && (
                                                                                            <div className="file-menu-dropdown">
                                                                                                <div className="py-1">
                                                                                                    <button className="file-menu-item" onClick={() => renameFolder(folder.name)}>
                                                                                                        Rename
                                                                                                    </button>
                                                                                                    <button className="file-menu-item text-red-600" onClick={() => deleteFolder(folder.name)}>
                                                                                                        Delete
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                        {files.map((file) => (
                                                                            <div key={file.name} className="file-card flex items-center justify-between folder-card w-full" onClick={() => handleFileClick(file)}>
                                                                                    <div className="flex items-center justify-between w-full">
                                                                                        <div className="d-flex justify-content-between align-items-center w-full">
                                                                                            <div>
                                                                                            <span className="file-icon">📄</span>
                                                                                            <span className="ml-3 text-lg font-semibold ellipsis">{file.name}</span>
                                                                                            <span className="ml-2 text-sm text-gray-500">({file.size} bytes)</span>
                                                                                            </div>
                                                                                            <span>
                                                                                                <button
                                                                                                    onClick={() => setIsMenuOpen((prev) => (prev === file.name ? null : file.name))}
                                                                                                    className="file-menu-button"
                                                                                                >
                                                                                                    ⋮
                                                                                                </button>
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="relative">
                                                                                        {isMenuOpen === file.name && (
                                                                                            <div className="file-menu-dropdown">
                                                                                                <div className="py-1">
                                                                                                    <button
                                                                                                        className="file-menu-item"
                                                                                                        onClick={() => renameFile(file.name)}
                                                                                                    >
                                                                                                        Rename
                                                                                                    </button>
                                                                                                    <button
                                                                                                        className="file-menu-item text-red-600"
                                                                                                        onClick={() => deleteFile(file.name)}
                                                                                                    >
                                                                                                        Delete
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="empty-folder-message text-center text-gray-500">
                                                                    <p>This folder is empty.</p>
                                                                </div>
                                                            )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* File Preview Section */}
                                    <div className="col-lg-4 mb-4 order-0">
                                        <div className="card" style={{ height: '640px' }}>
                                            <div className="d-flex align-items-end row h-100">
                                                <div className="col-sm-12 h-100">
                                                    <div className="card-body h-100">
                                                        <div className="divider divider-primary">
                                                            <div className="divider-text"><h4 className="text-xl font-semibold">Preview</h4></div>
                                                        </div>
                                                        {previewFile && (
                                                            <div className="preview-card h-100">
                                                                <div className="d-flex justify-content-between align-items-center w-full">
                                                                    <span><h6 className="path-container" style={{
                                                                        marginBottom: '-40px',
                                                                        maxWidth: "300px",
                                                                        overflow: "hidden",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "nowrap",
                                                                        display: "inline-block"
                                                                        }}>{previewFile.name}</h6></span>
                                                                    <span><button onClick={closePreview} className="path-container btn btn-close"></button></span>
                                                                </div>
                                                                <div className="preview-content" style={{ height: 'calc(80% - 50px)', overflow: 'hidden' }}>
                                                                    {renderPreviewContent()}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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