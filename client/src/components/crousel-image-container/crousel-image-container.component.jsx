import React from 'react';
import { Carousel } from 'react-responsive-carousel';


const CrouselImageContainerComponent = ({bannerType}) => {
    console.log(bannerType);
    return(
        <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false} dynamicHeight={true} showStatus={false}>
            {
                bannerType.length !== 0 && 
                bannerType.map((imageUrl) => {
                    return (<div key = {imageUrl._id}>
                        <img className="imageSize" src={imageUrl.title}/>
                    </div>);
                })
            }
        </Carousel>
    );
}

export default CrouselImageContainerComponent;