import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Pagination} from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component.jsx';
import { 
        collectionArrayMerging, 
        onHandleLastPage, 
        onPaginationClick, 
        onHandleFirstPage,
        onHandlePrevPage,
        onHandleNextPage,
        createPagination,
    } from '../../factory.js';
import { deleteProductStart } from '../../redux/product/product.action.js';
import { selectResponseData } from './../../redux/product/product.selector';

import './product-list.styles.scss';

const ProductList = ({ collection, updateProduct, responseData, deleteProductStart, pagination, searchPagination }) => {
    let newMergedArray = collectionArrayMerging(collection);
    let newCollection = createPagination(newMergedArray, pagination);
    
    let items = [];
    const [newSearchedCollection, setNewSearchedCollection] = useState({
        pageCount: 0,
        orgTableData: [],
        tableData: []
    });

    const [response, setResponse] = useState('');
    useEffect(() => {
        setResponse(responseData);
    },[responseData]);

    const [active, setActive] = useState(1);
    const [search, setSearch] = useState('');

    for (let number = 1; number <= newCollection.pageCount; number++) {
        items.push(
            <Pagination.Item 
                key={number} 
                active={number === active}
                onClick={() => handlePaginationClick(number)}
            >
                {number}
            </Pagination.Item>
        );
    }
    const handlePaginationClick = (number) => {
        const paginationData = pagination;
        const pageData = onPaginationClick(number, pagination);
        paginationData.offSet = pageData.offSet;
        paginationData.currentPage = pageData.currentPage;
        setActive(number);
    }

    const handleLastPage = () => {
        const lastPage = onHandleLastPage(newCollection, pagination);
        pagination.currentPage = lastPage.currentPage;
        pagination.offSet = lastPage.offSet;
        setActive(lastPage.currentPage);
    }

    const handleFirstPage = () => {
        const firstPage = onHandleFirstPage(pagination);
        pagination.offSet = firstPage.offSet;
        pagination.currentPage = firstPage.currentPage;
        setActive(firstPage.currentPage);
    }

    const handlePrevPage = () => {
        if(pagination.currentPage > 1){
            const prevPage = onHandlePrevPage(pagination);
            pagination.offSet = prevPage.offSet;
            pagination.currentPage = prevPage.currentPage;
            setActive(prevPage.currentPage);
        }
    }
    const handleNextPage = () => {
        if(pagination.currentPage < newCollection.pageCount){
            const nextPage = onHandleNextPage(pagination);
            pagination.offSet = nextPage.offSet;
            pagination.currentPage = nextPage.currentPage;
            setActive(nextPage.currentPage);
        }
    }

    const [searchItem, setSearchItem] = useState([]);
    const [searchActive, setSearchActive] = useState(1);
    let item = [];
    let newProductList;

    const handleSearch = (event) => {
        const {value} = event.target;
        setSearch(value);
        if(value !== ""){
            newProductList = newMergedArray.filter((productList) => {
                return Object.values(productList)
                    .join(" ")
                    .toLowerCase()
                    .includes(value.toLowerCase());
            }); 
            var newColl = createPagination(newProductList, searchPagination);
            setNewSearchedCollection({
                orgTableData: newColl.orgTableData,
                pageCount: newColl.pageCount, 
                tableData: newColl.tableData
            });
            for (let number = 1; number <= newColl.pageCount; number++) {
                item.push(
                    <Pagination.Item 
                        key={number} 
                        active={number === searchActive}
                        onClick={() => handleSearchPaginationClick(number)}
                    >
                        {number}
                    </Pagination.Item>
                );
            }
            setSearchItem(item);
        }
        else{
            searchPagination.offSet= 0;
            searchPagination.tableData= [];
            searchPagination.orgTableData= [];
            searchPagination.perPage= 5;
            searchPagination.currentPage= 0;
            searchPagination.pageCount= 0;
            setNewSearchedCollection({
                pageCount: 0,
                orgTableData: [],
                tableData: []
            });
            setSearchActive(1);
        }
    }

    /************FOR SEARCH PAGINATION******************** */
    const handleSearchPaginationClick = (number) => {
        const pageData = onPaginationClick(number, searchPagination);
        searchPagination.offSet = pageData.offSet;
        searchPagination.currentPage = pageData.currentPage;
        var newColl = createPagination(newProductList, searchPagination);
        setNewSearchedCollection({
            orgTableData: newColl.orgTableData,
            pageCount: newColl.pageCount, 
            tableData: newColl.tableData
        });
        setSearchActive(number);
    }

    const handleSearchFirstPage = () => {
        const firstPage = onHandleFirstPage(searchPagination);
        searchPagination.offSet = firstPage.offSet;
        searchPagination.currentPage = firstPage.currentPage;
        var newColl = createPagination(newSearchedCollection.orgTableData, searchPagination);
        setNewSearchedCollection({
            orgTableData: newColl.orgTableData,
            pageCount: newColl.pageCount, 
            tableData: newColl.tableData
        });
        setSearchActive(firstPage.currentPage);
    }
    const handleSearchLastPage = () => {
        const lastPage = onHandleLastPage(newSearchedCollection, searchPagination);
        searchPagination.currentPage = lastPage.currentPage;
        searchPagination.offSet = lastPage.offSet;
        var newColl = createPagination(newSearchedCollection.orgTableData, searchPagination);
        setNewSearchedCollection({
            orgTableData: newColl.orgTableData,
            pageCount: newColl.pageCount, 
            tableData: newColl.tableData
        });
        setSearchActive(lastPage.currentPage);
    }
    const handleSearchPrevPage = () => {
        if(searchPagination.currentPage > 1){
            const prevPage = onHandlePrevPage(searchPagination);
            searchPagination.offSet = prevPage.offSet;
            searchPagination.currentPage = prevPage.currentPage;
            var newColl = createPagination(newSearchedCollection.orgTableData, searchPagination);
            setNewSearchedCollection({
                orgTableData: newColl.orgTableData,
                pageCount: newColl.pageCount, 
                tableData: newColl.tableData
            });
            setSearchActive(prevPage.currentPage);
        }
    }
    const handleSearchNextPage = () => {
        if(searchPagination.currentPage < newSearchedCollection.pageCount){
            const nextPage = onHandleNextPage(searchPagination);
            searchPagination.offSet = nextPage.offSet;
            searchPagination.currentPage = nextPage.currentPage;
            var newColl = createPagination(newSearchedCollection.orgTableData, searchPagination);
            setNewSearchedCollection({
                orgTableData: newColl.orgTableData,
                pageCount: newColl.pageCount, 
                tableData: newColl.tableData
            });
            setSearchActive(nextPage.currentPage);
        }
    }

    /**************************************************** */
    
    const handleRemove = (id) => {
        deleteProductStart(id);
    }

    return(
        <Row className="product-list">
            <div className='search-div'>
                <FormInput
                    name="search"
                    label="Search"
                    value={search}
                    onChange={handleSearch}
                    autoComplete="off"
                />
            </div>
            <div className="product-table">
                <Table striped bordered hover id="prod-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Speaker Name</th>
                            <th>Product Category</th>
                            <th>Product Name</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            search !== "" ?
                            (newSearchedCollection.tableData.length !== 0 ?
                                newSearchedCollection.tableData.map((collections, i) => {
                                    return(
                                        <tr key={i+1}>
                                            <td> {collections.count} </td>
                                            <td> {collections.speakerName} </td>
                                            <td> {collections.title.capitalizeFirstCharacter()} </td>
                                            <td> {collections.name} </td>
                                            <td><i className="fa fa-pencil-square-o fa-lg onHover" aria-hidden="true" onClick={() => updateProduct(collections.id)}></i></td>
                                            <td><i className="fa fa-times fa-lg onHover" aria-hidden="true" onClick={() => handleRemove(collections.id)}></i></td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={5}> No Record(s) Found.</td>
                                </tr>)
                            :
                            (
                                newCollection.tableData.length !== 0 ?
                                    newCollection.tableData.map((collections, i) => {
                                        return(
                                            <tr key={i+1}>
                                                <td> {collections.count} </td>
                                                <td> {collections.speakerName} </td>
                                                <td> {collections.title.capitalizeFirstCharacter()} </td>
                                                <td> {collections.name} </td>
                                                <td><i className="fa fa-pencil-square-o fa-lg onHover" aria-hidden="true" onClick={() => updateProduct(collections.id)}></i></td>
                                                <td><i className="fa fa-times fa-lg onHover" aria-hidden="true" onClick={() => handleRemove(collections.id)}></i></td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan={5}> No Record(s) Found.</td>
                                    </tr>
                            )

                        }
                    </tbody>
                </Table>
            </div>
            <div className='table-pagination'>
                {
                    search === "" ?
                        <Pagination className='content-display'>
                            <Pagination.First onClick={handleFirstPage}/>
                            <Pagination.Prev onClick={handlePrevPage}/>
                                {
                                    items
                                }
                            <Pagination.Next onClick={handleNextPage}/>
                            <Pagination.Last onClick={handleLastPage}/>
                        </Pagination>
                        : 
                        <Pagination className='content-display'>
                            <Pagination.First onClick={handleSearchFirstPage}/>
                            <Pagination.Prev onClick={handleSearchPrevPage}/>
                                {
                                    searchItem
                                }
                            <Pagination.Next onClick={handleSearchNextPage}/>
                            <Pagination.Last onClick={handleSearchLastPage}/>
                        </Pagination>
                }
            </div>
        </Row>
    );
}

const mapDispatchToProps = dispatch => ({
    deleteProductStart: (id) => dispatch(deleteProductStart(id))
});

const mapStateToProps = createStructuredSelector({
    responseData: selectResponseData
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);