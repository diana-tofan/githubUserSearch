import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import { StateMock } from '@react-mock/state';
import App from '../components/App';

const renderComponent = ({ state }) =>
  render(
    <StateMock state={{ state }}>
      <App />
    </StateMock>
  );

const state = {
  searchResults: null,
  username: '',
  userDetails: {},
  currentPage: null,
  maxPage: null,
  isLinkHeaderParsed: false
};
  
it('renders without crashing', async () => {
  const { getByText } = renderComponent({ state });
});