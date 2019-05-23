import React, {Component} from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import OceanTheme from 'fusioncharts/themes/fusioncharts.theme.ocean';
import ReactFC from 'react-fusioncharts';

Charts(FusionCharts);
OceanTheme(FusionCharts);

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            type : props.grafico,
            renderAt: "chart-container",
            width: '100%',
            height: '600',
            dataFormat: 'json',
            dataSource: {
                "chart": {
                    "bgColor" : "#F4F4F4",
                    "bgAlpha" : "100",
                    "baseFont": "Calibri",
                    "baseFontSize": "16",
                    'caption': props.titulo,
                    "palettecolors":"5d62b5,29c3be,f2726f",
                    "showPlotBorder": "0",
                    'numberPrefix': props.prefijo,
                    "formatNumberScale" : "0",
                    "exportEnabled": "1",
                    "usePlotGradientColor": props.grad
                },
                data:
                    props.chartData,

            },
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

export default Chart;
