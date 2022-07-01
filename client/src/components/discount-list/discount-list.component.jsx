import React, {useState, useEffect} from 'react';
import { Row, Col } from 'react-bootstrap';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormInput from '../form-input/form-input.component.jsx';
import {checkUndefined, srvTime, currentDateAndTimeInIST} from '../../factory';
import './discount-list.styles.scss';
import { VapingRoomsRounded } from '@mui/icons-material';

const DiscountListComponent = ({allDiscount, deleteDiscount, updateDiscount}) => {

    const columns = [
        { id: 'id', label: '#', minWidth: 20, format : (i) => i + 1 },
        {
          id: 'name',
          label: 'Name',
          minWidth: 150,
          align: 'left',
        },
        {
          id: 'type',
          label: 'Type',
          minWidth: 20,
          align: 'left',
        },
        {
          id: 'value',
          label: 'Value',
          align: 'center',
          minWidth: 120
        },
        { id: 'createdAt', label: 'Created_At', minWidth: 120, format: (value) => {
            const date = currentDateAndTimeInIST(new Date(value));
            return date;
        }},
        { id: 'validity', label: 'Validity', minWidth: 120, format: (value) => {
            return value > 1 ? value + ' hrs': value + ' hr';
        }},
        { id: 'status', label: 'Status', minWidth: 150, format: (value) => {
            var dbDate = new Date(value.createdAt);
            dbDate.setHours(dbDate.getHours() + value.validity);
            var currentServerDateAndTime = srvTime();
            currentServerDateAndTime = new Date(currentServerDateAndTime);
            console.log(dbDate);
            console.log(currentServerDateAndTime);
            if(currentServerDateAndTime <= dbDate) {
                return React.createElement("p",{style: {color: 'green'}}, "Active");
            }
            else{
                return React.createElement("p", {style: {color: 'red'}}, "Expired");
            }
        } },
        { id: 'action', label: 'Action', minWidth: 50, format : (value) => {
            return React.createElement("i",{className: 'fa fa-pencil-square-o fa-lg onHover', 'aria-hidden': 'true', onClick: () => updateDiscount(value)})
        }
        
        },
        { id: 'remove', minWidth: 50, format: (value) => React.createElement('i',{className: 'fa fa-times fa-lg onHover', 'aria-hidden': 'true', onClick: () => deleteDiscount(value)})}
    
    ];

    const discountList = checkUndefined(allDiscount.discount);

    const [rows, setRows] = useState(discountList);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // To change Pages
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // To change Rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [search, setSearch] = useState('');
    const handleSearch = (event) => {
        const {value} = event.target;
        setSearch(value);
        if(value !== ""){
            setRows(discountList.filter((discount) => {
                return Object.values(discount)
                    .join(" ")
                    .toLowerCase()
                    .includes(value.toLowerCase());
            })); 
        }
        else {
            setRows(discountList);
        }
    }

    useEffect(() => {
        setRows(allDiscount.discount);
    },[allDiscount]);

    return(
        <Row md = {8} xs = {8}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} id= 'discount-list-paper'>
                <Row>
                    <Col md = {2} className="search-input">
                        <FormInput
                            name="search"
                            label="Search"
                            value={search}
                            onChange={handleSearch}
                            autoComplete="off"
                        />
                    </Col>
                </Row>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {
                                columns.map((column, index) =>{
                                    return (
                                       <TableCell
                                       key={index + 1}
                                       align={column.align}
                                       style={{ minWidth: column.minWidth, fontWeight: 800 }}
                                       >
                                       {column.label}
                                       </TableCell>
                                   )
                                })
                            }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows !== null && rows.length > 0 ?
                                rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, ind) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={ind + 1}>
                                    {columns.map((column) => {
                                    // const value = column.id === 'id' ? ind : row[column.id];
                                    let value;
                                        if(column.id === 'id'){
                                            value = ind;
                                        }
                                        else if(column.id === 'action' || column.id === 'remove' || column.id === 'status'){
                                            value = row;
                                        }
                                        else{
                                            value = row[column.id];
                                        }
                                    return (
                                        <TableCell key={column.id} align={column.align}
                                        style = {value === 'Active' ? {color: 'green'}:{color: ''}}
                                        >
                                            {
                                                column.format ? column.format(value): value
                                            }
                                        </TableCell>
                                    )
                                    })}
                                </TableRow>
                                );
                            }) :
                            <TableRow>
                                <TableCell colSpan={6}>
                                    No Record(s) Found.
                                </TableCell>
                            </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows !== null ? rows.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Row>
    );
}

export default DiscountListComponent;