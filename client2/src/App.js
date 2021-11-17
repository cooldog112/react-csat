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
    justifyContent: 'center'
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
    width : '15%',
    height: '25px',
    backgroundColor : '#f5fffa'
  },
  tableHead2:{
    fontSize: '1.5rem',
    justifyContent : 'center',
    textAlign : 'center',
    width : '10%',
    height: '25px',
    backgroundColor : '#f5fffa'
  }
})

class App extends Component {
  state={
    persons:''
  }

  constructor(props) {
    super(props);
    this.loginCheck()
        .then(res => this.setState({user : res}))
        .catch(err => console.log(err));
    this.reportRefresh()
        .then(res => this.setState({report : res}))
        .catch(err => console.log(err));
    this.personRefresh()
        .then(res => this.setState({persons : res}))
        .catch(err => console.log(err));
    this.state = {
      customers: '',
      user:'',
      report : '',
      persons : '',
      completed: 0,
      searchKeyword: ''
    }
  }

  stateRefresh = () => {
    this.setState({
      report:'',
      person:''
    });
    this.reportRefresh()
        .then(res => this.setState({report : res}))
        .catch(err => console.log(err));
    this.personRefresh()
        .then(res => this.setState({persons : res}))
        .catch(err => console.log(err));

  }
  loginCheck = async () => {
    const response = await fetch('/userInfo');
    const body = await response.json();
    return body;
  }

  reportRefresh = async () =>{
    const response = await fetch('/api/report/');
    const body = await response.json();

    return body;
  }
  personRefresh = async () => {
    const response = await fetch('/api/person/');
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
                2022. 수능 시험장 현황 보고 시스템
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
                  <TableCell className={classes.tableHead}>시험실 수</TableCell>
                  <TableCell className={classes.tableHead}>지원자 수</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <User user={this.state.user}/>
              </TableBody>
            </Table>
          </Pager>
          <Typography variant="h5" className={classes.subTitle}>
            문답지  이상 유무 보고
          </Typography>
          <Pager className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>보고자 직위</TableCell>
                  <TableCell className={classes.tableHead}>보고자 이름</TableCell>
                  <TableCell className={classes.tableHead}>이상유무</TableCell>
                  <TableCell className={classes.tableHead}>기타사항</TableCell>
                  <TableCell className={classes.tableHead}>비  고</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Report stateRefresh={this.stateRefresh} report={this.state.report} id={this.state.user.id}/>
              </TableBody>
            </Table>
          </Pager>
          <Typography variant="h5" className={classes.subTitle}>
            시험실 현황
          </Typography>
          <Pager className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead} rowSpan={2}>교시</TableCell>
                  <TableCell className={classes.tableHead} rowSpan={2}>지원자</TableCell>
                  <TableCell className={classes.tableHead} colSpan={2}>응시자</TableCell>
                  <TableCell className={classes.tableHead} rowSpan={2}>결시자</TableCell>
                  <TableCell className={classes.tableHead} rowSpan={2}>보고</TableCell>
                  {/*<TableCell className={classes.tableHead}></TableCell>*/}
                </TableRow>
                <TableRow>
                  {/*<TableCell className={classes.tableHead}>교시</TableCell>*/}
                  {/*<TableCell className={classes.tableHead}>지원자</TableCell>*/}
                  <TableCell className={classes.tableHead}>일반시험실</TableCell>
                  <TableCell className={classes.tableHead}>별도시험실</TableCell>
                  {/*<TableCell className={classes.tableHead}>결시자</TableCell>*/}
                  {/*<TableCell className={classes.tableHead}>보고</TableCell>*/}
                </TableRow>
              </TableHead>
              <TableBody>
                {/*<Person person={this.state.person}/>*/}
                {this.state.persons ? this.state.persons.map((c) => {  return <Person key={c.id} person={c} id={this.state.user.id} stateRefresh={this.stateRefresh}/>}) : ''}
              </TableBody>
            </Table>
          </Pager>
        </div>
    );
  }
}

export default withStyles(styles)(App);
