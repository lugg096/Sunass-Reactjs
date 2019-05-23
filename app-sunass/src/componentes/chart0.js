import React, {Component} from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import ReactFC from 'react-fusioncharts';

Charts(FusionCharts);
OceanTheme(FusionCharts);

class Chart0 extends Component{
    constructor(props){
        super(props);
        this.state = {
            type : props.type,
            renderAt: "chart-container",
            width: '100%',
            height: '600',
            dataFormat: 'json',
            dataSource : props.dataSource
        };
        this.handleChangeTipo = this.handleChangeTipo.bind(this);
    }

    handleChangeTipo(tipo){
        this.setState({
            type : tipo
        });
    }

    static defaultProps = {
        displayTitle : true,
        textTitle : "Titulo",
        displayLegend : true,
        legendPosition : 'right'
    }

    render(){
        return (
          <div id="grafEst">
              <ReactFC {...this.state} />
          </div>
        )
    }
}

export default Chart0;
