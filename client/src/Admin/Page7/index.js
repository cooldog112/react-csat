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
    },
    importContent:{
        fontSize: '1.2rem',
        justifyContent : 'center',
        textAlign : 'center',
        backgroundColor:'#ffdab9',
        width : '10%',
        height: '10px',
    }
})
class Page7 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total:''
        }
        this.totalRefresh()
            .then(res => this.setState({total : res}))
            .catch(err=>console.log(err));

    }
    totalRefresh = async () => {
        const response = await fetch('/api/total');
        const body = await response.json();
        return body;
    }
    stateRefresh = () =>{
        this.totalRefresh()
            .then(res => this.setState({total : res}))
            .catch(err=>console.log(err));
    }
    componentDidMount() {
        this.interval = setInterval(this.stateRefresh, 1000);
    }
    render(){
        const {classes} = this.props;
        return (
            <div>
                <Pager className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <StyledTableRow>
                                <TableCell className={classes.tableHead}>연도</TableCell>
                                <TableCell className={classes.tableHead}>교시</TableCell>
                                <TableCell className={classes.tableHead}>지원자수</TableCell>
                                <TableCell className={classes.tableHead}>응시자수</TableCell>
                                <TableCell className={classes.tableHead}>결시자수</TableCell>
                                <TableCell className={classes.tableHead}>응시율</TableCell>
                                <TableCell className={classes.tableHead}>결시율</TableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.total ? this.state.total.map((c) => {
                                if(c.year == 2022){
                                    return <StyledTableRow>
                                        <StyledTableCell className={classes.importContent}>{c.year}</StyledTableCell>
                                        <StyledTableCell className={classes.importContent}>{c.period}</StyledTableCell>
                                        <StyledTableCell className={classes.importContent}>{c.applicant}</StyledTableCell>
                                        <StyledTableCell className={classes.importContent}>{c.candidate}</StyledTableCell>
                                        <StyledTableCell className={classes.importContent}>{c.absentee}</StyledTableCell>
                                        <StyledTableCell className={classes.importContent}>{c.applicant? (c.candidate / c.applicant * 100).toFixed(2) : '0.00'}%</StyledTableCell>
                                        <StyledTableCell className={classes.importContent}>{c.applicant? (c.absentee / c.applicant * 100).toFixed(2) : '0.00'}%</StyledTableCell>
                                    </StyledTableRow>
                                }else{
                                    return <StyledTableRow>
                                        <StyledTableCell className={classes.tableContent}>{c.year}</StyledTableCell>
                                        <StyledTableCell className={classes.tableContent}>{c.period}</StyledTableCell>
                                        <StyledTableCell className={classes.tableContent}>{c.applicant}</StyledTableCell>
                                        <StyledTableCell className={classes.tableContent}>{c.candidate}</StyledTableCell>
                                        <StyledTableCell className={classes.tableContent}>{c.absentee}</StyledTableCell>
                                        <StyledTableCell className={classes.tableContent}>{c.applicant? (c.candidate / c.applicant * 100).toFixed(2) : '0.00'}%</StyledTableCell>
                                        <StyledTableCell className={classes.tableContent}>{c.applicant? (c.absentee / c.applicant * 100).toFixed(2) : '0.00'}%</StyledTableCell>
                                    </StyledTableRow>
                                }
                            }) : ''}
                        </TableBody>
                    </Table>
                </Pager>
            </div>
        )
    }
}

export default withStyles(styles)(Page7);