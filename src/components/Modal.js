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
              { userDetails.bio && <div>{userDetails.bio}</div> }
              { userDetails.company && <div>Workplace: {userDetails.company}</div> }
              { userDetails.location && <div>Location: {userDetails.location}</div> }
              { userDetails.email && <div>Contact: {userDetails.email}</div> }
            </div>
          </div>
          <div className="right">
            <div className="column">
              <div class="number">{userDetails.public_repos}</div>
              <div>repositories</div>
            </div>
            <div className="column">
              <div class="number">{userDetails.followers}</div>
              <div>followers</div>
            </div>
            <div className="column">
              <div class="number">{userDetails.following}</div>
              <div>following</div>
            </div>
          </div>
        </div>
        <i onClick={handleClose} className="fas fa-times" />
      </section>
    </div>
  );
};