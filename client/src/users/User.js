import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {Table} from "@material-ui/core";

class User extends React.Component {
    render(){
        return (
            <TableRow>
                {/*<TableCell>1</TableCell>*/}
                {/*<TableCell>매천고</TableCell>*/}
                {/*<TableCell>20</TableCell>*/}
                {/*<TableCell>400</TableCell>*/}
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.account}</TableCell>
                <TableCell>{this.props.testRoomNum}</TableCell>
                <TableCell>{this.props.applicantNum}</TableCell>
            </TableRow>
        )
    }
}


export default User;