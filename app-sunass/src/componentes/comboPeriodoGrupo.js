import React, { Component } from 'react';

class ComboPeriodoGrupo extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataPeriodoGrupo : [],
            grupo : props.grupo,
            tipo: props.tipo
        }
    }

    componentDidUpdate(){
        if(this.state.tipo !== this.props.tipo && this.props.grupo!==""){
            this.props.vaciarPeriodo();
            this.setState({
                dataPeriodo: [],
                tipo : this.props.tipo
            });
            this.fetchDataPeriodoGrupo(this.props.grupo);
        }
        if(this.state.grupo !== this.props.grupo && this.props.tipo!==""){
            this.setState({
                grupo : this.props.grupo,
                dataPeriodo : []
            });
            this.fetchDataPeriodoGrupo(this.props.grupo);
        }
    }

    fetchDataPeriodoGrupo(grupoaux) {
        if(this.props.tipo!=="3"){                      //BORRAR DESPUES
            var stringRuta = "";
            if(this.props.tipo==="1"){
                stringRuta="variables";
            }
            if(this.props.tipo==="2"){
                stringRuta="indicadores";
            }
            const data ={
                grupo : this.props.grupo
            }
            fetch(this.props.hostname+"/APISunass/MainController/"+stringRuta+"/yearsGrupos",{
                method : 'POST',
                headers : {
                    'Accept' : '*/*',
                    'Content-Type' : 'application/json; charset=UTF-8',
                    'token' : this.props.token
                },
                body : JSON.stringify(data)
            })
            .then((response) =>{
                console.log(response); //SE MUESTRA LA RESPUESTA DE LA PETICION
                if(response.status === 404){
                    return [];
                }else{
                    return response.json()
                }
            })
            .then((result) => {
                console.log(result);
                this.setState({
                    dataPeriodo : result
                });
            })
        }else{                                          //BORRAR DESPUES
            this.setState({                             //BORRAR DESPUES
                dataPeriodo : ["2017","2018","2019"]    //BORRAR DESPUES
            });                                         //BORRAR DESPUES
        }
    }

    crearOpcionesPeriodoGrupo(){
        const objs = [];
        for(var i in this.state.dataPeriodo){
            objs.push(<option key={i+1} value={this.state.dataPeriodo[i]}>{this.state.dataPeriodo[i]}</option>)
        }
        return objs;
    }

    render(){
        return(
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text label-titulo" htmlFor="select-periodo">Periodo</label>
                </div>
                <select className="custom-select" id="select-periodo" value={this.props.periodo} onChange={this.props.onChange}>
                    <option key={0} value="" disabled>Seleccione periodo</option>
                    {this.crearOpcionesPeriodoGrupo()}
                </select>
            </div>
        )
    }
}

export default ComboPeriodoGrupo;
