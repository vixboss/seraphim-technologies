import * as React from 'react';
import { connect } from 'react-redux';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Tooltip from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import {Row, Col} from 'react-bootstrap';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';


import FormInput from '../form-input/form-input.component.jsx';
import AdvancedSearch from '../advanced-search/advanced-search.component';
import ExportUserPurchaseExcel from '../user-purchase-export-to-excel/user-purchase-export-to-excel.component.jsx';

import { convertDateAndTimeInEST } from './../../factory.js';

import { updateUserPurchaseDeliveryStatusStart } from '../../redux/user-purchase/user-purchase.action';

import './admin-user-purchase-list.style.scss';

const RowsOfTable = (props) => {
  const { row, handleDeliveryStatus } = props;

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={row.status === 'Delivered' ? {
        background: 'rgb(110,249,66)',
        background: 'linear-gradient(90deg, rgba(110,249,66,0.47942927170868344) 100%, rgba(2,0,36,1) 100%, rgba(0,212,255,1) 100%)'}: null}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell >{row.email}</TableCell>
        <TableCell >{row.order_id}</TableCell>
        <TableCell >{convertDateAndTimeInEST(row.createdAt)}</TableCell>
        <TableCell align="right">{row.total_amount}</TableCell>
        <TableCell align="right">{row.gross_amount}</TableCell>
        <TableCell align="right">{row.discount}</TableCell>
        <TableCell >{row.merchant}</TableCell>
        <TableCell style={row.status === 'Delivered' ? {color: 'blue'}: {color: 'red'}}>{row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Purchased Product
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontWeight: '600'}}>S_No</TableCell>
                    <TableCell style={{fontWeight: '600'}}>Date</TableCell>
                    <TableCell style={{fontWeight: '600'}}>Product</TableCell>
                    <TableCell style={{fontWeight: '600'}}>Quantity</TableCell>
                    <TableCell style={{fontWeight: '600'}}>Unit Amount($)</TableCell>
                    <TableCell style={{fontWeight: '600'}}>Total Amount($)</TableCell>
                    <TableCell style={{fontWeight: '600'}}>Delivery Status</TableCell>
                    {
                      row.status !== 'Delivered' ? 
                      <TableCell style={{fontWeight: '600'}}>Action</TableCell>
                      : null
                    }
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    typeof row !== "undefined" ? 
                    row.items.map((itemRow, ind) => (
                    <TableRow key={'itemRow_' + ind}>
                        <TableCell>{ind + 1}</TableCell>
                        <TableCell component="th" scope="row">
                            {convertDateAndTimeInEST(itemRow.createdAt)}
                        </TableCell>
                        <TableCell>{itemRow.description}</TableCell>
                        <TableCell align="right">{itemRow.quantity}</TableCell>
                        <TableCell align="right">{itemRow.unit_amount}</TableCell>
                        <TableCell align="right">
                            {(itemRow.quantity * itemRow.unit_amount).toFixed(2)}
                        </TableCell>
                        <TableCell align='right' style={!!itemRow.deliveryStatus.data[0] ? {color: 'green'} : {color: 'red'}}>
                        {
                            !!itemRow.deliveryStatus.data[0] ? 'Delivered' : 'Un-Delivered'
                        }
                        </TableCell>
                        {
                          !itemRow.deliveryStatus.data[0] ? 
                          <TableCell>
                            <Tooltip title="Update Delivery Status">
                              <i 
                                className="fa fa-truck delivery-status-icon" 
                                aria-hidden="true" 
                                style={{fontSize: '24px'}} 
                                onClick = {() => handleDeliveryStatus(itemRow.orderId)}
                              ></i>
                            </Tooltip>
                          </TableCell>
                          : null
                        }
                    </TableRow>
                  )) : ''
                }
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const AdminUserPurchaseList = ({data, updateUserPurchaseDeliveryStatusStart}) => {
    const createData = (name, email, gross_amount, merchant, order_id, total_amount, items, discount, createdAt, status, itemLength) => {
        return {
          name,
          email,
          order_id,
          gross_amount,
          total_amount,
          discount,
          merchant,
          createdAt,
          status,
          items,
          itemLength
        };
      }
    const [rows, setRows] = React.useState([]);

    const handleDeliveryStatus = (productId) => {
      updateUserPurchaseDeliveryStatusStart({id: productId, status: 1});
    }

    const Root = styled('div')(({ theme }) => ({
      width: '100%',
      ...theme.typography.body2,
      '& > :not(style) + :not(style)': {
          marginTop: theme.spacing(8),
      },
  }));

    const [newData, setNewData] = React.useState();
    React.useEffect(() => {
      if(data !== ''){
          var newArr = [];
            data.map((userData) => {
                const discount = (userData.total_amount - userData.gross_amount).toFixed(2);
                var status = 'Delivered';
                userData.items.map((item) => {
                    if(item.deliveryStatus.data[0] === 0){
                        status = 'Un-Delivered';
                    }
                });
                    newArr.push(
                        createData(
                            userData.name, 
                            userData.email, 
                            userData.gross_amount, 
                            userData.merchant, 
                            userData.order_id, 
                            userData.total_amount, 
                            userData.items, 
                            discount,
                            userData.createdAt,
                            status,
                            userData.items.length
                        )
                    )
            });
            setRows(newArr);
            setNewData(newArr);
        }
    }, [data]);

    // For Pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // To change Pages
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // To change Rows per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [search, setSearch] = React.useState('');
    const handleSearch = (event) => {
        const {value} = event.target;
        setSearch(value);
        if(value !== ""){
            setRows(newData.filter((data) => {
                return Object.values(data)
                    .join(" ")
                    .toLowerCase()
                    .includes(value.toLowerCase());
            })); 
        }
        else {
            setRows(newData);
        }
    }
    
    const [openSearch, setOpenSearch] = React.useState(false);
    const handleAdvancedSearch = () => {
      setOpenSearch(true);
    }

    const closeAdvancedSearch = () => {
      setOpenSearch(false);
    }

    // Excel Sheet Export 
  

    return (
      <>
        <Row style={{marginTop: '25px'}}>
          <Col>
            <h2>User Purchase List</h2>
          </Col>
        </Row>
        <Row>
              <Col md = {10} xs= {10} xm = {10} className="search-input" style={{display: 'flex'}}>
                <Tooltip title="Search">
                  <Button 
                    variant="outlined" 
                    color="success" 
                    startIcon={<SearchIcon />} 
                    onClick = {handleAdvancedSearch}
                    style={{marginLeft: 'auto'}}
                  >
                    Search
                  </Button>
                </Tooltip>
                  {
                    openSearch && <AdvancedSearch openDialog = {openSearch} closeAdvancedSearch = {closeAdvancedSearch}/>
                  }
              </Col>
              <Col md = {2} xs= {2} xm = {2} style={{display: 'flex'}}>
                <Divider orientation="vertical" flexItem style={{height: '45px', marginLeft: 'auto'}}/>
                  <ExportUserPurchaseExcel data = {rows}/>
              </Col>
        </Row>
        <Row>
          <TableContainer component={Paper} className="user-Purchase-list">
              <Table aria-label="collapsible table" id="user-purchase">
                  <TableHead>
                      <TableRow>
                          <TableCell />
                          <TableCell style={{fontWeight: '600'}}>Payer</TableCell>
                          <TableCell style={{fontWeight: '600'}}>Email</TableCell>
                          <TableCell style={{fontWeight: '600'}}>Order ID</TableCell>
                          <TableCell style={{fontWeight: '600'}}>Purchase Date</TableCell>
                          <TableCell style={{fontWeight: '600'}}>Total Amount($)</TableCell>
                          <TableCell style={{fontWeight: '600'}}>Amount Payable($)</TableCell>
                          <TableCell style={{fontWeight: '600'}}>Discount($)</TableCell>
                          <TableCell style={{fontWeight: '600'}}>Merchant</TableCell>
                          <TableCell style={{fontWeight: '600'}}>Status</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {

                          rows.length > 0 ?
                          rows
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                              <RowsOfTable key={row.order_id} row={row} handleDeliveryStatus = {handleDeliveryStatus}/>
                          )) 
                          : 
                          <TableRow>
                            <TableCell colSpan={10} align='center'>No Record(s) Found.</TableCell>
                          </TableRow>
                      } 
                  </TableBody>
              </Table>
              <TablePagination
                  rowsPerPageOptions={[ 5, 10, 25, 100]}
                  component="div"
                  count={rows !== null ? rows.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  />
          </TableContainer>
        </Row>
      </>
    );
}

const mapDispatchToProps = dispatch => ({
  updateUserPurchaseDeliveryStatusStart: (data) => dispatch(updateUserPurchaseDeliveryStatusStart(data))
})
export default connect(null, mapDispatchToProps)(AdminUserPurchaseList);