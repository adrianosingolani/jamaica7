import React from 'react'
import { connect } from 'react-redux'

import {
    HomeOutlined as HomeIcon,
    PowerSettingsNewOutlined as LogoutIcon,
    LibraryMusicOutlined as CollectionIcon,
    TuneOutlined as SettingsIcon,
    SearchOutlined as SearchIcon,
} from '@material-ui/icons/';

import SidebarMenuButton from './SidebarMenuButton';

import { logOutUser } from '../../store/actions/authActions';


export const SidebarMenu = ({ history, auth, logOutUser }) => {
    const logOut = () => {
        logOutUser(history);
    }

    return (
        <React.Fragment>
            <SidebarMenuButton startIcon={<HomeIcon />} to="/">Home</SidebarMenuButton>
            <SidebarMenuButton startIcon={<SearchIcon />} to="#">Search</SidebarMenuButton>
            {!auth.authenticated ? (
                <React.Fragment>
                    <SidebarMenuButton startIcon={<HomeIcon />} to="/register">Register</SidebarMenuButton>
                    <SidebarMenuButton startIcon={<HomeIcon />} to="/login">Login</SidebarMenuButton>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <SidebarMenuButton startIcon={<CollectionIcon />} to="#">Collection</SidebarMenuButton>
                    <SidebarMenuButton startIcon={<SettingsIcon />} to="/usersettings">Settings</SidebarMenuButton>
                    <SidebarMenuButton startIcon={<LogoutIcon />} to="#" onClick={() => logOut()} >Logout</SidebarMenuButton>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const mapDispatchToProps = {
    logOutUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu)
