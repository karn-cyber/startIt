import React, {useState} from 'react';
import { Button, Modal } from 'antd';
import './index.scss';
const ModalComponent = ({modalOpen,
     setModalOpen,
     sendStatus,
     setStatus,
     status}) => {

  return (
    <>
      <Modal title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
                  
                  <Button 
                  onClick ={sendStatus}
                  key="submit" type="primary" disabled={status.length > 0 ? false : true}>
                    Post
                  </Button>
                ]}
      >
        <input className="modal-input" 
        placeholder="what do you want to talk about?"
        onChange={event => setStatus(event.target.value)}
        value={status} />
      </Modal>
    </>
  );
};

export default ModalComponent;