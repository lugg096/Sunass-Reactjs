import React, { Component } from 'react';
import ModalUserCrear from './componentes/ModalUserCrear.js';
import ModalUserEditar from './componentes/ModalUserEditar.js';
import './AdminPage.css';

class AdminPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : [],
            message: '',
            hostname: props.hostname,
            token: props.token,
            ModalCrear: false,
            ModalEditar: false,
            actualUser:''
        }
        this.fetchUsers = this.fetchUsers.bind(this);
        this.eliminarUsuario = this.eliminarUsuario.bind(this);
        this.abrirModalCrear = this.abrirModalCrear.bind(this);
        this.abrirModalEditar = this.abrirModalEditar.bind(this);
        this.cerrarModalCrear = this.cerrarModalCrear.bind(this);
        this.cerrarModalEditar = this.cerrarModalEditar.bind(this);
    }

    abrirModalCrear() {
        this.setState({
            ModalCrear: true
        })
    }

    cerrarModalCrear() {
        this.setState({
            ModalCrear: false
        })
    }

    abrirModalEditar(user) {
        this.setState({
            actualUser: user,
            ModalEditar: true
        })
        console.log(user)
    }

    cerrarModalEditar() {
        this.setState({
            ModalEditar: false
        })
    }

    fetchUsers() {
        fetch(this.state.hostname+"/APISunass/MainController/usuarios/obtener-usuarios",{
            method : 'POST',
            headers : {
                'Accept' : '*/*',
                'Content-Type' : 'application/json; charset=UTF-8',
                'token' : this.props.token
            },
        })
        .then((response) =>{
            return response.json()
        })
        .then((result) => {
            console.log(result);
            if (result.error) {
                //console.log('ERROR');
                this.setState({
                    error: true
                })
            } else {
                this.setState({
                    data: result
                })
                // console.log('ENTRÓ');
            }
        });
    }

    eliminarUsuario(id) {
        console.log('BORRANDO --> ' + id);
        const data = {
            id: id
        }
        fetch(this.state.hostname+"/APISunass/MainController/usuarios/eliminar-usuario",{
            method : 'POST',
            headers : {
                'Accept' : '*/*',
                'Content-Type' : 'application/json; charset=UTF-8',
                'token' : this.props.token
            },
            body : JSON.stringify(data)
        })
        .then((response) =>{
            return response.json()
        })
        .then((result) => {
            console.log(result);
            this.fetchUsers();
        });
    }

    componentDidMount() {
        // console.log(this.props.token);
        this.fetchUsers();
    }

    render() {
        // console.log('token:' + this.props.token)
        const listado = this.state.data;
        // console.log(listado);
        return(
            <div className="adminPage" style={{"minHeight":"100vh"}}>
                <br/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <div className="row">
                                <div className="col">
                                    <p className="title">
                                        PAGINA DE ADMINISTRADOR
                                    </p>
                                </div>
                            </div>
                            {listado.length === 0?
                                (
                                    <div className="row">
                                        <div className="col">
                                            <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                                <b>No hay datos</b>, intente de nuevo más tarde.
                                            </div>
                                        </div>
                                    </div>
                                ):(null)
                            }
                            <div className="row">
                                <div className="col">
                                    <table className="table tablex table-hover table-light" id="tabla-principal">
                                        <thead className="thead-dark tablex">
                                            <tr>
                                                <th>ID</th>
                                                <th>USUARIO</th>
                                                <th>CONTRASEÑA</th>
                                                <th style={{"textAlign":"right"}}>TIPO</th>
                                                <th style={{"textAlign":"center"}}>ACCIONES</th>
                                            </tr>
                                        </thead>
                                        <tbody className="tablex">
                                        {listado.map((dynamicData, i) =>
                                            <tr key={i}>
                                                <td>{dynamicData.id}</td>
                                                <td>{dynamicData.correo}</td>
                                                <td>{dynamicData.password}</td>
                                                <td align="center">{dynamicData.tipo}</td>
                                                <td className="op-container" align="right">
                                                    <button className="btn-edit btn btn-success" onClick={(e) => this.abrirModalEditar(dynamicData, e)}>
                                                        EDITAR
                                                    </button>
                                                    <button className="btn-delete btn btn-danger" onClick={(e) => this.eliminarUsuario(dynamicData.id, e)}>
                                                        ELIMINAR
                                                    </button>
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col flexDiv">
                                    <button type="button" className="btn btn-success btn-agregar" onClick={this.abrirModalCrear}>
                                        <b>Añadir usuario</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-1"></div>
                    </div>
                </div>
                {this.state.ModalCrear? (
                    <ModalUserCrear cerrarModal={this.cerrarModalCrear} fetchUsers={this.fetchUsers} hostname={this.props.hostname} token={this.props.token}/>
                ):(null)}
                {this.state.ModalEditar? (
                    <ModalUserEditar cerrarModal={this.cerrarModalEditar} fetchUsers={this.fetchUsers} hostname={this.props.hostname} token={this.props.token} user={this.state.actualUser}/>
                ):(null)}
            </div>
        )
    }
}

export default AdminPage;
