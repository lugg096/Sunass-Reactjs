import React, { Component } from 'react';

class ComboLocal extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataLocal : [],
            eps : props.eps
        }
    }

    componentDidUpdate(){
        if(this.state.eps !== this.props.eps){
            this.setState({
                dataLocal : [],
                eps : this.props.eps
            });
            this.fetchDataLocal(this.props.eps);
        }
    }

    fetchDataLocal(epsaux){
        fetch(this.props.hostname+"/APISunass/MainController/getLocalidades/?eps="+epsaux)
        .then((response) =>{
            //console.log(response); //SE MUESTRA LA RESPUESTA DE LA PETICION
            if(response.status === 404){
                return [];
            }else{
                return response.json()
            }
        })
        .then((result) => {
            console.log(result);
            this.setState({
                dataLocal : result
            });
        })
    }

    crearOpcionesLocal(){
        const objs = [];
        for(var i in this.state.dataLocal){
            objs.push(<option key={i+2} value={this.state.dataLocal[i].codlocacion}>{this.state.dataLocal[i].denlocacion}</option>)
        }
        return objs;
    }

    render(){
        return(
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text label-titulo" htmlFor="select-local">Localidad</label>
                </div>
                <select className="custom-select" id="select-local" value={this.props.local} onChange={this.props.onChange}>
                    <option key={0} value="" disabled>Seleccione localidad</option>
                    <option key={1} value="-1">TODAS</option>
                    {this.crearOpcionesLocal()}
                </select>
            </div>
        )
    }
}

export default ComboLocal;
