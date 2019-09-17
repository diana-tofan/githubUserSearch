import React, { useState } from 'react';
import '../styles/App.css';

import { Header } from './Header';
import { SearchCount } from './SearchCount';
import { UserList } from './UserList';
import { Modal } from './Modal';

const URL = "https://api.github.com/search/users?q=";

function App() {
  const [state, setState] = useState({
    searchResults: null,
    username: '',
    userDetails: {}
  });

  const onChange = ev => {
    const username = ev.target.value;
    setState(prevState => ({ ...prevState, username }));
  };

  const onKeyPress = ev => {
    if (ev.key === "Enter") {
      searchUsers();
    }
  }

  const onClick = user => {
    getUserDetails(user.login);
  };

  function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject(new Error("timeout"))
      }, ms)
      promise.then(resolve, reject)
    })
  }

  function getUserDetails (user) {
    const url = 'https://api.github.com/users/';
    fetch(`${url}${user}`)
      .then(response => response.json())
      .then(json => {
        setState(prevState => ({ ...prevState, userDetails: json }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  
  function searchUsers () {
    fetch(`${URL}${state.username}`)
      .then(response => response.json())
      .then(json => {
        setState(prevState => ({ ...prevState, searchResults: json }));
        console.log(json)
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const { userDetails } = state;

  const handleClose = ev => {
    ev.stopPropagation();
    setState(prevState => ({ ...prevState, userDetails: {} }));
  };

  return (
    <div className="app">
      <Modal isModalOpen={!!Object.keys(userDetails).length} handleClose={handleClose} userDetails={userDetails} />
      <Header onChange={onChange} onKeyPress={onKeyPress} searchUsers={searchUsers} />
      <div className="content">
       {
         state.searchResults && state.searchResults.items && 
          <div>
            <SearchCount count={state.searchResults.items.length} />
            <UserList users={state.searchResults.items} onClick={user => onClick(user)} />
          </div>
       }
      </div>
    </div>
  );
}

export default App;
