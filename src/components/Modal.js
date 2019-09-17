import React from 'react';
import '../styles/Modal.css';
import '../styles/UserDetails.css';

export const Modal = ({ handleClose, isModalOpen, userDetails }) => {
  const showHideClassName = isModalOpen ? "modal display-block" : "modal display-none";
  
  return (
    <div className={showHideClassName} onClick={handleClose}>
      <section className="modal-main" onClick={ev => ev.stopPropagation() }>
        <div className="user-details">
          <div className="left">
            <img src={userDetails.avatar_url} className="avatar-large" alt="avatar" />
            <div className="basic-info">
              <h3 className="login">{userDetails.login}</h3>
              { userDetails.name && <h3 className="name">{userDetails.name}</h3> }
              { userDetails.bio && <span className="bio">{userDetails.bio}</span> }
              { userDetails.company && <span className="company">Workplace: {userDetails.company}</span> }
              { userDetails.location && <span className="location">Location: {userDetails.location}</span> }
              { userDetails.email && <span className="email">Contact: {userDetails.email}</span> }
            </div>
          </div>
          <div className="right">
            
          </div>
        </div>
        <i onClick={handleClose} className="fas fa-times" />
      </section>
    </div>
  );
};