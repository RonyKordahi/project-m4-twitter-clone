import React, {useEffect, useContext, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import HomeFeed from "./Sidebar/HomeFeed";
import Notifications from "./Sidebar/Notifications";
import Bookmarks from "./Sidebar/Bookmarks";
import TweetDetails from "./Sidebar/TweetDetails";
import Profile from "./Sidebar/Profile";
import Sidebar from "./Sidebar/Sidebar";
import CurrentUserContext from "../CurrentUserContext";
import Error from "./Error";

function App() {

  const {state: {error} ,actions: {userLoaded, catchError}} = useContext(CurrentUserContext);

  useEffect(() => {
    fetch("/api/me/profile")
        .then(res => res.json())
        .then(data => {
            const {profile} = data;
            userLoaded(profile);
        })
        .catch(() => {
          catchError();
        })
}, [])

  return (<>
    <Router>
      <StyledApp>
      <Sidebar />
    {!error ? <div>
        <div>
        </div>
        <div>
          <Switch>
            <Route exact path="/"><HomeFeed /></Route>
            <Route exact path="/notifications"><Notifications /></Route>
            <Route exact path="/bookmarks"><Bookmarks /></Route>
            <Route exact path="/tweet/:tweetId"><TweetDetails /></Route>
            <Route exact path="/:profileId"><Profile /></Route>
          </Switch>
        </div>
      </div> : <Error />}
      </StyledApp>
    </Router>
    </>);
}

const StyledApp = styled.div `
  display: flex;
`

export default App;
