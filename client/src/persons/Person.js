import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Table} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import PersonAdd from "./PersonAdd";



const styles = theme =>({
    hidden : {
        display: 'none'
    },
    menu:{
        fontSize : '1.5rem',
        textAlign : 'center',
        width : '15%',
        height : '30px'

    },
    menu2:{
        fontSize : '1.5rem',
        textAlign : 'center',
        width : '10%',
        height : '30px'

    },
    button:{
        fontSize: '1.0rem',
        justifyContent : 'center',
        width: '100px'
    }
});

class Person extends React.Component {

    render(){
        const { classes } = this.props;
        return (
            <TableRow >
                <TableCell className={classes.menu}>{this.props.person.period}</TableCell>
                <TableCell className={classes.menu}>{this.props.person.applicant}</TableCell>
                <TableCell className={classes.menu2}>{this.props.person.candidate}</TableCell>
                <TableCell className={classes.menu2}>{this.props.person.other}</TableCell>
                <TableCell className={classes.menu}>{this.props.person.absentee}</TableCell>
                <TableCell className={classes.menu}><PersonAdd stateRefresh={this.props.stateRefresh} id={this.props.id} person={this.props.person}/></TableCell>
            </TableRow>
        )
    }
}

export default withStyles(styles)(Person);
