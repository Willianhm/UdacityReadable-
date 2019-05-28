import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';

import Nav from './Nav';
import Dashboard from './Dashboard';
import NewPost from './NewPost';
import PostPage from './PostPage';

import { handleInitialData } from '../actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Nav />
          <div className='container-fluid'>
            <div className="row flex-xl-nowrap">
              <main className="col-12 pr-5 pl-5 bd-content">
                {!this.props.loading && 
                  (
                    <div>
                      <Route path='/' exact component={Dashboard} />
                      <Route path='/:category' exact component={Dashboard} />
                      <Route path='/:category/:post' component={PostPage} />
                      {/* <Route path='/new' component={NewPost} />
                      <Route path='/edit/:post' component={NewPost} /> */}
                    </div>
                  )
                }
              </main>
            </div>
          </div>
        </Fragment>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleInitialData: () => dispatch(handleInitialData())
  }
}

export default connect(null, mapDispatchToProps)(App);