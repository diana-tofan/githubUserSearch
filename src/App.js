import React, { useState } from 'react';
import './App.css';

import logo from './logo.svg';

function App() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState('');

  const url = "https://api.github.com/search/users?q=";

  const onChange = ev => {
    setUsername(ev.target.value);
  };

  const onKeyPress = ev => {
    if (ev.key === "Enter") {
      searchUsers();
    }
  }

  function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"))
      }, ms)
      promise.then(resolve, reject)
    })
  }
  
  function searchUsers () {
    fetch(`${url}${username}`)
      .then(response => response.json())
      .then(json => { setData(json); console.log(json) })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <div className="app">
      <div className="header">
        <div className="left">
          <img src={logo} height={30} alt="Github" />
          <div>user search</div>
        </div>
        <div className="right">
          <div className="search-box">
            <input className="search-input" type="text" onChange={onChange} onKeyPress={onKeyPress} placeholder="Search..." autoFocus></input>
            <span className="fa fa-search" onClick={searchUsers}></span>
          </div>
        </div>
      </div>
      <div className="content">
       {
         data && data.items &&
          <div>
            <div className="count">{data.total_count} users found</div>
            <ul className="user-list">
              {
                data.items.map(user =>
                <a key={user.id} className="user-row" href={user.html_url} target="_blank">
                  <img src={user.avatar_url} width={40} height={40} className="avatar" />
                  <span className="username">{user.login}</span>
                </a>
                )
              }
            </ul>
          </div>
       }
      </div>
    </div>
  );
}

export default App;
