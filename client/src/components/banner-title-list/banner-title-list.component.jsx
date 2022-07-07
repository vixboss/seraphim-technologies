import React from 'react';
import { Table } from 'react-bootstrap';

const BannerTitleList = ({bannerType, updateTitle, deleteBanner}) => {
    return(
        <>
            <Table striped bordered hover id="banner-title-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Banner Url</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bannerType.length !== 0 ?
                            bannerType.map((type, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td id={type.id}>{type.title}</td>
                                        <td><i className="fa fa-pencil-square-o fa-lg onHover" aria-hidden="true" onClick={() => updateTitle(type)}></i></td>
                                        <td><i className="fa fa-times fa-lg onHover" aria-hidden="true" onClick={() => deleteBanner(type)}></i></td>
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

export default BannerTitleList;