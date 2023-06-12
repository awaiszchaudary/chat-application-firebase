import { Fragment } from 'react';
import {Routes, Route} from 'react-router-dom';
import ChatPage from './components/ChatPage';
import SigninPage from './components/Signin/SigninPage';
import SignupPage from './components/Signup/SignupPage';
import './App.css';

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<SigninPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/chat' element={<ChatPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
