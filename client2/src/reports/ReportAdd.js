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

class ReportAdd extends  React.Component{

    constructor(props) {
        super(props);
        this.state = {
          position : '',
          name : '',
          error : '',
          content : '',
          open : false
        }
    }

    insertReport(id){
        // const url ='/api/customers/' + id;
        // fetch(url, {
        //     method : 'DELETE'
        // });
        // this.props.stateRefresh();
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

    updateReport = () => {
        const url ='/report/add'
        let report = {
            id : this.props.id,
            position : this.state.position,
            name : this.state.name,
            error : this.state.error,
            content : this.state.content
        }
        axios.post(url, report)
            .then(res =>{
                if(res){
                    alert('문답지 이상유무 보고 완료')
                    this.handleClose()
                    this.props.stateRefresh()

                }else{
                    alert('문답지 이상유무 보고에 실패했습니다.')
                }

            })
            .catch(error=>{
                console.log(error)
            })

    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>문답지 보고</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>문답지 이상유무 보고</DialogTitle>
                    <DialogContent>
                        <form autoComplete="off">
                            {/*<TextField label="보고자 직위" type="text" name="position" value={this.state.report.position} onChange={this.handleValueChange}/><br/>*/}
                            <TextField label="보고자 직위" type="text" name="position" value={this.state.position}onChange={this.handleValueChange}/><br/>
                            <TextField label="보고자 이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
                            <br/>
                            <FormLabel component="legend">이상유무</FormLabel>
                            <RadioGroup aria-label="이상유무" name="error" value={this.state.error} onChange={this.handleValueChange}>
                                <FormControlLabel value="이상없음" control={<Radio />} label="이상없음" />
                                <FormControlLabel value="이상있음" control={<Radio />} label="이상있음" />
                            </RadioGroup>
                            <TextField label="특이사항" type="text" name="content" value={this.state.content} onChange={this.handleValueChange}/>
                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e)=>{this.updateReport()}}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(ReportAdd);