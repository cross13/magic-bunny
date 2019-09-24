import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import localStorage from 'localStorage';
import logo from '../../assets/wizard-alt.png';
import bunny from '../../assets/rabbit.png';
import hatAlt from '../../assets/magic-hat.png';

import './magic.css';

export class Magic extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            invalidUser: false,
            bunnyCounter: 0
        };
        this.renderBunny = this.renderBunny.bind(this);
        this.bunnies = this.bunnies.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('myUser');
        if (!token) {
            this.setState({ invalidUser: true });
        }
    }

    logout() {
        localStorage.clear('myUser');
        this.props.history.push('/login');
    }

    renderBunny() {
        return <div className="Magic-hat" onClick={() => this.setState({bunnyCounter: this.state.bunnyCounter + 1})}>
            <img src={logo} className="Login-logo" alt="logo" />
        </div>
    }

    bunnies() {
        const { bunnyCounter } = this.state;

        return <div className="bunny-house">
            {
                [...Array(bunnyCounter).keys()].map((index) => {
                    return <img key={index} className={`bunny bunny-${index}`} src={bunny} alt="bunny-counter"/>;
                })
            }
        </div>
    }

    render() {
        return <div className="Magic-header">
            { !this.state.invalidUser && <div className="Magic-Logout" onClick={this.logout}><img className={`btn-logout`} src={hatAlt} alt="btn-logout"/></div> }
            { this.state.bunnyCounter > 0 && this.bunnies()}
            { this.state.invalidUser && <h1><Link className="Magic-link" to="login">Not Allow To do Magic :(</Link></h1>}
            { !this.state.invalidUser && this.renderBunny() }
        </div>;
    }
}

export default Magic;
