import React from 'react';
import { UserDetails } from './UserDetails';

import '../styles/Modal.css';

export const Modal = ({ handleClose, isModalOpen, userDetails }) => {
  const showHideClassName = isModalOpen ? "modal display-block" : "modal display-none";
  
  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section className="modal-main" onClick={ev => ev.stopPropagation() }>
        <UserDetails userDetails={userDetails} />
        <i onClick={handleClose} className="fas fa-times" />
      </section>
    </div>
  );
};