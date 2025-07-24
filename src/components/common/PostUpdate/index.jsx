import React, {useState, useMemo} from 'react';
import {postStatus, getStatus} from "../../../api/FirestoreAPIs";
import '/Users/neelanshu./startit/src/components/common/PostUpdate/index.scss';
import ModalComponent from "../Modal";
import PostCard from '../PostCard';
import {getCurrentTimeStamp} from '../../../helpers/useMoment';
const PostStatus = () => {
  let userEmail = localStorage.getItem("userEmail");
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatuses, setAllStatus] = useState([]);
    const sendStatus = async() => {
      let object = {
        status: status,
        timeStamp: getCurrentTimeStamp("LLL"),
        userEmail: userEmail,
      }
        await postStatus(object);
        await setModalOpen(false);
        await setStatus("");
    };


    useMemo(()=>{
        getStatus(setAllStatus);
    })
  
 
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
      sendStatus = {sendStatus} />

      <div className="post-feed">
        {allStatuses.map((posts) => {
        //   <div key={posts.id}>
        //     <p>{posts.status}</p>
        //   </div>
        return <PostCard posts={posts} />;
        })}
      </div>
    </>
  )
}

export default PostStatus