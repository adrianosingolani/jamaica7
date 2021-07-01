import React from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-material-ui-carousel';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    image: {
        width: '100%',
    },
}));

export const RecordCarousel = ({ images, alt } ) => {
    const classes = useStyles();

    return (
        <Carousel autoPlay={false} animation="slide" cycleNavigation={true}>
            {
                images.map((item, i) => {
                    return <img className={classes.image} key={'image' + i} src={item.resource_url} alt={alt} />
                })
            }
        </Carousel>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RecordCarousel)
