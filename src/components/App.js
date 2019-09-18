import React, { useState } from 'react';
import '../styles/App.css';

import { Header } from './Header';
import { SearchCount } from './SearchCount';
import { UserList } from './UserList';
import { Modal } from './Modal';

import ReactPaginate from 'react-paginate';

const URL = "https://api.github.com/search/users?q=";

function App() {
  const [state, setState] = useState({
    searchResults: null,
    username: '',
    userDetails: {},
    currentPage: null,
    maxPage: null
  });

  const onChange = ev => {
    const username = ev.target.value;
    setState(prevState => ({ ...prevState, username }));
  };

  const onKeyPress = ev => {
    if (ev.key === "Enter") {
      searchUsers(1);
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

  function getUsers() {
  const url = `${URL}${state.username}`;
  let users = [];
  return new Promise((resolve, reject) => fetch(url)
    .then(response => {
      console.log(response.headers.get('Link'))
        if (response.status !== 200)  {
          throw `${response.status}: ${response.statusText}`;
        }
        response.json().then(data => { 
          users = users.concat(data.items);
          if(data.next) {
            getUsers(data.next, users).then(resolve).catch(reject)
          } else {
            resolve(users);
          }
        }).catch(reject);
    }).catch(reject));
}

// <https://api.github.com/search/users?q=dfdf&page=2>; rel="next", <https://api.github.com/search/users?q=dfdf&page=10>; rel="last"

const parseLinkHeader = linkHeader => {
  setState(prevState => ({ ...prevState, maxPage: 1 }))
  console.log(linkHeader)

  if (linkHeader) {
    const lastPage = linkHeader.split(',')[1];
    const lastPageLink = lastPage.split(';')[0];
    setState(prevState => ({ ...prevState, maxPage: parseInt(lastPageLink.replace(/[^0-9]/g,'')) }))
  }
}
  
  function searchUsers (page) {
    fetch(`${URL}${state.username}&page=${page}`)
      .then(response => {
        parseLinkHeader(response.headers.get('Link'));
        return response.json();
       })
      .then(json => {
        setState(prevState => ({ ...prevState, searchResults: json, currentPage: 1 }));
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

  const onPageChange = page => {
    const selectedPage = page.selected;
    if (state.maxPage >= selectedPage) {
      searchUsers(selectedPage);
    }
  }

  return (
    <div className="app">
      <Modal isModalOpen={!!Object.keys(userDetails).length} handleClose={handleClose} userDetails={userDetails} />
      <Header onChange={onChange} onKeyPress={onKeyPress} searchUsers={() => searchUsers(1)} />
      <div className="content">
       {
         state.searchResults && state.searchResults.items && 
          <div>
            <SearchCount count={state.searchResults.total_count} />
            <UserList users={state.searchResults.items} onClick={user => onClick(user)} />
            <ReactPaginate
              pageCount={state.maxPage}
              pageRangeDisplayed={10}
              marginPagesDisplayed={2}
              initialPage={0}
              onPageChange={onPageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageLinkClassName={'page-link'}
            />
          </div>
       }
      </div>
    </div>
  );
}

export default App;
