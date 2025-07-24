import React, {useState} from 'react';
import { Button, Modal } from 'antd';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { MdPhotoLibrary, MdVideocam, MdAttachFile } from 'react-icons/md';
import './index.scss';

const ModalComponent = ({modalOpen, setModalOpen, sendStatus, setStatus, status, mediaFiles, setMediaFiles, uploading}) => {
  const [uploadingMedia, setUploadingMedia] = useState(false);

  // Add this helper function to compress images
  const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleMediaUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    console.log('Files selected:', files.length);
    
    // Check if Firebase is properly initialized
    try {
      const storage = getStorage();
      console.log('Firebase storage initialized:', !!storage);
    } catch (error) {
      console.error('Firebase storage error:', error);
      alert('Firebase not properly configured');
      return;
    }

    setUploadingMedia(true);
    
    // Upload files one by one instead of all at once
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`Processing file ${i + 1}/${files.length}:`, file.name, file.size);
      
      try {
        // File size check
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          alert(`File ${file.name} is too large. Maximum size is 5MB.`);
          continue;
        }

        const storage = getStorage();
        const timestamp = Date.now();
        const fileRef = ref(storage, `posts/${timestamp}_${i}_${file.name}`);
        
        console.log('Starting upload for:', file.name);
        
        // Simple upload without compression first
        await uploadBytes(fileRef, file);
        console.log('Upload completed for:', file.name);
        
        const url = await getDownloadURL(fileRef);
        console.log('Download URL obtained:', url);
        
        const newFile = {
          url,
          type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file',
          name: file.name
        };
        
        // Add file immediately after upload
        setMediaFiles(prev => [...prev, newFile]);
        console.log('File added to state:', file.name);
        
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        alert(`Failed to upload ${file.name}: ${error.message}`);
        break; // Stop on first error
      }
    }
    
    setUploadingMedia(false);
    console.log('Upload process completed');
  };

  const removeMedia = (index) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  const handleClose = () => {
    setModalOpen(false);
    setStatus("");
    setMediaFiles([]);
  };

  return (
    <>
      <Modal 
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={handleClose}
        width={600}
        footer={[
          <Button 
            onClick={sendStatus}
            key="submit" 
            type="primary" 
            disabled={status.length === 0 || uploading}
            loading={uploading}
          >
            {uploading ? 'Posting...' : 'Post'}
          </Button>
        ]}
      >
        <div className="modal-content">
          <textarea 
            className="modal-input" 
            placeholder="What do you want to talk about?"
            onChange={event => setStatus(event.target.value)}
            value={status}
            rows={4}
          />
          
          {mediaFiles.length > 0 && (
            <div className="media-preview">
              {mediaFiles.map((file, index) => (
                <div key={index} className="media-item">
                  {file.type === 'image' ? (
                    <img src={file.url} alt="Preview" className="media-preview-img" />
                  ) : file.type === 'video' ? (
                    <video src={file.url} controls className="media-preview-video" />
                  ) : (
                    <div className="media-preview-file">
                      📄 {file.name}
                    </div>
                  )}
                  <button 
                    className="remove-media-btn"
                    onClick={() => removeMedia(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="modal-actions">
            <label className="media-upload-btn">
              <MdPhotoLibrary className="icon" />
              Photo
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleMediaUpload}
                disabled={uploadingMedia}
              />
            </label>
            
            <label className="media-upload-btn">
              <MdVideocam className="icon" />
              Video
              <input
                type="file"
                accept="video/*"
                multiple
                style={{ display: 'none' }}
                onChange={handleMediaUpload}
                disabled={uploadingMedia}
              />
            </label>
            
            <label className="media-upload-btn">
              <MdAttachFile className="icon" />
              Document
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                multiple
                style={{ display: 'none' }}
                onChange={handleMediaUpload}
                disabled={uploadingMedia}
              />
            </label>
            
            {uploadingMedia && <span className="uploading-text">Uploading...</span>}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
