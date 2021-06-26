import React from 'react';
import { connect } from 'react-redux';

import PageContainer from '../../components/Layout/PageContainer';

import RecordList from '../../components/Records/RecordList';

export const Home = () => {

    return (
        <PageContainer title="">
            <RecordList />
        </PageContainer>
    );
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);