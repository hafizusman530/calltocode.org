import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import Loadable from '@7rulnik/react-loadable'
import Loading from './components/Loading/Loading'
import AuthActionCreator from './actions/auth'
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import About from './components/About/About'
import LoginForm from './components/LoginForm/LoginForm'
import restricted from './components/Restricted/Restricted'
import SignupForm from './components/SignupForm/SignupForm'
import Version from './components/Version/Version'
import LandingA from './components/LandingA/LandingA'
import LandingC from './components/LandingC/LandingC'
import ProjectDetail from './components/Project/ProjectDetail'
import Footer from './components/LandingF/LandingF'
import LandingB from './components/LandingB/LandingB'
import LandingE from './components/LandingE/LandingE'
import LandingD from './components/LandingD/LandingD'

// set up components for lazy loading
const ProfileRestrictedLoadable = restricted(Loadable({
  loader: () => import('./components/Profile/Profile'),
  loading: Loading
}))

const CreateProjectRestrictedLoadable = restricted(Loadable({
  loader: () => import('./components/CreateProjectForm/CreateProjectForm'),
  loading: Loading
}))

const ApplicationsRestrictedLoadable = restricted(Loadable({
  loader: () => import('./components/Applications/ApplicationsList'),
  loading: Loading
}))

class App extends Component {
  componentDidMount () {
    this.props.appLoad()
  }

  renderAppLoaded () {
    return (
      <div style={{'width': '100%'}}>
        <Header />
        <Version />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/about' component={About}/>
          <Route path='/create-project' component={CreateProjectRestrictedLoadable}/>
          <Route path='/forgot-password' component={ForgotPasswordForm}/>
          <Route path='/login' component={LoginForm}/>
          <Route path='/profile' component={ProfileRestrictedLoadable}/>
          <Route path='/signup' component={SignupForm}/>
          <Route path='/landing-a' component={LandingA} />
          <Route path='/landing-c' component={LandingC} />
          <Route path='/landing-f' component={Footer} />
          <Route path='/landing-b' component={LandingB} />
          <Route path='/landing-f' component={Footer} />
          <Route path='/landing-e' component={LandingE} />
          <Route path='/landing-d' component={LandingD} />
          <Route path='/landing-f' component={Footer} />
          <Route path='/show-applications' component={ApplicationsRestrictedLoadable} />
          <Route path='/projects/:id' component={ProjectDetail} />
        </Switch>
      </div>
    )
  }

  renderAppNotLoaded () {
    return (
      <Header />
    )
  }

  render () {
    return this.props.appLoaded
      ? this.renderAppLoaded()
      : this.renderAppNotLoaded()
  }
}

function mapStateToProps (state) {
  return {
    appLoaded: state.common.appLoaded
  }
}

const mapDispatchToProps = {
  appLoad: AuthActionCreator.appLoad
}

App.propTypes = {
  appLoad: PropTypes.func,
  appLoaded: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
