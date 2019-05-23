import React, { Component } from 'react';
import '.././AdminPage.css';

class ModalUserCrear extends Component {

    constructor(props){
        super(props);
        this.state = {
            datatipos: '',
            user : props.user,
            hasPassChanged: false,
            hostname: props.hostname,
            token: props.token,
            // NEW USER
            correo: '',
            password: '',
            nombres: '',
            apellidos: '',
            dni: '',
            tipo: '1',
            activo: true
        }
        this.cerrarModal = this.cerrarModal.bind(this);
        this.handleChangeCorreo = this.handleChangeCorreo.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeNombres = this.handleChangeNombres.bind(this);
        this.handleChangeApellidos = this.handleChangeApellidos.bind(this);
        this.handleChangeDni = this.handleChangeDni.bind(this);
        this.handleChangeTipo = this.handleChangeTipo.bind(this);
        this.handleChangeActivo = this.handleChangeActivo.bind(this);
        this.crearUsuario = this.crearUsuario.bind(this);
        this.crearOpcionesTipos = this.crearOpcionesTipos.bind(this);
    }

    handleChangeCorreo(event) { this.setState({ correo: event.target.value }); }
    handleChangePassword(event) { this.setState({ password: event.target.value }); }
    handleChangeNombres(event) { this.setState({ nombres: event.target.value }); }
    handleChangeApellidos(event) { this.setState({ apellidos: event.target.value }); }
    handleChangeDni(event) { this.setState({ dni: event.target.value }); }
    handleChangeTipo(event) { this.setState({ tipo: event.target.value }); }
    handleChangeActivo(event) { this.setState({ activo: event.target.value }); }

    cerrarModal() {
        this.props.cerrarModal();
    }

    componentDidMount() {
        fetch(this.state.hostname+"/APISunass/MainController/usuarios/obtener-tipos",{
            method : 'POST',
            headers : {
                'Accept' : '*/*',
                'Content-Type' : 'application/json; charset=UTF-8',
                'token' : this.props.token
            }
        })
        .then((response) =>{
            return response.json()
        })
        .then((result) => {
            this.setState({ datatipos: result })
        });
    }

    crearOpcionesTipos() {
        const objs = [];
        for(var i in this.state.datatipos){
            objs.push(<option key={i+1} value={this.state.datatipos[i].id}>{this.state.datatipos[i].descripcion}</option>)
        }
        return objs;
    }

    crearUsuario() {
        if( this.state.correo === ''){
            alert('Error, el correo no puede vacío');
            return;
        }
        const data = {
            correo : this.state.correo,
            password: this.state.password,
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            dni: this.state.dni,
            tipo: this.state.tipo,
            activo: this.state.activo
        }
        console.log()
        fetch(this.state.hostname+"/APISunass/MainController/usuarios/nuevo-usuario",{
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
            if(result['pass'])
                alert('La clave autogenerada es: ' + result['pass']);
            else if(result['error'])
                alert(result['error']);

            this.props.fetchUsers();
            this.props.cerrarModal();
        });
    }

    render() {
        console.log(this.state.user);
        return(
            <div className="customModal">
                <div className="modal-dialog tam50">
                    <div className="modal-content" style={{"minHeight":"70vh"}}>
                        <div className="modal-header">
                            <h4 className="modal-title"><b>DATOS DEL USUARIO:</b></h4>
                            <button className="close" onClick={this.cerrarModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Usuario:</label>
                                            <input value={this.state.correo} onChange={this.handleChangeCorreo} className="form-control" placeholder="Usuario" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Contraseña:</label>
                                            <input value={this.state.password} onChange={this.handleChangePassword} className="form-control" placeholder="Contraseña" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Nombres:</label>
                                            <input value={this.state.nombres} onChange={this.handleChangeNombres} className="form-control" placeholder="Nombres" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Apellidos:</label>
                                            <input value={this.state.apellidos} onChange={this.handleChangeApellidos} className="form-control" placeholder="Apellidos" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>DNI:</label>
                                            <input value={this.state.dni} onChange={this.handleChangeDni} className="form-control" placeholder="DNI" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Tipo:</label>
                                            <select value={this.state.tipo} onChange={this.handleChangeTipo} className="form-control">
                                                { this.crearOpcionesTipos() }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label>Activo:</label>
                                            <select value={this.state.activo} onChange={this.handleChangeActivo} className="form-control">
                                                <option value={true}>Activo</option>
                                                <option value={false}>No activo</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-6" style={{"textAlign":"right"}}>
                                                <button onClick={this.cerrarModal} className="btn btn-secondary">CANCELAR</button>
                                            </div>
                                            <div className="col-6" style={{"textAlign":"left"}}>
                                                <button onClick={this.crearUsuario} className="btn btn-primary">CREAR</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalUserCrear;
