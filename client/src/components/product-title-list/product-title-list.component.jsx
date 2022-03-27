import React from 'react';
import { Table } from 'react-bootstrap';

const ProductTitleList = ({productType, updateTitle, deleteProductTitle}) => {
    return(
        <>
            <Table striped bordered hover id="product-title-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product Title</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productType.length !== 0 ?
                            productType.map((type, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td id={type.id}>{type.title.capitalizeFirstCharacter()}</td>
                                        <td><i className="fa fa-pencil-square-o fa-lg onHover" aria-hidden="true" onClick={() => updateTitle(type)}></i></td>
                                        <td><i className="fa fa-times fa-lg onHover" aria-hidden="true" onClick={() => deleteProductTitle(type)}></i></td>
                                    </tr>
                                )
                            })
                        :   
                        
                        <tr>
                            <td colSpan={3}> No Record(s) Found.</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </>
    );
}

export default ProductTitleList;