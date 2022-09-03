import React, {useEffect, useState} from 'react';
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
import {checkUndefined, convertDateInEST} from '../../factory';

import './admin-speaker-opportunity.styles.scss';

const AdminSpeakerOpportunityComponent = ({speakerOpportunity}) => {
    const columns = [
        { id: '_id', label: '#', minWidth: 20, format : (i) => i + 1 },
        {
          id: 'firstName',
          label: 'First Name',
          minWidth: 100,
          align: 'left',
        },
        {
            id: 'lastName',
            label: 'Last Name',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'email',
            label: 'Email',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'phone',
            label: 'Phone_No:',
            minWidth: 120,
            align: 'left',
        },
        {
            id: 'fax',
            label: 'Fax',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'jobTitle',
            label: 'Job',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'company',
            label: 'Company',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'industries',
            label: 'Industries',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'createdAt',
            label: 'Created_At',
            minWidth: 100,
            align: 'left',
            format: (value) => {
                return convertDateInEST(value)
            }
        }
    ];

    const speakerOpportunities = checkUndefined(speakerOpportunity);

    const [rows, setRows] = useState(speakerOpportunities);

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
            setRows(speakerOpportunities.filter((data) => {
                return Object.values(data)
                    .join(" ")
                    .toLowerCase()
                    .includes(value.toLowerCase());
            })); 
        }
        else {
            setRows(speakerOpportunities);
        }
    }

    useEffect(() => {
        setRows(speakerOpportunity);
    },[speakerOpportunity]);

    return (
        <Row md = {8} xs = {8} style={{paddingBottom: '30px'}}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} id= 'speaker-opportunity-list'>
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
                                    let value;
                                        if(column.id === '_id'){
                                            value = ind;
                                        }
                                        else if(column.id === 'action' || column.id === 'remove'){
                                            value = row;
                                        }
                                        else{
                                            value = row[column.id];
                                        }
                                    return (
                                        <TableCell key={column.id} align={column.align}
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
                                <TableCell colSpan={4}>
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

export default AdminSpeakerOpportunityComponent;