import React ,{Fragment} from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import store from './store';

//load the auth components 
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// import MovieDetail from './components/movies/MovieDetail'
// import MovieList from './components/movies/MovieList'


import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
      <Fragment>
        <div className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            {/* <Route exact path='/movies/:id' component={MovieDetail}/>
            <Route exact path='/movies' component={MovieList}/> */}
          </Switch>
        </div>
      </Fragment>
    </BrowserRouter>
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
