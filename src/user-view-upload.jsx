import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserFiles = () => {
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    // Fetch user-specific files from backend API
    axios.get('/api/files')
      .then((response) => {
        setUserFiles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user files:', error);
      });
  }, []);

  return (
    <div>
      <h2>User Files</h2>
      {userFiles.map((file) => (
        <div key={file.id}>
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            {file.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default UserFiles;