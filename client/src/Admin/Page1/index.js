import React, {Component} from 'react';
import Pager from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

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
    paper:{
        marginLeft: 18,
        marginRight: 18,
        marginTop : 18,
    },
    progress:{
        margin: theme.spacing(1) * 2
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    subTitle:{
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        marginLeft : 40,
        marginTop : 20,
        marginBottom : 20
    },
    tableHead:{
        fontSize: '1.5rem',
        justifyContent : 'center',
        textAlign : 'center',
        width : '20%',
        height: '25px',
        backgroundColor : '#f5fffa'
    },
    check:{
        marginLeft: 5,
        marginRight: 5,
        marginBottom:5,
        marginTop:5,
        width : '11%',
        height : '100px',
        backgroundColor : '#a8daf9',
        fontSize : '1.5rem'
    },
    checked:{
        marginLeft: 5,
        marginRight: 5,
        marginBottom:5,
        marginTop:5,
        width : '11%',
        height : '100px',
        backgroundColor : '#CA6573',
        fontSize : '1.5rem'
    },
    none:{
        marginLeft: 5,
        marginRight: 5,
        marginBottom:5,
        marginTop:5,
        width : '11%',
        height : '100px',
        backgroundColor : '#eeeeee',
        fontSize : '1.5rem'
    }
})


class Page1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            schoolReports:''
        }
        this.schoolReportRefresh()
            .then(res => this.setState({schoolReports : res}))
            .catch(err=>console.log(err));
    }

    schoolReportRefresh = async () =>{
        const response = await fetch('/api/schoolReport');
        const body = await response.json();
        return body;
    }
    stateRefresh = () => {
        this.schoolReportRefresh()
            .then(res => this.setState({schoolReports : res}))
            .catch(err=>console.log(err));
    }
    componentDidMount() {
        this.interval = setInterval(this.stateRefresh, 1000);
    }

    render(){
        const {classes} = this.props;

        return (
            <div>
                <Pager className={classes.paper}>
                    {this.state.schoolReports ? this.state.schoolReports.map((c) => {
                        if(c.error == '이상없음'){
                            return <button className={classes.check}>{c.account}</button>;
                        }else if(c.error =='이상있음'){
                            return <button className={classes.checked}>{c.account}</button>;
                        }else{
                            return <button className={classes.none}>{c.account}</button>;
                        }

                    }) : ''}
                </Pager>
            </div>
        )
    }
}

export default withStyles(styles)(Page1);