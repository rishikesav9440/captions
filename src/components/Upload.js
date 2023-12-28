import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import VisuallyHiddenInput from "./VisuallyHiddenInput.js"
import { useState } from 'react';
import '../styles/upload.css';

function Upload() {
  const [responseText, setResponseText] = useState('');
  const [correctExtension, setCorrectExtension] = useState(true)

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
  
      if (fileSizeInMB > 30 || fileExtension !== 'mp4') {
        setCorrectExtension(false);
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await fetch('http://143.198.16.8/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const text = await response.text();
          setResponseText(text);
          setCorrectExtension(true);
          console.log('Server response:', text);
        } else {
          console.error('Failed to upload file. Server returned:', response.status);
        }
      } catch (error) {
        console.error('Error during file upload:', error);
      }
    }
  };
  

  return (
    <div className='upload-container'>
      {!responseText && !correctExtension && (
        <>
          <Alert severity="warning">File must end in .mp4 and be less than 30mb</Alert>
          <br/>
        </>
      )}
      {!responseText && (
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
      )}
      <br />
      
    </div>
  );
}

export default Upload;
