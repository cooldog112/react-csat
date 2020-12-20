import React, {Component} from 'react';
import User from "./users/User";
import UserLogin from "./users/UserLogin";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import Report from "./reports/Report";
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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      user:'',
      report : '',
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      report:''
    });
    this.reportRefresh()
        .then(res => this.setState({report : res}))
        .catch(err => console.log(err));

  }
  reportRefresh = async () =>{
    const response = await fetch('/api/report/'+this.state.user.id);
    const body = await response.json();

    return body;
  }

  userInfo = (userData) =>{
    this.setState({
      user: userData
    })
    this.stateRefresh();
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
              <Typography variant="h5" className={classes.title}>
                2022 수능 시스템
              </Typography>
              <UserLogin userInfo = {this.userInfo}/>
            </Toolbar>
          </AppBar>
          <Typography variant="h5" className={classes.subTitle}>
            학교 정보
          </Typography>
          <Pager className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>번호</TableCell>
                  <TableCell className={classes.tableHead}>학교명</TableCell>
                  <TableCell className={classes.tableHead}>시험장 수</TableCell>
                  <TableCell className={classes.tableHead}>지원자 수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <User user={this.state.user}/>
              </TableBody>
            </Table>
          </Pager>
          <Typography variant="h5" className={classes.subTitle}>
            시험지 이상 유무 보고
          </Typography>
          <Pager className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>보고자 직위</TableCell>
                  <TableCell className={classes.tableHead}>보고자 이름</TableCell>
                  <TableCell className={classes.tableHead}>이상유무</TableCell>
                  <TableCell className={classes.tableHead}>기타사항</TableCell>
                  <TableCell className={classes.tableHead}>보고</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Report report={this.state.report}/>
              </TableBody>
            </Table>
          </Pager>
          <Typography variant="h5" className={classes.subTitle}>
            일반시험장 현황
          </Typography>
          <Pager className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>교시</TableCell>
                  <TableCell className={classes.tableHead}>지원자</TableCell>
                  <TableCell className={classes.tableHead}>응시자</TableCell>
                  <TableCell className={classes.tableHead}>결시자</TableCell>
                  <TableCell className={classes.tableHead}>보고</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <User user={this.state.user}/>
              </TableBody>
            </Table>
          </Pager>
        </div>
    );
  }
}


export default withStyles(styles)(App);