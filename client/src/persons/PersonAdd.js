import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from "axios";


const styles = theme =>({
    hidden : {
        display: 'none'
    }
});

class PersonAdd extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
          period : '',
          applicant : '',
          candidate : '',
          absentee : '',
          open : false
        }
    }

    handleClickOpen = () => {
        if(this.props.id == null){
            this.setState({
                open : false
            });
        }else{
            this.setState({
                open: true
            });
        }

    }
    handleClose = () => {
        this.setState({
            open : false
        })
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    updatePerson = () => {
        const url ='/person/add'
        let person = {
            id : this.props.id,
            period : this.props.person.period,
            applicant : this.state.applicant,
            candidate : this.state.candidate,
            other : this.state.other,
            absentee : this.state.absentee
        }
        if(Number(this.props.person.applicant) === Number(person.candidate)+Number(person.other)+Number(person.absentee)){
            axios.post(url, person)
                .then(res =>{
                    if(res){
                        alert(person.period+'교시 응시자 보고 완료')
                        this.handleClose()
                        this.props.stateRefresh()
                    }else{
                        alert('응시자 보고에 실패했습니다.')
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
        }else{
            alert("지원자수와 일반시험실 응시자 + 별도시험실 응시자 + 결시자 수가 일치하지 않습니다.");
        }


    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>응시자 보고</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>수험생 보고</DialogTitle>
                    <DialogContent>
                        <form autoComplete="off">
                            {/*<TextField label="보고자 직위" type="text" name="position" value={this.state.report.position} onChange={this.handleValueChange}/><br/>*/}
                            {/*<TextField label="지원자" type="number" name="applicant" value={this.state.applicant} onChange={this.handleValueChange}/><br/>*/}
                            <TextField label="일반시험실 응시자" type="number" name="candidate" value={this.state.candidate} onChange={this.handleValueChange}/><br/>
                            <TextField label="별도시험실 응시자" type="number" name="other" value={this.state.other} onChange={this.handleValueChange}/><br/>
                            <TextField label="결시자" type="number" name="absentee" value={this.state.absentee} onChange={this.handleValueChange}/><br/>
                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e)=>{this.updatePerson()}}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(PersonAdd);