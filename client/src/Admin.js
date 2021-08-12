import React, {Component} from 'react';
import User from "./users/User";
import UserLogin from "./users/UserLogin";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import Report from "./reports/Report";
import Person from "./persons/Person";
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

import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

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
    }
})

class Admin extends Component {
    state={
        persons:''
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({customers: res}))
            .catch(err => console.log(err));
    }
    callApi = async () => {
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            2011 수능 시스템
                        </Typography>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Admin);