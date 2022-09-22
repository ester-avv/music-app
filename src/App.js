import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Edit from './pages/Edit';
import Profile from './pages/Profile';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <h1>Trybetunes</h1>
        <Switch>
          <Route path="/search" component={ Search } />

          <Route path="/album/:id" component={ Album } />

          <Route path="/favorites" component={ Favorites } />

          <Route exact path="/profile" component={ Profile } />

          <Route exact path="/profile/edit" component={ Edit } />

          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
