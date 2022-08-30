import React, {useEffect, useState} from 'react';
import { Form, Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import BannerTitleListContainer from '../banner-title-list/banner-list-title.container';
import { 
    addBannerStart, 
    updateBannerStart, 
    deleteBannerStart, 
    getAllBannerStart 
} from './../../redux/banner/banner.action';
import { selectBannerType } from '../../redux/banner/banner.selector';
import './admin-banner.styles.scss';

const AdminBanner = ({bannerType, getAllBannerStart, addBannerStart, updateBannerStart, deleteBannerStart}) => {
    const [banner, setBanner] = useState({id: '', title: ''});
    const [buttonName, setButtonName] = useState('Submit');

    const {id,title} = banner;
    
    const addBanner = async(event) =>{
        event.preventDefault();
        if(banner.id === ''){
            const bannerTitle = {};
            bannerTitle.title = banner.title.trim();
            addBannerStart(bannerTitle);
        }
        else{
            const bannerTitle = {};
            bannerTitle.id = banner.id;
            bannerTitle.title = banner.title.trim();
            updateBannerStart(banner);
        }
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setBanner({ ...banner, [name]: value });
    }
    const cancelChange = () => {
        setBanner({id: '', title: ''});
        setButtonName('Submit');
    }

    const updateTitle = (type) => {
        const {_id, title} = type
        setBanner({'id': _id, 'title': title});
        setButtonName('Update');
    }

    const deleteBanner = (type) => {
        const {_id} = type;
        deleteBannerStart(_id);
    }

    useEffect(() => {
        cancelChange(); 
    },[bannerType]);

    useEffect(() => {
        getAllBannerStart();
    }, [])

    return(
        <Container>
            <Col className='admin-title m-t-30'>
                <Row>
                    <h1>Banner</h1>
                </Row>
                <Row className='title-field'>
                    <Form onSubmit={addBanner}>
                        <Row>
                            <Col className="title">
                                <FormInput
                                    type="input"
                                    name="title"
                                    value={title}
                                    handleChange={handleChange}
                                    label="URL"
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className='buttons'>
                                <CustomButton
                                    type="submit"
                                    value="submit"
                                    isNormalSubmitButton
                                >
                                    { 
                                        buttonName
                                    }
                                </CustomButton>
                                <CustomButton
                                    value="Cancel"
                                    onClick = {cancelChange}
                                    isNormalCancelButton
                                >
                                    Cancel
                                </CustomButton>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <div className='title-table'>
                  <BannerTitleListContainer bannerType={bannerType} updateTitle={updateTitle} deleteBanner={deleteBanner}/>
                </div>
            </Col>
        </Container>
    );
}

const mapDispatchToProps = dispatch => ({
    addBannerStart: (title) => dispatch(addBannerStart(title)),
    updateBannerStart: (data) => dispatch(updateBannerStart(data)),
    deleteBannerStart: (id) => dispatch(deleteBannerStart(id)),
    getAllBannerStart: () => dispatch(getAllBannerStart())
});
const mapStateToProps = createStructuredSelector({
    bannerType: selectBannerType
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminBanner);