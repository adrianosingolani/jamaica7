import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    media: {
        width: '100%',
        height: 150,
    },
    content: {
        height: 75,
        backgroundColor: '#111',
    }
}));

export const RecordCard = ({ history, recordItem }) => {

    const selectRecord = (record) => {
        history.push(`record/${record.release_id}`)
    }

    const classes = useStyles();

    // remove '*' from names
    const title = recordItem.title.replace(/\*/g, '');
    // break title into artist and track
    const artist = title.substring(0, title.indexOf(' - '));
    const track = title.substring(title.indexOf(' - ') + 3);

    return (
        <Grid item xs={12} md={6} lg={4} xl={3}>
            <Card className={classes.card} onClick={() => selectRecord(recordItem)}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={recordItem.cover_image}
                        title={title}
                    />
                    <CardContent
                        className={classes.content}
                    >
                        <Typography variant="body2" noWrap>
                            <b>{artist}</b><br />
                            <i>{track}</i>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecordCard));
