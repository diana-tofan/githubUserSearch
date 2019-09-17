import React from 'react';
import { User } from './User';

export const UserList = ({ users, onClick }) =>
  <ul className="user-list">
    { users.map(user => <User key={user.login} user={user} onClick={() => onClick(user)} />) }
  </ul>
