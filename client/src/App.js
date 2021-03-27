import React, { useState } from 'react';
import BgImage from './background.jpg';
const App = () => {
    const [status, setStatus] = useState('Drop Here');
    const [percentage, setPercentage] = useState(0);
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
        const supportedFilesTypes = ['image/jpeg', 'image/png'];
        const { type } = event.dataTransfer.files[0];
        if (supportedFilesTypes.indexOf(type) > -1) {
            // Begin Reading File
            const reader = new FileReader();
            reader.onload = e => setPreview(e.target.result);
            reader.readAsDataURL(event.dataTransfer.files[0]);
            // Create Form Data
            const payload = new FormData();
            payload.append('file', event.dataTransfer.files[0]);
            // XHR - New XHR Request
            const xhr = new XMLHttpRequest();
            // XHR - Upload Progress
            xhr.upload.onprogress = (e) => {
                const done = e.position || e.loaded
                const total = e.totalSize || e.total;
                const perc = (Math.floor(done/total*1000)/10);
                if (perc >= 100) {
                    setStatus('Done');
                } else {
                    setStatus(`${perc}%`);
                }
                setPercentage(perc); 
            };            
            // XHR - Make Request  
            xhr.open('POST', 'http://localhost:5000/upload');
            xhr.send(payload);
        }
        event.preventDefault();
    };
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
                 <div className="ImageProgressUploaded" style={{ backgroundImage: `url(${preview})`, clipPath: `inset(${100 - Number(percentage)}% 0 0 0);` }}></div>
            </div> 

           <div className="Status">{status}</div>
            </div>
        </div> 
    );
};



export default App;