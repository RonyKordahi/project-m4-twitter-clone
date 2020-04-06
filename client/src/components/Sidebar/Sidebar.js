import React, {useContext} from 'react'
import styled from "styled-components"
import { NavLink } from "react-router-dom"

import Logo from "./Logo"
import {COLORS} from "../../constants"
import {icons} from "../../icons"
import CurrentUserContext from "../../CurrentUserContext";

function Sidebar() {

    const {state: {currentUser}} = useContext(CurrentUserContext);

    return (
        <StyledSidebar>
            <Logo />
            <StyledLink to="/" exact>{icons.home} Home</StyledLink>
            <StyledLink to={`/${currentUser}`}>{icons.user} Profile</StyledLink>
            <StyledLink to="/notifications">{icons.bell} Notifications</StyledLink>
            <StyledLink to="/bookmarks">{icons.bookmark} Bookmarks</StyledLink>
        </StyledSidebar>
    )
}

const StyledLink = styled(NavLink) `
    &.active {
        color: ${COLORS.primary};
    }
`

const StyledSidebar = styled.div `
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 200px;

    a {
        text-decoration: none;
        color: black;
        font-size: 20px;
        padding: 5px 0px;
    }

    a:hover {
        color: ${COLORS.primary};
        background: ${COLORS.background};
        border-radius: 15px;
        padding-left: 10px;
        transform: scale(1.2);
    }
`

export default Sidebar
