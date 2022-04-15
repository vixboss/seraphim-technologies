import React from 'react';
import { Table } from 'react-bootstrap';

import './merchandise-list.styles.scss';

const MerchandiseListComponent = ({merchandise, updateTitle, deleteMerchandiseTitle}) => {
    return(
            <Table striped bordered hover id="product-title-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Merchandise Title</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        merchandise.length !== 0 ?
                            merchandise.map((type, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td id={type.id}>{type.title.capitalizeFirstCharacter()}</td>
                                        <td><i className="fa fa-pencil-square-o fa-lg onHover" aria-hidden="true" onClick={() => updateTitle(type)}></i></td>
                                        <td><i className="fa fa-times fa-lg onHover" aria-hidden="true" onClick={() => deleteMerchandiseTitle(type)}></i></td>
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
    )
}

export default MerchandiseListComponent;