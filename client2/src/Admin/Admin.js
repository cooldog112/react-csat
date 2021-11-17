import React, {Component} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Page6 from './Page6';
import Page7 from './Page7';
import {BrowserRouter, Route, Link} from "react-router-dom";


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
        fontSize : 20,
        marginLeft : 30,
        marginRight: 30,
        justifyContent: 'center',
        textDecoration: 'none',
        color: '#eeeeee',

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
        persons:'',
        location : 1
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
        let {location} = this.state;
        const {classes} = this.props;
        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Typography className={classes.title} variant="h4" noWrap>
                            &nbsp;&nbsp;2022 수능 시스템 관리자 페이지
                        </Typography>
                        <Toolbar  >
                            <Link to='/Page1' className={classes.userTitle}>문답지 이상 유무 현황</Link>
                            <Link to='/Page2' className={classes.userTitle}>1교시 현황</Link>
                            <Link to='/Page3' className={classes.userTitle}>2교시 현황</Link>
                            <Link to='/Page4' className={classes.userTitle}>3교시 현황</Link>
                            <Link to='/Page5' className={classes.userTitle}>4교시 현황</Link>
                            <Link to='/Page6' className={classes.userTitle}>5교시 현황</Link>
                            <Link to='/Page7' className={classes.userTitle}>대구 현황 종합</Link>
                        </Toolbar>
                    </AppBar>
                </div>
                <div>
                    <Route path='/Page1' component={Page1}/>
                    <Route path='/Page2' component={Page2}/>
                    <Route path='/Page3' component={Page3}/>
                    <Route path='/Page4' component={Page4}/>
                    <Route path='/Page5' component={Page5}/>
                    <Route path='/Page6' component={Page6}/>
                    <Route path='/Page7' component={Page7}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default withStyles(styles)(Admin);
