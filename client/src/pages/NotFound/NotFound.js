import React from 'react';
import { connect } from 'react-redux';

import PageContainer from '../../components/PageContainer/PageContainer';

export const NotFound = (props) => {
    return (
        <PageContainer title="Not Found"></PageContainer>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)