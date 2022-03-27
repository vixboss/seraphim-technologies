import react from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import './crousel-image.styles.scss';

const CrouselImage = () => {
    return(
        <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} showThumbs={false} dynamicHeight={true} showStatus={false}>
                <div>
                    <img className="imageSize" src="https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/banner%2FAcute%20nursing%20banner%20image-ImResizer.jpg?alt=media&token=d81debf2-1636-48b9-a7d3-8ae2da1c6c36"/>
                </div>
                <div>
                    <img className="imageSize" src="https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/banner%2FBanner-ImResizer.jpg?alt=media&token=58ca0f58-c4ba-4e90-a652-a7b3c2b422dc"/>
                </div>
                <div>
                    <img className="imageSize" src="https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/banner%2FNursing_Careers_Banner-ImResizer.jpg?alt=media&token=fc20fd9a-8d1f-46ac-beaa-05384e35780e"/>
                </div>
                <div>
                    <img className="imageSize" src="https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/banner%2Fcne-nurse-banner-ImResizer.jpg?alt=media&token=ec93113e-990e-4051-97ef-7fd826525853"/>
                </div>
                <div>
                    <img className="imageSize" src="https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/banner%2Fmale-nurse-surgeon-stethoscope-ecg-line-medical-blue-background-health-care-banner-doctor-green-web-sites-copy-208634392-ImResizer.jpg?alt=media&token=92dee7f3-bd29-4518-ba1d-f0d022ac5b83"/>
                </div>
                <div>
                    <img className="imageSize" src="https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/banner%2Fnursing-Heading-banner-image.fw_-ImResizer.jpg?alt=media&token=32042c80-b05d-4f78-9c01-0300fcf29b8b"/>
                </div>
            </Carousel>
    );
}

export default CrouselImage;