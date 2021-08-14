import React, {Component} from 'react';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pager from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 12,
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
        fontSize: '1rem',
        justifyContent : 'center',
        textAlign : 'center',
        width : '10%',
        height: '15px',
        backgroundColor : '#f5fffa'
    },
    tableContent:{
        fontSize: '1rem',
        justifyContent : 'center',
        textAlign : 'center',
        width : '10%',
        height: '10px',
    }
})
class Page5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schoolPersons:''
        }
        this.schoolPersonRefresh()
            .then(res => this.setState({schoolPersons : res}))
            .catch(err=>console.log(err));

    }
    schoolPersonRefresh = async () => {
        const response = await fetch('/api/schoolPerson4');
        const body = await response.json();
        return body;
    }
    stateRefresh = () =>{
        this.schoolPersonRefresh()
            .then(res => this.setState({schoolPersons : res}))
            .catch(err=>console.log(err));
    }
    componentDidMount() {
        // this.interval = setInterval(this.stateRefresh, 1000);
    }
    render(){
        const {classes} = this.props;
        return (
            <div>
                <Pager className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <StyledTableRow>
                                <TableCell className={classes.tableHead}>번호</TableCell>
                                <TableCell className={classes.tableHead}>시험장</TableCell>
                                <TableCell className={classes.tableHead}>지원자</TableCell>
                                <TableCell className={classes.tableHead}>응시자</TableCell>
                                <TableCell className={classes.tableHead}>결시자</TableCell>
                                <TableCell className={classes.tableHead}>결시율</TableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.schoolPersons ? this.state.schoolPersons.map((c) => {return <StyledTableRow>
                                <StyledTableCell className={classes.tableContent}>{c.user_id}</StyledTableCell>
                                <StyledTableCell className={classes.tableContent}>{c.account}</StyledTableCell>
                                <StyledTableCell className={classes.tableContent}>{c.applicant}</StyledTableCell>
                                <StyledTableCell className={classes.tableContent}>{c.candidate}</StyledTableCell>
                                <StyledTableCell className={classes.tableContent}>{c.absentee}</StyledTableCell>
                                <StyledTableCell className={classes.tableContent}>{c.applicant? (c.absentee / c.applicant * 100).toFixed(2) : '0.00'}%</StyledTableCell>
                            </StyledTableRow>
                            }) : ''}
                        </TableBody>
                    </Table>
                </Pager>
            </div>
        )
    }
}

export default withStyles(styles)(Page5);