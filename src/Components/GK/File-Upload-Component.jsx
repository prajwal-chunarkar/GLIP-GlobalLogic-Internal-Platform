import React, { useState } from 'react';
import axios from 'axios';

const AdminUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);


    axios.post('/api/upload', formData)
      .then(() => {
        alert('File uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div>
      <h2>Admin Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default AdminUpload;