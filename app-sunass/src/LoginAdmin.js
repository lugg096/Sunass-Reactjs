import React, { Component } from 'react';
import './login.css';

class LoginAdmin extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: '',
            pass: '',
            error: false,
            hostname: this.props.hostname
        }
        this.fetchLogin = this.fetchLogin.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeErrorFalse = this.handleChangeErrorFalse.bind(this);
    }

    fetchLogin() {
        const data = {
            correo : this.state.user,
            pass : this.state.pass
        }
        fetch(this.state.hostname+"/APISunass/MainController/token/generateToken",{
            method : 'POST',
            headers : {
                'Accept' : '*/*',
                'Content-Type' : 'application/json; charset=UTF-8'
            },
            body : JSON.stringify(data)
        })
        .then((response) =>{
            return response.json()
        })
        .then((result) => {
            // console.log(result);
            if (result.token !== undefined) {
                var splited = result.token.split('.');
                this.props.handleChangeToken(result.token);
                this.props.handleChangeIsAdmin(true, JSON.parse(atob(splited[1])));
            } else {
                this.setState({
                    error: true
                })
            }
        });
    }

    handleChangeUser(event) {
        this.setState({
            user: event.target.value
        })
    }

    handleChangePassword(event) {
        this.setState({
            pass: event.target.value
        })
    }

    handleChangeErrorFalse() {
        this.setState({
            error: false
        })
    }

    render() {
        return(
            <div className="loginView">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <div className="text-login">
                                    { this.props.title }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Usuario</span>
                                    </div>
                                    <input type="text" model={this.state.user} onChange={this.handleChangeUser} className="form-control" placeholder="Usuario" aria-label="Usuario" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Contraseña</span>
                                    </div>
                                    <input type="password" model={this.state.pass} onChange={this.handleChangePassword} className="form-control" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="centerer">
                                    <button type="submit" className="btn-login" onClick={this.fetchLogin}>
                                        ENTRAR
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="centerer">
                                    {this.state.error? (
                                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                            Datos incorrectos, intente otra vez.
                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleChangeErrorFalse}>
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                    ):(
                                        null
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginAdmin;
