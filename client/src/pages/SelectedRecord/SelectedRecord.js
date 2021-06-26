import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { closest } from 'fastest-levenshtein';

import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Box,
    Divider,
} from '@material-ui/core/';

import { loadRecord } from '../../store/actions/recordActions';

import { RecordCarousel } from '../../components/Records/RecordCarousel';
import { TrackList } from '../../components/Tracks/TrackList';

const useStyles = makeStyles((theme) => ({
    box: {
        padding: theme.spacing(3),
        overflow: 'hidden',
    },
    divider: {
        backgroundColor: '#111',
        marginBottom: theme.spacing(2),
    }
}));

function findVideo(trackString, videos) {
    let videoId;

    if (videos) {
        const videoTitles = videos.map(video => {
            return video.title;
        })

        const closestVideoTitle = closest(trackString, videoTitles);
        const closestVideoIndex = videoTitles.indexOf(closestVideoTitle);

        const url = new URL(videos[closestVideoIndex].uri);
        const searchParams = new URLSearchParams(url.search);
        videoId = searchParams.get("v");
    }

    return videoId;
}

export const SelectedRecord = (props) => {
    const classes = useStyles();

    const { record, loadRecord } = props;
    const { recordid } = props.match.params;

    useEffect(() => {
        loadRecord(recordid);
    }, [recordid, loadRecord]);

    const { selected } = record;

    if (!selected.loading && selected.data) {

        const { title, images, year, styles, labels, artists, tracklist, videos } = selected.data;

        // artists string to be use for alt property and in case of track having an artists array
        const recordArtistsString = artists.map((artist, i, arr) => {
            if (i < arr.length - 1) return `${artist.name} / `;
            else return artist.name;
        }).join('');

        const alt = `${recordArtistsString} - ${title}`;

        const newTracklistObject = tracklist.map(track => {

            const artistsString = track?.artists ? (
                // track has its own artists array. Create a string
                track.artists.map((artist, i, arr) => {
                    if (i < arr.length - 1) return `${artist.name} / `;
                    else return artist.name;
                }).join('')
            ) : (
                // use the one of record array
                recordArtistsString
            );
            
            const newTrackObject = {
                recordId: selected.data.id,
                title: track.title,
                videoId: findVideo(artistsString, videos),
                artists: artistsString,
            }
            return newTrackObject;
        });

        return (
            <Box className={classes.box}>
                <RecordCarousel images={images} alt={alt} />
                <TrackList list={newTracklistObject} action={'add'} />
                <Divider className={classes.divider} />
                <Typography paragraph variant="body2">
                    <Typography variant="inherit" display="block">
                        {/* Year:  */}
                        {year}
                    </Typography>

                    {/* labels */}
                    {labels ? (
                        <Typography variant="inherit" display="block">
                            {/* Label:  */}
                            {
                                labels.map((label, i, arr) => {
                                    if (i < arr.length - 1) return `${label.name}  / `;
                                    else return `${label.name}`;
                                })
                            }
                        </Typography>
                    ) : (
                        null
                    )}

                    {/* styles */}
                    {styles ? (
                        <Typography variant="inherit" display="block">
                            {/* Style:  */}
                            {
                                styles.map((style, i, arr) => {
                                    if (i < arr.length - 1) return `${style}  / `;
                                    else return `${style}`;
                                })
                            }
                        </Typography>
                    ) : (
                        null
                    )}

                </Typography>
                {/* <Typography component='pre' color='inherit'>{JSON.stringify(selected.data, 0, '\t')}</Typography> */}
            </Box>
        )
    } else {
        return <React.Fragment />
    }
}

const mapStateToProps = (state) => ({
    record: state.record
})

const mapDispatchToProps = {
    loadRecord,
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedRecord)
