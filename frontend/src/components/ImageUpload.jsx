import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Camera, X } from 'lucide-react';

export default function ImageUpload({ onResponse }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [age, setAge] = useState('');
  const [healthIssues, setHealthIssues] = useState('');
  const [isSending, setIsSending] = useState(false); // New state for button loading
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      setLoading(true);
      setPreview(URL.createObjectURL(file));
      setTimeout(() => setLoading(false), 1500);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setLoading(false);
  };

  const startCamera = async () => {
    setShowCamera(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    const imageUrl = canvas.toDataURL('image/png');
    setPreview(imageUrl);
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const logInputs = async () => {
    if (!preview) {
      alert('Please upload an image first.');
      return;
    }
    try {
      setIsSending(true); // Start loading state
      // Convert the preview image (base64) back to a Blob
      const base64Response = await fetch(preview);
      const blob = await base64Response.blob();
      // Create a FormData object
      const formData = new FormData();
      formData.append('file', blob, 'image.png'); // Append the image file
      formData.append('age', age); // Append the age
      formData.append('health', healthIssues); // Append the health issues
      // Send the request to the server
      const response = await fetch('https://smartfoodanalyzer.onrender.com/Analyze', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text(); // Get error details
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
      }
      const result = await response.json();
      onResponse(result); // Pass the response to the parent component
      console.log('API Response:', result);
    } catch (error) {
      console.error('Error sending data:', error.message);
      alert(`Failed to send data: ${error.message}`);
    } finally {
      setIsSending(false); // End loading state
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showCamera ? (
        <div className="relative">
          <video ref={videoRef} autoPlay className="w-full rounded-lg" />
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={capturePhoto} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Capture
            </button>
            <button onClick={stopCamera} className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Cancel
            </button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      ) : (
        <div
          className={`relative overflow-hidden border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            dragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-102' 
              : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {loading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {preview ? (
            <div className="relative">
              <img src={preview} alt="Preview" className="max-h-80 mx-auto rounded-lg shadow-lg" />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                  <Upload className="w-10 h-10 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Upload Food Label
                </h3>
                <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                  Drag and Drop Here
                </label>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button onClick={startCamera} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-shadow">
                  <Camera className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Take Photo</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-shadow">
                  <ImageIcon className="w-4 h-4 text-gray-500" />
                  <span>
                    <label className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                      Browse Gallery
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFile(e.target.files[0]);
                        }}
                      />
                    </label>
                  </span>
                </button>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Supported formats: JPG, PNG, GIF (max. 10MB)
              </div>
            </div>
          )}
        </div>
      )}
      {/* Additional Input Fields */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your age"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Health Issues</label>
          <textarea
            value={healthIssues}
            onChange={(e) => setHealthIssues(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Describe any health issues"
          />
        </div>
      </div>
      {/* Log Button with Loading Animation */}
      <div className="mt-6">
        <button
          onClick={logInputs}
          disabled={isSending} // Disable button while sending
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors ${
            isSending ? 'bg-indigo-700 cursor-not-allowed' : 'hover:bg-indigo-700'
          }`}
        >
          {isSending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Sending...
            </div>
          ) : (
            'Analyze'
          )}
        </button>
      </div>
    </div>
  );
}