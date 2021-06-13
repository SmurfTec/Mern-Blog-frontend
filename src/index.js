import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostProvider } from 'contexts/PostsContext';

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <PostProvider>
        <App />
        <ToastContainer />
      </PostProvider>
    </AuthProvider>
  </BrowserRouter>,

  document.getElementById('root')
);
