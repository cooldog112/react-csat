import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Table} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";


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

class User extends React.Component {

    render(){
        const { classes } = this.props;
        return (
            <TableRow >
                <TableCell className={classes.menu}>{this.props.user.id}</TableCell>
                <TableCell className={classes.menu}>{this.props.user.account}</TableCell>
                <TableCell className={classes.menu}>{this.props.user.testRoomNum}</TableCell>
                <TableCell className={classes.menu}>{this.props.user.applicantNum}</TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(User);
