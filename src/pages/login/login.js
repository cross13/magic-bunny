import React, { PureComponent } from 'react';
import axios from 'axios';
import localStorage from 'localStorage';
import logo from '../../assets/magician.svg';

import './login.css';

export class Login extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            username: '',
            error: '',
            loggedIn: false
        };
        this.authenticate = this.authenticate.bind(this);
    }

    authenticate() {
        this.setState({error: ''});
        axios.post('http://localhost:8080/login', {
            username: this.state.username,
            password: this.state.password,
        }).then((response) => {
            this.setState({loggedIn: true});
            console.log(response);
            localStorage.setItem('myUser', JSON.stringify(response.data.token));
            setTimeout(() => {
                this.props.history.push('/magic');
            }, 1000);
        }, () => {
            setTimeout(() => {
                this.setState({ error: 'Wrong Crendentials' })
            }, 1000);
        });
    }

    render () {
        return (
            <div className="Login">
                <div className="Login-header">
                    <h4 data-cy="title">Welcome to the magic hat</h4>
                    <img src={logo} className="Login-logo" alt="logo" />
                    {!this.state.loggedIn && <div className="Login-form" >
                        <h3 className="Login-Title">Magic App</h3>
                        <input 
                            name="username"
                            onChange={(e) => this.setState({username: e.target.value})}
                            type="text" placeholder="Username" className="effect-7 Login-username Login-input" />
                        <input
                            name="password"
                            onChange={(e) => this.setState({password: e.target.value})}
                            type="password" placeholder="Password" className="effect-7 Login-password Login-input" />
                        <button className="Login-submit"
                            onClick={this.authenticate}>Login</button>
                        {
                            this.state.error && <div className="Login-error">{this.state.error}</div>
                        }
                    </div>
                    }
                    {!this.state.loggedIn && <div id="signin"><a href="/register">Register</a></div> }
                    {
                        this.state.loggedIn && <h1>looking for the bunny...</h1>
                    }
                </div>
            </div>
        );
    }
  
}

export default Login;
