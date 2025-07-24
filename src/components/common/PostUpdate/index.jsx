import React, { useMemo, useState, useEffect } from 'react';
import './index.scss';
import ModalComponent from '../Modal';
import { getCurrentUser } from '../../../helpers/usersHelper';
import { addPost, getAllPosts } from '../../../api/FirestoreAPIs';
import PostCard from '../PostCard';
import { toast } from 'react-toastify';
const PostStatus = () => {
  let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [allStatuses, setAllStatus] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const sendStatus = async() => {
    setUploading(true);
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: userEmail,
      mediaUrls: mediaFiles,
      mediaTypes: mediaFiles.map(file => file.type || 'image')
    }
    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
    setMediaFiles([]);
    setUploading(false);
  };

  useEffect(() => {
    getStatus(setAllStatus);
  }, []); // Empty dependency array means it runs only once

  return (
    <>
    <div className="post-status-main">
    <div className="post-status">
        <button className="open-post-modal" onClick={() => setModalOpen(true)}>Start a post</button>
    </div>
    </div>
    <ModalComponent 
    setStatus={setStatus}
     modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      status={status}
      sendStatus={sendStatus}
      mediaFiles={mediaFiles}
      setMediaFiles={setMediaFiles}
      uploading={uploading} />

      <div className="post-feed">
        {allStatuses.map((posts) => {
        return <PostCard posts={posts} />;
        })}
      </div>
    </>
  )
}

export default PostStatus
