import React from 'react';
import logo from '../svg/logo.svg';

export const Header = ({ onChange, onKeyPress, searchUsers }) => 
  <div className="header">
    <div className="left">
      <img src={logo} height={30} alt="Github" />
      <div className="subtitle">user search</div>
    </div>
    <div className="right">
      <div className="search-box">
        <input className="search-input" type="text" onChange={onChange} onKeyPress={onKeyPress} placeholder="Search..." autoFocus></input>
        <span className="fa fa-search" onClick={searchUsers}></span>
      </div>
    </div>
  </div>