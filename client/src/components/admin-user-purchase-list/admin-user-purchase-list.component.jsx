import React, {useState} from "react";
// import { Table } from 'react-bootstrap';
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

import './admin-user-purchase-list.style.scss';

const columns = [
    { id: 's_no', label: '#', minWidth: 20 },
    {
      id: 'email',
      label: 'Email',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'description',
      label: 'Product',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'quantity',
      label: 'Qty',
      align: 'center',
      minWidth: 20
    },
    { id: 'amount_total', label: 'Price', minWidth: 50, format : (value) => '$'+(parseInt(value) / 100) },
    { id: 'date', label: 'Date', minWidth: 120 },
    { id: 'time', label: 'Time', minWidth: 150 },
    { id: 'status', label: 'Status', minWidth: 120, format: (value) => (value === 'Active' ? "Un-delivered": "Delivered")},

];

const AdminUserPurchaseList = ({data}) => {
    console.log(data);
    const [rows, setRows] = useState(data);

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
            setRows(data.filter((productList) => {
                return Object.values(productList)
                    .join(" ")
                    .toLowerCase()
                    .includes(value.toLowerCase());
            })); 
        }
        else {
            setRows(data);
        }
    }
    return(
        <Row md = {8} xs = {8}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} id= 'user-list-paper'>
                <Row>
                    <Col md={10}>
                        <h1>User Purchase List</h1>
                    </Col>
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
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth, fontWeight: 800 }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.length !== 0 ?
                                rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.s_no}>
                                    {columns.map((column) => {
                                    const value = row[column.id];
                                    
                                    return (
                                        <TableCell key={column.id} align={column.align}
                                        style = {value === 'Active' ? {color: 'red'}:{color: ''}}
                                        >
                                            {
                                                column.format
                                                ? column.format(value)
                                                : value
                                            }
                                        </TableCell>
                                    )
                                    })}
                                </TableRow>
                                );
                            }) :
                            <TableRow>
                                <TableCell colSpan={8}>
                                    No Record(s) Found.
                                </TableCell>
                            </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Row>
    )
}

export default AdminUserPurchaseList;