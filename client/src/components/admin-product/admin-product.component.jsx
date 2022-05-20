import React, {useEffect, useState, useRef} from 'react';
import { DropdownButton, Dropdown, Container, Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import enLocale from 'date-fns/locale/en-US';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import { selectResponseData, selectProductById } from './../../redux/product/product.selector';
import { getAllProductTitleStart } from './../../redux/product/product.action';
import { getAllMerchandiseTitleStart } from '../../redux/merchandise/merchandise.action';
import { selectCollectionsForPreview } from './../../redux/shop/shop.selector';
import { fetchCollectionsStart } from './../../redux/shop/shop.actions';
import ProductListContainer from '../product-list/product-list.container';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { selectProductType } from '../../redux/product/product.selector';
import { selectMerchandiseTitleAsArray } from '../../redux/merchandise/merchandise.selector';
import { addProductStart, getProductByIdStart, updateProductStart } from './../../redux/product/product.action';
import { changeObjectValueToKeyValue, uuidv4 } from '../../factory';

import './admin-product.styles.scss';

const AdminProduct = ({fetchCollectionsStart, updateProductStart, getProductByIdStart, productById, responseData, addProductStart, collections, selectProductType, getAllProductTitleStart, getAllMerchandiseTitleStart, selectMerchandiseTitleAsArray}) => {
    const productStatus = ['Recorded', 'Upcoming'];
    const MySwal = withReactContent(Swal);
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();

    let hh = d.getHours();
    let min = d.getMinutes();
    let ss = d.getSeconds();

    let createdAt = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
    const [productDetails, setProductDetails] = useState({
        id: uuidv4(),
        imageUrl : "",
        name: "",
        price: "",
        title : "Select Product Type",
        status:"Recorded",
        heading: "",
        date: new Date(),
        duration: "",
        time: new Date(),
        speakerName:"",
        createdAt: new Date(),
        productDescription : {
            description: '',
            detailFields:{}
        }
    });

    const [checkUpdateId, setCheckUpdateId] = useState(false);
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState({});

    const [productType, setProductType] = useState(selectProductType);

    const { imageUrl, name, price, heading, title, date, duration, status, time, speakerName, productDescription } = productDetails;
  
    const [pagination, setPagination] = useState({
        offSet: 0,
        tableData: [],
        orgTableData: [],
        perPage: 5,
        currentPage: 0,
        pageCount: 0
    });

    const [searchPagination, setSearchPagination] = useState({
        offSet: 0,
        tableData: [],
        orgTableData: [],
        perPage: 5,
        currentPage: 0,
        pageCount: 0
    });

    const [buttonName, setButtonName] = useState('Submit');
    const [detailField, setDetailField] = useState([{detailType: '', detailTypeField: ''}]);

    const handleAddDetailType = () => {
        setDetailField([...detailField, {detailType: '', detailTypeField: ''}]);
    }
    
    const handleChangeDetailTypeField = (event, index) => {
        const {name, value} = event.target;
        const list = [...detailField];
        list[index][name] = value;
        setDetailField(list);
        productDescriptionObjectPush(list);
    }

    const productDescriptionObjectPush = (list) => {
        var newDetailField = changeObjectValueToKeyValue(list);
        setDetails(newDetailField);
        const detField = productDetails.productDescription.detailFields;
        setProductDetails({
            ...productDetails,
            productDescription: {
                'description': description,
                ...detField
            }
        });
    }
    const handleRemoveDetailTypeField = (index) => {
        const list = [...detailField];
        if(list.length !== 1) {
            list.splice(index, 1);
        }
        setDetailField(list);
        productDescriptionObjectPush(list);
    }

    const handleChange =(event) => {
        const {name, value} = event.target;
        setProductDetails({...productDetails, [name]: value });
    }

    const handleDate = (event) => {
        // const newDate = currentDateAndTimeInEST(event);
        setProductDetails({...productDetails, date: event });
    }

    const handleTime = (event) => {
        setProductDetails({...productDetails, time: event });
    }
    
    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        // const detField = productDetails.productDescription.detailFields;
        setDescription(value);
        setProductDetails({
            ...productDetails,
            productDescription: {
                'detailFields': details,
                'description': value,
            }
        });
    }

    useEffect(() => {
        setProductDetails({
            ...productDetails,
            productDescription: {
                'detailFields': details,
                'description': description,
            }
        });
    }, [description, details]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(title !== "Select Product Type"){
            var productCollections = {
                title: title,
                items: [
                    productDetails
                ]
            }
            if(!checkUpdateId){
                addProductStart(productCollections);
            }
            else{
                // Update Function will be called here
                updateProductStart(productCollections);
            }
        }
        else{
            MySwal.fire({
                position: 'top-end',
                icon: 'error',
                title: "Select Product Type",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    
    const typeDropdownChange = (e) => {
        const value = e.target.innerHTML.toLowerCase();
        setProductDetails({...productDetails, 'title': value });
    }

    const statusDropdownChange = (e) => {
        const value = e.target.innerHTML.toLowerCase();
        setProductDetails({...productDetails, 'status': value });
    }

    const clearFields = () => {
        setProductDetails({
            id: uuidv4(),
            imageUrl : "",
            name: "",
            price: "",
            title : "Select Product Type",
            heading: "",
            status:"Recorded",
            date: new Date(),
            duration: "",
            time:new Date(),
            speakerName:"",
            createdAt: new Date(),
            productDescription : {
                description: '',
                detailFields:{}
            }
        });
        setDescription('');
        setDetailField([{detailType: '', detailTypeField: ''}]);
        setCheckUpdateId(false);
        setSelectedMerchandise([]);
        setMerchandise(arr);
    }

    const getProductById = (id) => {
        getProductByIdStart(id);
    }
    const responseDataMethod = () => {
        if(responseData.status === 200 || responseData.status === 201){
            clearFields();
        }
    }
    useEffect(() => {
        responseDataMethod();
        fetchCollectionsStart();
    }, [responseData, fetchCollectionsStart]);

    useEffect(() => {
        if(productById.status === 200 || productById.status === 201){
            const { data } = productById;
            const merchandiseObject = typeof data.merchandise !== "undefined" ? data.merchandise: merchandisePriceArray;
            setCheckUpdateId(true);
            setProductDetails({
                id: data.id,
                imageUrl: data.imageUrl,
                name: data.name,
                price: data.price,
                title: data.title,
                heading: data.heading,
                date: data.date,
                status: data.status,
                duration: data.duration,
                time:data.time,
                createdAt: new Date(),
                merchandise: merchandiseObject,
                speakerName:data.speakerName,
                productDescription: {
                    'description': data.productDescription.description,
                    'detailFields': data.productDescription.detailFields
                }
            });
            setDescription(data.productDescription.description);
            // setSelectedMerchandise(data.merchandise);
            const arrayObj = [];
            Object.keys(data.productDescription.detailFields).forEach(key =>
                arrayObj.push({
                    detailType: key,
                    detailTypeField:data.productDescription.detailFields[key]
                })
            );
            setMerchandise(merchandiseObject);

            arrayObj.length > 0 ? setDetailField(arrayObj) : setDetailField([{detailType: '', detailTypeField: ''}]);
        }
    },[productById]);

    useEffect(() => {
        getAllProductTitleStart();
        getAllMerchandiseTitleStart();
    }, []);

    const arr = [];
    const [merchandisePriceArray, setMerchandisePriceArray] = useState();
    useEffect(() => {
        setProductType(selectProductType);
        selectMerchandiseTitleAsArray.map((merchandise) => {
            arr.push({
                name : merchandise,
                price: ''
            });
        });
    });
    
    useEffect(() => {
        setMerchandisePriceArray(arr);
        setMerchandise(arr);
    }, [selectMerchandiseTitleAsArray])

    const localeMap = {
        en: enLocale,
    };
      
    const maskMap = {
        en: '__/__/____',
    };

    const [locale, setLocale] = React.useState('en');

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const INIT_MERCHANDISE = [];
    const [merchandise, setMerchandise] = useState(INIT_MERCHANDISE);

    function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
    }

    const [selectedMerchandise, setSelectedMerchandise] = React.useState([]);

    const handleChangeMultiSelect = (event) => {
        const {
        target: { value },
        } = event;
        setSelectedMerchandise(
        // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        setProductDetails({...productDetails, merchandise: selectedMerchandise });
    }, [selectedMerchandise]);

    const handleChangeMerchandiseField = (event, index) => {
        const {name, value} = event.target;
        const list = [...merchandise];
        list.map((merchand) => {
            if(merchand.name === name){
                merchand.price = value;
            }
        });
        setMerchandise(list);
        setProductDetails({...productDetails, merchandise: list});
    }

    return(
        <Container>
            <Col className='admin-product'>
                <Row>
                    <h1>Product</h1>
                </Row>
                <Row className='product-form-field'>
                    <form className='add-product' onSubmit={(e) => handleSubmit(e)}>
                        <Row>
                            <Col>
                                <FormInput
                                    name="speakerName"
                                    label="Speaker Name"
                                    value={speakerName}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col>
                                <FormInput
                                    name="name"
                                    label="Product Name"
                                    value={name}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                            
                            {/*<Col>
                                <FormInput
                                    name="price"
                                    label="Price ($)"
                                    value={price}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>*/}
                            <Col>
                                <FormInput
                                    name="imageUrl"
                                    label="Image URL"
                                    value={imageUrl}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col id="datePicker">
                               {/* <FormInput
                                    name="date"
                                    label="Date"
                                    value={date}
                                    handleChange={handleChange}
                                    required
                               /> */}

                                <LocalizationProvider dateAdapter={AdapterDateFns}
                                locale={localeMap[locale]}
                                >
                                    <DatePicker
                                        label="Date"
                                        name="date"
                                        value={date}
                                        mask={maskMap[locale]}
                                        onChange={handleDate}
                                        required
                                        renderInput={(params) => <TextField {...params} id="standard-basic" label="Date" variant="standard"/>}
                                    />
                                </LocalizationProvider>
                            </Col>
                            <Col>
                                <FormInput
                                    name="duration"
                                    label="Duration"
                                    value={duration}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col id="timePicker">
                                {/*<FormInput
                                    name="time"
                                    label="Time in EST"
                                    value={time}
                                    handleChange={handleChange}
                                    required
                                />*/}

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        label="Time"
                                        value={time}
                                        onChange={handleTime}
                                        required
                                        renderInput={(param) => <TextField {...param} id="standard-basic" label="time" variant="standard"/>}
                                    />
                                </LocalizationProvider>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormInput
                                    name="heading"
                                    label="Heading"
                                    value={heading}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col>
                                <DropdownButton 
                                    id="dropdown-basic-button" 
                                    title={title} 
                                    className="center-item"
                                    required
                                >
                                {
                                    productType.map((type, index) => {
                                        return(
                                            <Dropdown.Item key={type.id}
                                            onClick={(e) => typeDropdownChange(e)}>{type.title.capitalizeFirstCharacter()}</Dropdown.Item>
                                        )
                                    })
                                }
                                </DropdownButton>
                            </Col>
                            {/*<Col xs = {6} lg md>
                                
                                <FormControl style={{width: '100%'}} className='center-multi-select'>
                                    <InputLabel id="demo-multiple-chip-label"
                                    >Mrch.</InputLabel>
                                    <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={selectedMerchandise}
                                    onChange={handleChangeMultiSelect}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                    >
                                    {merchandise.map((name) => (
                                        <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, selectedMerchandise, theme)}
                                        >
                                        {name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                            </Col>*/}
                            <Col xs = {6} lg md>   
                               {/* <FormInput
                                    name="description"
                                    label="Description"
                                    value={description}
                                    handleChange={handleDescriptionChange}
                                    
                               /> */}

                                <FloatingLabel controlId="floatingTextarea" name="description" label="Description">
                                    <Form.Control
                                    as="textarea"
                                    name="description"
                                    value={description}
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                    onChange={handleDescriptionChange}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs = {12} lg = {6} md = {6}>
                                <Card sx={{ minWidth: 275 }} className="padding-top">
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Merchandise (in USD)
                                        </Typography>
                                        <Row>
                                            {
                                                merchandise.map((merchand, index) => {
                                                    return (
                                                        <Col xs={6} md={4} lg={4} key={index}>
                                                            <FormInput
                                                                name={merchand.name}
                                                                label={merchand.name}
                                                                value={merchand.price}
                                                                handleChange={handleChangeMerchandiseField}
                                                                onKeyPress={(event) => {
                                                                    if (!/[0-9]/.test(event.key)) {
                                                                      event.preventDefault();
                                                                    }
                                                                }}
                                                                onPaste={(e)=>{
                                                                    e.preventDefault()
                                                                    return false;
                                                                }} 
                                                                onCopy={(e)=>{
                                                                    e.preventDefault()
                                                                    return false;
                                                                }} 
                                                            />
                                                        </Col>
                                                    )
                                                }) 
                                            }
                                        </Row>
                                    </CardContent>
                                </Card>
                            </Col>
                        </Row>
                        
                        {
                            detailField.map((item, i) => {
                                return(
                                    <Row key={i}>
                                        <Col>
                                            <FormInput
                                                name="detailType"
                                                label="Detail Type"
                                                value={item.detailType}
                                                onChange={(e) => handleChangeDetailTypeField(e, i)}
                                            />
                                        </Col>
                                        <Col>
                                            <FormInput
                                                name="detailTypeField"
                                                label="Detail Fields"
                                                value={item.detailTypeField}
                                                onChange={(e) => handleChangeDetailTypeField(e, i)}
                                            />
                                        </Col>
                                        <Col>
                                            <Row>
                                                {
                                                    detailField.length - 1 === i &&
                                                    <Col>
                                                        <i className="fa fa-plus fa-3x center-item add-detail-field" aria-hidden="true" onClick={handleAddDetailType}></i>
                                                    </Col>
                                                    
                                                }
                                                {
                                                    (detailField.length + 1 !== i) &&
                                                    <Col>
                                                        <i className="fa fa-minus fa-3x center-item add-detail-field" aria-hidden="true" onClick={() => handleRemoveDetailTypeField(i)}></i>
                                                    </Col>
                                                }
                                            </Row>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        <Row>
                            <Col className='buttons'>
                                <CustomButton
                                    type="submit"
                                    isNormalSubmitButton
                                >
                                { 
                                    checkUpdateId ? 'update' : 'submit'
                                }
                                </CustomButton>
                                <CustomButton
                                    value="Cancel"
                                    isNormalCancelButton
                                    className="add-leftMargin"
                                    onClick={clearFields}
                                >
                                    Cancel
                                </CustomButton>
                            </Col>
                        </Row>
                        
                    </form>
                </Row>
                <ProductListContainer collection = {collections} updateProduct = {getProductById} pagination={pagination} searchPagination= {searchPagination}/>
            </Col>
        </Container>
    );
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview,
    selectProductType: selectProductType,
    responseData: selectResponseData,
    productById: selectProductById,
    selectMerchandiseTitleAsArray: selectMerchandiseTitleAsArray
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
    addProductStart: (data) => dispatch(addProductStart(data)),
    getProductByIdStart: (id) => dispatch(getProductByIdStart({id})),
    updateProductStart: (data) => dispatch(updateProductStart(data)),
    getAllProductTitleStart: () => dispatch(getAllProductTitleStart()),
    getAllMerchandiseTitleStart: () => dispatch(getAllMerchandiseTitleStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);