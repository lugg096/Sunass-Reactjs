import React, { Component } from 'react';

class ModalReportesRegulatorios extends Component { // AUN EN DESARROLLO

    constructor(props){
        super(props);
        console.log(JSON.stringify(props));
        this.state = {
            show : props.show,
            hostname : this.props.hostname,
            eps : this.props.eps,
            local : this.props.local,
            periodo : this.props.periodo,
            selectedOption : "a1",
            lista1 : [
                ["Anexo 5: Costos y gastos",'costos'],
                ["Anexo 2: Facturación e ingresos",'facturacion'],
                ["Anexo 5: Costos y gastos",'costosygastos'],
                ["Anexo 2: Activo fijo",'activos'],
                ["Anexo 3: Reporte de sanciones",'sanciones'],
                ["Anexo 4: Reporte de inversiones",'inversiones'],
                ["Anexo 6: Financiamiento",'financiamiento']
            ],
            lista2 : [
                ["Resumen de cuentas",'cuentas'],
                ["Consistencia de ingresos y egresos",'consistenaic'],
                ["Análisis de variación de existencias",'variacion'],
                ["Cuentas sin movimientos",'sinmovimiento']
            ],
            lista3 : [
                ["Por cuenta contable",'porcc'],
                ["Por cuenta contable comparativo",'porcccomparativa'],
                ["Saldos de transferencias",'stransferencias'],
                ["Saldos de inversiones",'sinversiones'],
                ["Variables de gestión",'vgestion']
            ],
            lista4 : [
                ["Reporte ET-1: Variables de gestión",'et1vgestion'],
                ["Reporte ET-2: Servicios y procesos",'sprocesos'],
                ["Reporte ET-3: Anexo 5 Anualizado",'anualizado'],
                ["Reporte ET-4: Cuentas contables anualizado",'ccanulizado'],
                ["Reporte ET-5: Centros de costos anualizado",'cencostanualizado']
            ]
        }
        this.cerrarModal = this.cerrarModal.bind(this);
        this.handleChangeOpcion = this.handleChangeOpcion.bind(this);
        this.enviarReporte = this.enviarReporte.bind(this);
    }

    handleChangeOpcion(event){
        this.setState({ selectedOption : event.target.value })
    }

    cerrarModal(){
        this.props.vaciarModal();
    }

    enviarReporte(){

        var tempo;
        if(this.state.selectedOption.charAt(0) === 'a')
            tempo = this.state.lista1[parseInt(this.state.selectedOption.charAt(1))][1];
        else if(this.state.selectedOption.charAt(0) === 'b')
            tempo = this.state.lista2[parseInt(this.state.selectedOption.charAt(1))][1];
        else if(this.state.selectedOption.charAt(0) === 'c')
            tempo = this.state.lista3[parseInt(this.state.selectedOption.charAt(1))][1];
        else if(this.state.selectedOption.charAt(0) === 'd')
            tempo = this.state.lista4[parseInt(this.state.selectedOption.charAt(1))][1];

        console.log(tempo);
        var url;
        if(this.state.local !== -1){
            url = this.state.hostname+'/birt/frameset?__report='+tempo+'.rptdesign&zona='+this.state.eps+'&loca='+this.state.local+'&per='+this.state.periodo+'&anio='+this.state.periodo.substring(0,4);
        }
        else{
            url = this.state.hostname+'/birt/frameset?__report='+tempo+'con.rptdesign&zona='+this.state.eps+'&per='+this.state.periodo+'&anio='+this.state.periodo.substring(0,4);
        }
        window.open(url,'_blank');
        
    }

    crearOpciones(lista,etiqueta){
        const objs = [];
        for(var i in lista){
            objs.push(
                <div className="row">
                    <div className="col-1"><input type="radio" value={""+etiqueta+i} 
                        onClick={this.handleChangeOpcion} 
                        checked={this.state.selectedOption === (""+etiqueta+i)} /></div>
                    
                    <div className="col-11">{lista[i][0]}</div>
                </div>
            );
        }
        return objs;
    }

    render(){
        return(
            <div className="modal-rr" style={{"overflow":"scroll"}}>
                <div className="modal-dialog tam50">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><b>Seleccione el tipo de reporte:</b></h4>
                            <button className="close" onClick={this.cerrarModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <h5><b>Reportes regulatorios</b></h5>
                                        {this.crearOpciones(this.state.lista1,"a")}
                                        <br/>
                                        <h5><b>Reportes de validacion</b></h5>
                                        {this.crearOpciones(this.state.lista2,"b")}
                                    </div>
                                    <div className="col-6">
                                        <h5><b>Reportes de acompañamiento</b></h5>
                                        {this.crearOpciones(this.state.lista3,"c")}
                                        <br/>
                                        <h5><b>Reportes para estudios tarifarios</b></h5>
                                        {this.crearOpciones(this.state.lista4,"d")}
                                    </div>
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
                                                <button onClick={this.enviarReporte} className="btn btn-primary">Generar</button>
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

export default ModalReportesRegulatorios;
