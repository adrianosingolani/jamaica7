import React from 'react';
import { connect } from 'react-redux';

import PageContainer from '../../components/PageContainer/PageContainer';

export const Home = (props) => {
    return (
        <PageContainer title= 'Home'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>testando</p>
        </PageContainer>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps, {})(Home);