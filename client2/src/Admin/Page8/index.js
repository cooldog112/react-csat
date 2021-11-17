import React, {Component} from 'react';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';
import Chart4 from './Chart4';
import Chart5 from './Chart5';
import Chart6 from './Chart6';
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
const styles = theme => ({
    root: {
        width : '100%',
        minWidth : 1080,
        height : '100%',
        backgroundColor : '#eeeeee'
    },
    menu:{
        marginTop : 15,
        marginBottom : 15,
        display:'flex',
        justifyContent: 'center'
    },
    userTitle:{
        marginTop : 15,
        marginBottom : 15,
        justifyContent: 'center'
    },
    title: {
        marginBottom:15,
        flexGrow: 1,
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    paper:{
        marginTop:15,
        marginBottom:15,
        marginLeft:15,
        marginRight:15,
        padding:theme.spacing(2),
        textAlign:'center',
        color : theme.palette.text.secondary,
    },
});

class Page8 extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>
                                문답지 이상 유무 현황
                            </Typography>
                            <Chart1/>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>
                                1교시 현황
                            </Typography>
                            <Chart2/>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>
                                2교시 현황
                            </Typography>
                            <Chart3/>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>
                                3교시 현황
                            </Typography>
                            <Chart4/>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>
                                4교시 현황
                            </Typography>
                            <Chart5/>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>
                                5교시 현황
                            </Typography>
                            <Chart6/>
                        </Paper>
                    </Grid>
                </Grid>

            </div>
        );
    }
}
export default withStyles(styles)(Page8);