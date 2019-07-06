import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppContent from './components/AppContent';
import FileOFolder from './components/FileOFolder';
import Loader from './components/loader';
import Menu from './components/Menu';
import User from './components/User';
import UserDetail from './components/UserDetail';
import UserList from './components/UserList';

describe('Smoke test for Component rendering', () => {
  it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('AppContent renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppContent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('FileOFolder renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FileOFolder />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Loader renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Loader />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Menu renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
      items: []
    }
    ReactDOM.render(<Menu { ...props } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('User renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<User />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('UserDetail renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UserDetail />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('UserList renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
      list: []
    }
    ReactDOM.render(<UserList { ...props }/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

})

