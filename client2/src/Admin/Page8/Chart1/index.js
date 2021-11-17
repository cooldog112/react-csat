import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";


class Chart1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: ['0','0','0'],

            options: {
                labels: ['미제출', '이상없음', '이상있음'],
                chart: {
                    type: 'donut',
                },
                theme:{
                    palette:'palette1'
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
        const response = await fetch('/api/reportChart');
        const body = await response.json();
        const series = [body[0].cnt, body[1].cnt, body[2].cnt];
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
export default Chart1;