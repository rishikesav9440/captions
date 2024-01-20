import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Stack } from '@mui/material';
import VisuallyHiddenInput from "./VisuallyHiddenInput.js"
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import '../styles/upload.css';

function Upload() {
  const [responseText, setResponseText] = useState('');
  const [correctExtension, setCorrectExtension] = useState(true)
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      setUploadedFile(selectedFile);
  
      if (fileSizeInMB > 30 || fileExtension !== 'mp4') {
        setCorrectExtension(false);
        return;
      }

      setLoading(true);
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await fetch('https://captions-chi.vercel.app/upload', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const text = await response.text();
          setResponseText(text);
          setCorrectExtension(true);
          console.log(text);
        } else {
          console.error('Failed to upload file. Server returned:', response.status);
        }
      } catch (error) {
        console.error('Error during file upload:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownloadClick = () => {
    const blob = new Blob([responseText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subtitle.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='upload-container'>
      {!responseText && !correctExtension && (
        <>
          <Alert severity="warning">File must end in .mp4 and be less than 30mb</Alert>
          <br/>
        </>
      )}
      <div>
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        {loading && <CircularProgress size={24} style={{ marginLeft: 10, }} />}
      </div>
      <br />
      {uploadedFile && responseText && (
        <div className='srt-container'>
          <Stack>
            <h2>SRT</h2>
            {responseText.split('\n').map((line, index) => {
              const text = line.replace(/^\d+\s[\d,:]+ --> [\d,:]+\s/, '').trim();
              return text && <p key={index}>{text}</p>;
            })}
            <Button variant="contained" onClick={handleDownloadClick} style={{ marginTop: '20px' }}>
              Download SRT
            </Button>
          </Stack>
        </div>
      )}
    </div>
  );
}

export default Upload;
