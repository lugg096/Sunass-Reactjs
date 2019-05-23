import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppPrimary from "./AppPrimary.js";
import AdminPage from "./AdminPage.js";
import Login from "./Login.js";
import LoginAdmin from "./LoginAdmin.js";

class App extends Component {

    constructor(){
        super();
        this.state = {
            isLogged: false,
            isAdmin: false,
            token: '',
            hostname: 'http://179.43.88.86:8080' //HAY QUE AÑADIR UN HOSTNAME PARA QUE FUNCIONE LA APLICACION WEB
        }
        this.handleChangeIsAdmin = this.handleChangeIsAdmin.bind(this);
        this.handleChangeIsLogged = this.handleChangeIsLogged.bind(this);
        this.handleChangeToken = this.handleChangeToken.bind(this);
    }

    handleChangeIsLogged(flag, tokenBody) {
        this.setState({
            isLogged: flag,
            tokenBody: tokenBody
        })
    }

    handleChangeIsAdmin(flag, tokenBody) {
        this.setState({
            isAdmin: flag,
            tokenBody: tokenBody
        })
    }

    handleChangeToken(token) {
        this.setState({
            token: token
        })
    }

    render() {
        if (this.state.isLogged) {
            return (<AppPrimary tokenBody={this.state.tokenBody} handleChangeIsLogged={this.handleChangeIsLogged} token={this.state.token} hostname={this.state.hostname}/>)
        } else if (this.state.isAdmin) {
            return (<AdminPage tokenBody={this.state.tokenBody} token={this.state.token} hostname={this.state.hostname}/>)
        } else  {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/admin"
                            component={(props) => <LoginAdmin {...props} title={"ADMINISTRADOR"} handleChangeIsAdmin={this.handleChangeIsAdmin} handleChangeToken={this.handleChangeToken} hostname={this.state.hostname}/>}
                        />
                        <Route
                        component={(props) => <Login {...props} title={"LOGIN"} handleChangeIsLogged={this.handleChangeIsLogged} handleChangeToken={this.handleChangeToken} hostname={this.state.hostname}/>}
                        />
                    </Switch>
                </BrowserRouter>
            )
        }
    }
}

export default App;
