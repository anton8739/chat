import React from 'react';
import {Redirect, Route} from "react-router-dom";
import './App.css';
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import Dialog from "./components/Dialog/Dialog";
import NotificationAudio from "./components/common/NotificationAudio/NotificationAudio";

function App() {
  return (
    <div className="App">
        <Route exact path="/">
            <Redirect to="/account"></Redirect>
        </Route>
      <Route path="/login">
        <Login/>
      </Route>
        <Route path="/account">
            <Account/>
        </Route>
        <Route path="/dialog/:dialogId?">
          <Dialog/>
        </Route>
        <NotificationAudio/>

    </div>
  );
}

export default App;
