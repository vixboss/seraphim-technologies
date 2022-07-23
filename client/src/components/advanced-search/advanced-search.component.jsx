import React, {useState} from 'react';
import {connect} from 'react-redux';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {Row, Col} from 'react-bootstrap';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import enLocale from 'date-fns/locale/en-US';
import { searchUserPurchaseStart } from '../../redux/user-purchase/user-purchase.action';

import { currentDateInISTWithTime } from '../../factory';
import './advanced-search.styles.scss';

const MySwal = withReactContent(Swal);

const AdvancedSearch = ({openDialog, closeAdvancedSearch, searchUserPurchaseStart}) => {
    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        ...theme.typography.body2,
        '& > :not(style) + :not(style)': {
            marginTop: theme.spacing(8),
        },
    }));

    const localeMap = {
        en: enLocale,
    };
      
    const maskMap = {
        en: '__/__/____',
    };

    const [locale, setLocale] = useState('en');

    const [open, setOpen] = useState(openDialog);
    const [search, setSearch] = useState({
        orderId: '',
        productName: '',
        email: '',
        payerName: '',
        fromDate: '',
        toDate: ''
    });
    const {orderId, productName, email, payerName, fromDate, toDate} = search;

    const handleClose = () => {
        setOpen(false);
        closeAdvancedSearch();
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSearch({...search, [name]: value});
    }

    const handleSearch = () => {
        if((search.fromDate === '' && search.toDate !== '') || (search.fromDate !== '' && search.toDate == '')){
            MySwal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Enter both the Dates for searching.',
                showConfirmButton: false,
                timer: 2000
            });
        }
        else{
            console.log(search);
            searchUserPurchaseStart(search);
        }
    }

    const handleDate = (e, type) => {
        if(e !== null && type === 'fromDate') {
            setSearch({...search, 'fromDate': currentDateInISTWithTime(e)});
        }
        else if(e !== null && type === 'toDate'){
            setSearch({...search, 'toDate': currentDateInISTWithTime(e)});
        }
    }
    return(
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="dialog-title">
                    {"Advanced Search"}
                </DialogTitle>
                <DialogContent>
                    <Row>
                        <Col>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="orderId"
                                label="Order ID"
                                type="text"
                                variant="standard"
                                name="orderId"
                                value={orderId}
                                onChange = {handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="productName"
                                label="Product Name"
                                type="text"
                                variant="standard"
                                name="productName"
                                value={productName}
                                onChange = {handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email"
                                type="text"
                                variant="standard"
                                name="email"
                                value={email}
                                onChange = {handleChange}
                            />
                        </Col>
                        <Col>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="payerName"
                                label="Payer Name"
                                type="text"
                                variant="standard"
                                name="payerName"
                                value={payerName}
                                onChange = {handleChange}
                            />
                        </Col>
                    </Row>
                    <Root style = {{marginTop: '20px'}}>
                        <Divider>
                            <Chip label="DATE BETWEEN" />
                        </Divider>
                    </Root>
                    <Row>
                        <Col className="datePicker">
                            <LocalizationProvider dateAdapter={AdapterDateFns}
                            locale={localeMap[locale]}
                            >
                                <DatePicker
                                    label="From Date"
                                    name="fromDate"
                                    value={fromDate}
                                    mask={maskMap[locale]}
                                    onChange={(e) => handleDate(e, 'fromDate')}
                                    required
                                    renderInput={(params) => <TextField {...params} id="standard-basic" label="From Date" variant="standard"/>}
                                />
                            </LocalizationProvider>
                        </Col>
                        <Col className="datePicker">
                            <LocalizationProvider dateAdapter={AdapterDateFns}
                            locale={localeMap[locale]}
                            >
                                <DatePicker
                                    label="To Date"
                                    name="toDate"
                                    value={toDate}
                                    mask={maskMap[locale]}
                                    onChange={(e) => handleDate(e, 'toDate')}
                                    required
                                    renderInput={(params) => <TextField {...params} id="standard-basic" label="To Date" variant="standard"/>}
                                />
                            </LocalizationProvider>
                        </Col>
                    </Row>
                </DialogContent>
                <DialogActions>
                    <Button style={{color: '#6c757d'}} onClick={handleClose}>Cancel</Button>
                    <Button style={{color: '#6c757d'}} onClick={() => {handleClose(); handleSearch();}} autoFocus>Search</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    searchUserPurchaseStart: (data) => dispatch(searchUserPurchaseStart(data))
})
export default connect(null, mapDispatchToProps)(AdvancedSearch);