import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState('');

  const url = "https://api.github.com/search/users?q=";

  const onChange = ev => {
    setUsername(ev.target.value);
  };

  // async function loadJson(url) { // (1)
  //   let response = await fetch(url); // (2)
  
  //   if (response.status == 200) {
  //     let json = await response.json(); // (3)
  //     return json;
  //   }
  
  //   throw new Error(response.status);
  // }
  
  // loadJson('no-such-user.json')
  //   .catch(alert); // Error: 404 (4)

  // async request() {
  //   try { 
  //     let res = await timeout(1000, fetch('/hello'));
  //   } catch(error) {
  //     // might be a timeout error
  //   }
  // }

  function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"))
      }, ms)
      promise.then(resolve, reject)
    })
  }
  

  // async function searchUsers () {
  //   try {
  //     let response = await fetch(`${url}${username}`);
  //     if (response.status === 200) {
  //       let json = await response.json();
  //       setData(json);
  //     }
  //   }
  //   catch(error) {
  //     console.log(error);
  //   }

  //   // setData(users);

  //   // return users;
  
  //   // fetch(`${url}${username}`)
  //   //   .then(response => response.json())
  //   //   .then(json => {
  //   //     console.log(json);
  //   //     setData(json);
  //   //     })
  //   //   .catch(err => console.log(err));
  // };

  function searchUsers () {
    timeout(1000, fetch(`${url}${username}`))
    .then(response => response.json())
    .then(json => setData(json))
    .catch(function(error) {
      // might be a timeout error
    })  
  }

  return (
    <div className="app">
      <header className="header">
       <span>Github users</span>
       <i className="fab fa-github"></i>
      </header>
      <body className="content">
        <div class="search-box">
          <input className="search-input" type="text" onChange={onChange} placeholder="Search..." autoFocus></input>
          <span className="fa fa-search" onClick={searchUsers}></span>
       </div>
       {
         data && data.items && <ul>
           {
             data.items.map(user => <li>{user.login}</li>)
           }
         </ul>
       }
      </body>
    </div>
  );
}

export default App;
