import React, { useState } from 'react';
import BgImage from './background.jpg';
const App = () => {
    const [status, setStatus] = useState('Drop Here');
    const [preview, setPreview] = useState(null);
    const onDragEnter = event => {
        console.log(event);
        setStatus('File Detected');
        event.preventDefault();
        event.stopPropagation();
    }
    const onDragOver = event => {
        setStatus('Drop');
        event.preventDefault();
    }
    const onDrop = event => {
        console.log(event);
        const supportedFilesTypes = ['image/jpeg', 'image/png'];
        const { type } = event.dataTransfer.files[0];
        if (supportedFilesTypes.indexOf(type) > -1) {
            // continue with code
           // Begin Reading File
           const reader = new FileReader();
           reader.onload = e => setPreview(e.target.result);
           reader.readAsDataURL(event.dataTransfer.files[0]);
            console.log("['image/jpeg', 'image/png']");
        }
        event.preventDefault();
    }
    const onDragLeave = event => {
        setStatus('Drop Here');
        event.preventDefault();
    }
    const doNothing = event => event.preventDefault();

    return (
            <div className="App" onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={doNothing} onDrop={onDragLeave}>
            <div className={`ImagePreview ${preview ? 'Show' : ''}`}>
                <div style={{ backgroundImage: `url(${BgImage})` }} />
            </div>
            <div className={`DropArea ${status === 'Drop' ? 'Over' : ''}`} onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragEnter}>
            <div className={`ImageProgress ${preview ? 'Show' : ''}`}>
               <div className="ImageProgressImage" style={{ backgroundImage: `url(${preview})` }}></div>
               <div className="ImageProgressUploaded" style={{ backgroundImage: `url(${preview})` }}></div>
           </div>
           <div className="Status">{status}</div>
            </div>
        </div> 
    );
};



export default App;