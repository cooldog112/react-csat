import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import TextField from "@material-ui/core/TextField";
import {withStyles} from "@material-ui/core/styles";

const styles = theme =>({
    hidden : {
        display: 'none'
    }
});

class CustomerDelete extends  React.Component{

    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({
            open: true
        });
    }
    handleClose = () => {
        this.setState({
            open : false
        })
    }

    render() {
        const { classes } = this.props;
        return(
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>보고</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle onClose={this.handleClose}>문답지 이상유무 보고</DialogTitle>


                    <DialogContent>
                        <form autoComplete="off">
                            <TextField label="보고자 직위" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                            <TextField label="보고자 이름" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                            <TextField label="이상유무" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                            <TextField label="특이사항" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/>
                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e)=>{this.deleteCustomer(this.props.id)}}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(CustomerDelete);