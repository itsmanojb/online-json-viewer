// import { useState } from 'react';
import { ToastContextProvider } from './components/Toast/ToastContext';
import './App.css';
import JSONViewer from './components/JSONViewer/JSONViewer';

function App() {
  return (
    <ToastContextProvider>
      <JSONViewer />
    </ToastContextProvider>
  );
}

export default App;
