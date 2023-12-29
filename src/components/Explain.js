import Stack from '@mui/material/Stack';
import '../styles/explain.css'

function Explain() {
  return (
    <div className='explain-container'>
        <Stack>
            <h2>How it Works</h2>
            <p>1. Upload a 30 second video ending with the .mp4 file extension</p>
            <p>2. The Whisper model will transcribe the video and create a srt file</p>
            <p>3. A srt file will appear below, along with a download button</p>
        </Stack>
    </div>
  )
}

export default Explain;
