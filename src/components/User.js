import React from 'react';

export const User = ({ user, onClick }) => 
  <li key={user.id} className="user-row" onClick={() => onClick(user)} target="_blank">
      <img src={user.avatar_url} width={40} height={40} className="avatar" alt="avatar" />
      <span className="username">{user.login}</span>
  </li>;
