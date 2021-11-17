import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";


class Chart2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: ['0','0'],
            options: {
                labels: ['응시자', '결시자'],
                chart: {
                    type: 'donut',
                },
                theme:{
                    palette:'palette6'
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'top'
                        }
                    }
                }],
                plotOptions: {
                    pie: {
                        donut: {
                            labels:{
                                show:true,
                                name:{
                                    fontSize: 40
                                },
                                value:{
                                    fontSize: 40,
                                    offsetY: 30
                                }
                            },
                            size: '65%'
                        }
                    }
                }
            },
        };
        this.reportRefresh()
            .then(res => this.setState({series : res}))
            .catch(err=>console.log(err));

    }

    reportRefresh = async () =>{
        const response = await fetch('/api/personChart/5');
        const body = await response.json();
        const series = [body[0].candidate, body[0].absentee];
        return series;
    }
    stateRefresh=()=>{
        this.reportRefresh()
            .then(res => this.setState({series : res}))
            .catch(err=>console.log(err));

    }
    componentDidMount() {
        this.interval = setInterval(this.stateRefresh, 1000);
    }

    render() {
        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
            </div>
        );
    }
}
export default Chart2;