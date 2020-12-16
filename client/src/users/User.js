import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Table} from "@material-ui/core";

class User extends React.Component {
    render(){
        return (
            <TableRow>
                <TableCell>{this.props.user.id}</TableCell>
                <TableCell>{this.props.user.account}</TableCell>
                <TableCell>{this.props.user.testRoomNum}</TableCell>
                <TableCell>{this.props.user.applicantNum}</TableCell>
            </TableRow>
        )
    }
}


export default User;