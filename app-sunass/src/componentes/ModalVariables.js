import React, { Component } from 'react';

class ModalVariables extends Component { // AUN EN DESARROLLO

    constructor(props){
        super(props);
        this.state = {
            listaCodigos : props.codigos,
            codigos : [],
            alertaux : "",
            acumulado : props.acumulado,
            tipoConsulta : props.tipoConsulta,
            tipoGrafico : props.tipoGrafico,
            grad : "0",
            todos : false
        }
        this.cerrarModal = this.cerrarModal.bind(this);
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this);
        this.handleChangeAcumulado = this.handleChangeAcumulado.bind(this);
        this.handleChangeTipoConsulta = this.handleChangeTipoConsulta.bind(this);
        this.handleChangeTipoGrafico = this.handleChangeTipoGrafico.bind(this);
        this.editCodigos = this.editCodigos.bind(this);
        this.marcarTodos = this.marcarTodos.bind(this);
        this.enviarDatos = this.enviarDatos.bind(this);
    }

    componentDidUpdate(){
        if(this.state.listaCodigos !== this.props.codigos){
            this.setState({ listaCodigos : this.props.codigos });
            this.crearCodigosSeleccionados();
        }
    }

    handleChangeOpcion(event){
        this.setState({ selectedOption : event.target.value })
    }

    handleChangeTipoGrafico(event){
        this.setState({ tipoGrafico : event.target.value })
    }

    handleChangeTipoConsulta(event){
        this.setState({ tipoConsulta : event.target.value })
    }

    handleChangeAcumulado(event){
        this.setState({ acumulado : event.target.value });
        if(event.target.value !== "3"){
            this.setState({ tipoGrafico : "column2d" })
        }else{
            this.setState({ tipoGrafico : "scrollcolumn2d" })
        }
    }

    cerrarModal(){
        this.props.vaciarModal();
    }

    editCodigos(event){
        var obj = [];
        for(var i in this.state.codigos){
            if(this.state.codigos[i][0]===event.target.value){
                obj.push([this.state.codigos[i][0],!this.state.codigos[i][1],this.state.codigos[i][2]])
            }else{
                obj.push([this.state.codigos[i][0],this.state.codigos[i][1],this.state.codigos[i][2]])
            }
        }
        var flagtrue = true;
        var flagfalse = true;
        for(var j in obj){
            if(obj[j][1]===false){
                flagtrue = false;
            }else{
                flagfalse = false
            }
        }
        if(flagtrue===false && flagfalse===false){
            this.setState({
                todos : false
            });
        }else{
            if(flagtrue===true && flagfalse===false){
                this.setState({
                    todos : true
                });
            }else{
                this.setState({
                    todos : false
                });
            }
        }
        this.setState({
            codigos : obj
        })
    }

    crearCodigosSeleccionados(){
        var obj = [];
        for(var i in this.props.codigos){
            obj.push([this.props.codigos[i][0],false,this.props.codigos[i][1]]);
        }
        this.setState({
            codigos : obj
        })
    }

    enviarDatos(){
        var codaux = [];
        var codaux2 = [];
        var todosfalsos = true;
        for(var i in this.state.codigos){
            if(this.state.codigos[i][1]===true){
                todosfalsos = false;
            }
        }

        for(var j in this.state.codigos){
            if(this.state.codigos[j][1]===true){
                codaux.push(this.state.codigos[j][0]);
                codaux2.push({
                    "codigo":this.state.codigos[j][0],
                    "descripcion":this.state.codigos[j][2]
                });
            }
        }

        this.props.cambiarCodigos(codaux);
        this.props.leyendar(codaux2);
        this.props.cambiarAcumulado(this.state.acumulado);
        this.props.cambiarTipoConsulta(this.state.tipoConsulta);
        this.props.cambiarTipoGrafico(this.state.tipoGrafico);

        if(todosfalsos === false){
            this.props.cambiarAlerta("");
            this.props.cambiarEmpezarConsulta(true);
        }else{
            this.props.cambiarAlerta("No se selecionaron codigos para la consulta");
        }
        this.props.vaciarModal();
    }

    crearOpciones1(){
        const objs = [];
        for(var i in this.state.codigos){
            objs.push(
                <div key={i*7} className="row">
                    <div key={i*7+1} className="col-1"></div>
                    <div key={i*7+2} className="col-1">
                        <label key={i*7+3} className="customcheck">
                            <input key={i*7+4} type="checkbox" value={this.state.codigos[i][0]} onChange={this.editCodigos} checked={this.state.codigos[i][1]} />
                            <span key={i*7+5} className="checkmark"></span>
                        </label>
                    </div>
                    <div key={i*7+6} className="col-10"><h5>{this.state.codigos[i][0]+" : "+this.state.codigos[i][2]}</h5></div>
                </div>
            );
        }
        return objs;
    }

    marcarTodos(){
        var obj = [];
        if(this.state.todos===false){
            for(var i in this.state.codigos){
                obj.push([this.state.codigos[i][0],true,this.state.codigos[i][2]]);
            }
            this.setState({
                codigos : obj,
                todos : true
            });
        }else{
            for(var j in this.state.codigos){
                obj.push([this.state.codigos[j][0],false,this.state.codigos[j][2]]);
            }
            this.setState({
                codigos : obj,
                todos : false
            });
        }
    }

    render(){
        return(
            <div className="modal-rr" style={{"overflow":"scroll"}}>
                <div className="modal-dialog tam60">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><b>Opciones para la consulta de variables:</b></h4>
                            <button className="close" onClick={this.cerrarModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text label-titulo" htmlFor="select-acum">Modo</label>
                                            </div>
                                            <select className="custom-select" id="select-acum" value={this.state.acumulado} onChange={this.handleChangeAcumulado}>
                                                <option key={1} value={"1"}>Del periodo</option>
                                                <option key={2} value={"2"}>Acumulado</option>
                                                <option key={3} value={"3"}>Seguimiento</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text label-titulo" htmlFor="select-tipoc">Consulta</label>
                                            </div>
                                            <select className="custom-select" id="select-tipoc" value={this.state.tipoConsulta} onChange={this.handleChangeTipoConsulta}>
                                                <option key={1} value={"tabla"}>Tabla</option>
                                                <option key={2} value={"grafico"}>Gráfico</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {this.state.tipoConsulta==="grafico"?
                                    (
                                        <div className="row">
                                            <div className="col-6">
                                                {this.state.acumulado==="3"?
                                                    (
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <label className="input-group-text label-titulo" htmlFor="select-acum">Tipo de grafico</label>
                                                            </div>
                                                            <select className="custom-select" id="select-grad" value={this.state.tipoGrafico} onChange={this.handleChangeTipoGrafico}>
                                                                <option value="scrollcolumn2d">COLUMNAS 2D</option>
                                                                <option value="mscolumn3d">COLUMNAS 3D</option>
                                                                <option value="msbar2d">BARRAS 2D</option>
                                                                <option value="msbar3d">BARRAS 3D</option>
                                                                <option value="msarea">AREA 2D</option>
                                                                <option value="msline">LINEA</option>
                                                                <option value="msspline">SPLINE</option>
                                                            </select>
                                                        </div>
                                                    ):(
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                                <label className="input-group-text label-titulo" htmlFor="select-acum">Tipo de grafico</label>
                                                            </div>
                                                            <select className="custom-select" id="select-grad" value={this.state.tipoGrafico} onChange={this.handleChangeTipoGrafico}>
                                                                <option value="column2d">COLUMNAS 2D</option>
                                                                <option value="column3d">COLUMNAS 3D</option>
                                                                <option value="bar2d">BARRAS 2D</option>
                                                                <option value="bar3d">BARRAS 3D</option>
                                                                <option value="area2d">AREA 2D</option>
                                                                <option value="line">LINEA</option>
                                                                <option value="pie2d">PIE 2D</option>
                                                                <option value="pie3d">PIE 3D</option>
                                                                <option value="doughnut2d">DONUT 2D</option>
                                                                <option value="doughnut3d">DONUT 3D</option>
                                                                <option value="pareto2d">PARETO 2D</option>
                                                                <option value="pareto3d">PARETO 3D</option>
                                                            </select>
                                                        </div>
                                                    )

                                                }
                                            </div>
                                            <div className="col-6">
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <label className="input-group-text label-titulo" htmlFor="select-tipoc">Gradiente</label>
                                                    </div>
                                                    <select className="custom-select" id="select-tipoc" value={this.props.gradiente} onChange={this.props.cambioGrad}>
                                                        <option value={"0"}>Desactivado</option>
                                                        <option value={"1"}>Activado</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ):(null)
                                }
                                <div className="row">
                                    <div className="col-3">
                                        <h5><b>Codigos:</b></h5>
                                    </div>
                                    <div className="col-9"></div>
                                </div>
                                <br/>
                                <div className="alto60" style={{"overflow":"scroll"}}>
                                    <div className="row">
                                        <div className="col-1"></div>
                                        <div className="col-1">
                                            <label className="customcheck">
                                                <input type="checkbox" onChange={this.marcarTodos} checked={this.state.todos} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="col-10"><h5>Todos</h5></div>
                                    </div>
                                    <br/>
                                    {this.crearOpciones1()}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-9"></div>
                                    <div className="col-3">
                                        <div className="row">
                                            <div className="col-6">
                                                <button onClick={this.cerrarModal} className="btn btn-secondary">Cancelar</button>
                                            </div>
                                            <div className="col-6">
                                                <button onClick={this.enviarDatos} className="btn btn-primary">Generar</button>
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

export default ModalVariables;
