import React, { Component } from 'react';

class ComboGrupo extends Component {

    constructor(props){
        super(props);
        this.state = {
            dataGrupo : []
        }
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(event){
        this.props.onChange(event);
        for(var i in this.state.dataGrupo){
            if(parseInt(event.target.value,10) === this.state.dataGrupo[i].codgrupo){
                this.props.onChange2(this.state.dataGrupo[i].dengrupo);
            }
        }
    }

    componentDidMount(){
        this.fetchDataGrupo();
    }

    fetchDataGrupo(){
        fetch(this.props.hostname+"/APISunass/MainController/getGrupos")
        .then((response) =>{
            //console.log(response); //SE MUESTRA LOS EPS QUE FETCHEAMOS
            if(response.status === 404){
                return [];
            }else{
                return response.json();
            }
        })
        .then((result) => {
            console.log(result);
            this.setState({
                dataGrupo : result
            });
        })
    }

    crearOpcionesGrupo(){
        const objs = [];
        for(var i in this.state.dataGrupo){
            objs.push(<option key={i+1} value={this.state.dataGrupo[i].codgrupo}>{this.state.dataGrupo[i].dengrupo}</option>)
        }
        return objs;
    }

    render(){
        return(
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text label-titulo" htmlFor="select-eps">Grupo</label>
                </div>
                <select className="custom-select" id="select-eps" value={this.props.grupo} onChange={this.onSelect}>
                    <option key={0} value={""} disabled>Seleccione grupo</option>
                    {this.crearOpcionesGrupo()}
                </select>
            </div>
        )
    }
}

export default ComboGrupo;
