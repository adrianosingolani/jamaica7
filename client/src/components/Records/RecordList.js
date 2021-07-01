import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
} from '@material-ui/core/';

import { logOutUser } from '../../store/actions/authActions';
import { listRecords, resetSelected } from '../../store/actions/recordActions';

import RecordCard from './RecordCard';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingRight: theme.spacing(2),
    }
}));

export const RecordList = ({ record, listRecords, resetSelected }) => {
    useEffect(() => {
        resetSelected()
        listRecords();
    }, [listRecords, resetSelected]);

    const classes = useStyles();

    return (
        <Grid container className={classes.container}>
            {
                record.list ? (
                    record.list.map((recordItem) => {
                        if (recordItem.release_id && recordItem.cover_image && !recordItem.cover_image.includes('spacer.gif') && recordItem.title) {
                            return <RecordCard recordItem={recordItem} key={recordItem.release_id} />
                            // return <React.Fragment />
                        } else {
                            return null;
                        }
                    })
                ) : null
            }
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    record: state.record,
});

const mapDispatchToProps = {
    logOutUser,
    listRecords,
    resetSelected,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecordList));