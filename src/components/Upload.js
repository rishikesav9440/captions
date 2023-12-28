import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import '../styles/upload.css'


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function Upload() {
  const [responseText, setResponseText] = useState('');

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
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
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
    </div>
  );
}

export default Upload;