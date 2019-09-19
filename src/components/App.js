import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

import { Header } from './Header';
import { SearchCount } from './SearchCount';
import { UserList } from './UserList';
import { Modal } from './Modal';

import '../styles/App.css';

const URL = "https://api.github.com/search/users?q=";

function App() {
  const [state, setState] = useState({
    searchResults: null,
    username: '',
    userDetails: {},
    currentPage: null,
    maxPage: null,
    isLinkHeaderParsed: false
  });

  const { searchResults, currentPage, maxPage, userDetails, username, isLinkHeaderParsed } = state;

  const onChange = ev => {
    const username = ev.target.value;
    setState(prevState => ({ ...prevState, username }));
  };

  const onKeyPress = ev => {
    if (ev.key === "Enter") {
      searchUsers(1);
    }
  };

  const onClick = user => {
    getUserDetails(user.login);
  };

  const getUserDetails = user => {
    const url = "https://api.github.com/users/";
    fetch(`${url}${user}`)
      .then(response => response.json())
      .then(json => {
        setState(prevState => ({ ...prevState, userDetails: json }));
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const parseLinkHeader = linkHeader => {
    setState(prevState => ({ ...prevState, maxPage: 1 }))
    if (linkHeader) {
      const lastPage = linkHeader.split(',')[1];
      const lastPageLink = lastPage.split(';')[0];
      const page = lastPageLink.split('=')[3];
      setState(prevState => ({ ...prevState, maxPage: parseInt(page.substring(0, page.length - 1)), isLinkHeaderParsed: true }));
    }
  }
  
  const searchUsers = page => {
    return fetch(`${URL}${username}&per_page=10&page=${page}`, {
      headers: {
        'Authorization': 'token 2507e5a558b7b451a20e05cfa37ec7cbf6f7a2f3'
      }})
      .then(response => {
        !isLinkHeaderParsed && parseLinkHeader(response.headers.get('Link'));
        return response.json();
       })
      .then(json => {
        setState(prevState => ({ ...prevState, searchResults: json, currentPage: 1 }));
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  const handleClose = ev => {
    ev.stopPropagation();
    setState(prevState => ({ ...prevState, userDetails: {} }));
  };

  const onPageChange = page => {
    const selectedPage = page.selected;
    setState(prevState => ({ ...prevState, currentPage: selectedPage + 1 }));
    searchUsers(selectedPage);
  }

  return (
    <div className="app">
      <Modal isModalOpen={!!Object.keys(userDetails).length} handleClose={handleClose} userDetails={userDetails} />
      <Header onChange={onChange} onKeyPress={onKeyPress} searchUsers={() => searchUsers(1)} />
      <div className="content">
       {
         searchResults && searchResults.items && 
          <div>
            <SearchCount count={searchResults.total_count} />
            <UserList users={searchResults.items} onClick={user => onClick(user)} />
            <ReactPaginate
              pageCount={maxPage}
              pageRangeDisplayed={10}
              marginPagesDisplayed={2}
              initialPage={currentPage - 1}
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
