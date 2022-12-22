import React from 'react';
import Navbar from './components/navbar/navbar.component';
import SnackBar from './components/snackbar/snackbar.component';
import LoginModal from './components/login/login-modal.component';
import Loader from './components/loader/loader.component';

const App = () => {
  return (
    <>
      <Loader />
      <SnackBar />
      <LoginModal />
      <Navbar />
    </>
  );
};

export default App;
