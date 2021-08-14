import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Table} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import ReportAdd from "./ReportAdd";

const styles = theme =>({
    hidden : {
        display: 'none'
    },
    menu:{
        fontSize : '1.5rem',
        textAlign : 'center',
        width : '20%',
        height : '30px'

    },
    button:{
        fontSize: '1.0rem',
        justifyContent : 'center',
        width: '100px'
    }
});
class Report extends React.Component {
    render(){
        const { classes } = this.props;
        return (
            <TableRow>
                <TableCell className={classes.menu}>{this.props.report.position}</TableCell>
                <TableCell className={classes.menu}>{this.props.report.name}</TableCell>
                <TableCell className={classes.menu}>{this.props.report.error}</TableCell>
                <TableCell className={classes.menu}>{this.props.report.content}</TableCell>
                <TableCell className={classes.menu}><ReportAdd stateRefresh={this.props.stateRefresh} id={this.props.id}/></TableCell>
            </TableRow>
        )
    }
}



export default withStyles(styles)(Report);