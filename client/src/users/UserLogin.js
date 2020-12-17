import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core/styles";
import axios from 'axios';

const styles = theme =>({
    hidden : {
        display: 'none'
    },
    menu:{
        marginTop : 2,
        marginBottom : 2,
        display:'flex',
        justifyContent: 'center'
    },
    button:{
        fontSize: '1.0rem',
        justifyContent : 'center',
        width: '100px'
    }
});


class UserLogin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            account : '',
            password : '',
            open : false,
            isLogined : false,
            btn : 'LOGIN'
        }
    }
    login = () => {
        const url ='/auth/login'
        axios.post(url, this.state)
            .then(res =>{
                if(res.data){
                    this.props.userInfo(res.data)
                    this.setState({
                        isLogined : true,
                        btn : 'LOGOUT'
                    })    
                }else{
                    alert("LOGIN에 실패했습니다. 학교명 또는 비밀번호를 확인하세요")
                }
                
            })
            .catch(error=>{
                console.log(error)
            })
    }

    loginOpen = () => {
        if(this.state.isLogined){
            axios.get('/auth/logout')
                .then(res =>{
                    this.props.userInfo('')
                    this.setState({
                        isLogined : false,
                        btn : 'LOGIN'
                    })
                })
        }else{
            this.setState({
                open: true
            });
        }

    }
    loginClose = () => {
        this.setState({
            account : '',
            password : '',
            open : false
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.login()
        this.setState({
            account : '',
            password : '',
            open : false
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button id="LoginButton" color="inherit" onClick={this.loginOpen}>{this.state.btn}</Button>
                <Dialog  open={this.state.open} onClose={this.loginClose}>
                    <DialogTitle className={classes.menu} >로그인</DialogTitle>
                    <DialogContent >
                        <TextField className={classes.menu} label="학교명" type="text" name="account" variant="outlined" value={this.state.account} onChange={this.handleValueChange}/><br/>
                        <TextField className={classes.menu} label="비밀번호" type="password" name="password" variant="outlined" value={this.state.password} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions className={classes.menu}>
                        <Button className={classes.button} variant="contained" color="primary" onClick={this.handleFormSubmit}>로그인</Button>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={this.loginClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(UserLogin);