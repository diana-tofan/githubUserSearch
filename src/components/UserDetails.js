import React from 'react';

import '../styles/UserDetails.css';

export const UserDetails = ({ userDetails }) =>
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
        <div className="number">{userDetails.public_repos}</div>
        <div>repositories</div>
      </div>
      <div className="column">
        <div className="number">{userDetails.followers}</div>
        <div>followers</div>
      </div>
      <div className="column">
        <div className="number">{userDetails.following}</div>
        <div>following</div>
      </div>
      <a href="" target="_blank">Go to Github page</a>
    </div>
  </div>
