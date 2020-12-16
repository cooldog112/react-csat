import React, {Component} from 'react';
import User from "./users/User";
import UserLogin from "./users/UserLogin";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
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



const styles = theme => ({
  root: {
    width : '100%',
    minWidth : 1080
  },
  menu:{
    marginTop : 15,
    marginBottom : 15,
    display:'flex',
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
  tableHead:{
    fontSize: '1.0rem',
    justifyContent : 'center'
  }
})

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      user:'',
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      user:'',
      completed: 0,
      searchKeyword: ''
    });
    this.callApi()
        .then(res => this.setState({customers: res}))
        .catch(err => console.log(err));
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
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                2022 수능 시스템
              </Typography>
              <UserLogin />
            </Toolbar>
          </AppBar>
          <div className={classes.menu}>
            <CustomerAdd stateRefresh={this.stateRefresh}/>
          </div>
          <Pager className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>학교명</TableCell>
                  <TableCell>시험장 수</TableCell>
                  <TableCell>지원자 수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <User id = '1' account = '매천고' testRoomNum='20' applicantNum='400'/>
              </TableBody>
            </Table>
          </Pager>
        </div>
    );
  }
}


export default withStyles(styles)(App);