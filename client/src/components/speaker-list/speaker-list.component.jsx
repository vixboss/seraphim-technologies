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
import {checkUndefined} from '../../factory';

const SpeakerListComponent = ({speakerList, deleteSpeaker, updateTitle}) => {
    const columns = [
        { id: '_id', label: '#', minWidth: 20, format : (i) => i + 1 },
        {
          id: 'title',
          label: 'Speaker Name',
          minWidth: 150,
          align: 'left',
        },
        {
            id: 'url',
            label: 'Image Url',
            minWidth: 100,
            align: 'left'
          },
        
        { id: 'action', label: 'Action', minWidth: 50, format : (value) => {
            return React.createElement("i",{className: 'fa fa-pencil-square-o fa-lg onHover', 'aria-hidden': 'true', onClick: () => updateTitle(value)})
        }
        
        },
        { id: 'remove', minWidth: 50, format: (value) => React.createElement('i',{className: 'fa fa-times fa-lg onHover', 'aria-hidden': 'true', onClick: () => deleteSpeaker(value)})}
    
    ];

    const speakersList = checkUndefined(speakerList);

    const [rows, setRows] = useState(speakersList);

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
            setRows(speakersList.filter((data) => {
                return Object.values(data)
                    .join(" ")
                    .toLowerCase()
                    .includes(value.toLowerCase());
            })); 
        }
        else {
            setRows(speakersList);
        }
    }

    useEffect(() => {
        setRows(speakerList);
    },[speakerList]);

    return(
        <Row md = {8} xs = {8} style={{paddingBottom: '30px'}} className = 'm-l-r-auto'>
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

export default SpeakerListComponent;