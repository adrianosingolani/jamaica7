import React from 'react';
import { connect } from 'react-redux';

import TrackItem from './TrackItem';

export const TrackList = ({ list, action }) => {
    return (
        <React.Fragment>
            {
                list.map((track, i) => {
                    return (
                        <TrackItem
                            action={action}
                            track={track}
                            key={'track' + i}
                            playlistPosition={i}
                        />
                    );
                })
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList)
