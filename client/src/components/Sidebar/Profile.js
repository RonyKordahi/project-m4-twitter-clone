import React, {useEffect, useContext, useState} from 'react'
import { useParams } from "react-router-dom";
import styled from "styled-components";
import format from 'date-fns/format'

import CurrentUserContext from "../../CurrentUserContext"
import {COLORS} from "../../constants"
import {icons} from "../../icons"
import ProfileBar from "./ProfileBar"
import SpinnerSrc from "../../assets/spinner.gif"

function Profile() {
    const {actions: {catchError}} = useContext(CurrentUserContext);
    const [profileInfo, setProfileInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {profileId} = useParams();

    useEffect(() => {
        fetch(`/api/${profileId}/profile`)
            .then(res => res.json())
            .then(data => {
                const {profile} = data;
                setProfileInfo(profile);
                setIsLoading(false);
            })
            .catch(() => {
                catchError();
            })
    }, [isLoading, profileId])

    return (<>
        {isLoading ? <StyledSpinner src={SpinnerSrc} alt="spinner"/> :
        (<StyledProfile>
                <StyledBanner src={profileInfo.bannerSrc} />
                <StyledAvatar src={profileInfo.avatarSrc} />
                {profileInfo.isBeingFollowedByYou ? <StyledButton>Following</StyledButton> : <StyledButton>Follow</StyledButton>}
            <ProfileWrapper>
                <h2>{profileInfo.displayName}</h2>
                <span className="gray">
                    @{profileInfo.handle} {profileInfo.isFollowingYou && <span className="gray background">Follows you</span>}
                </span>
                <p>{profileInfo.bio}</p>
                <p className="gray">
                    {icons.location} {profileInfo.location || "The moon"} {icons.calendar} Joined {profileInfo.joined && format(Date.parse(profileInfo.joined), "LLLL yyyy")}
                </p>
                <p>
                    <span className="bold" >{profileInfo.numFollowing} </span><span className="gray"> Following </span>
                    <span className="bold">{profileInfo.numFollowers} </span><span className="gray"> Followers</span>
                </p>
                <ProfileBar profileId={profileId}/>
            </ProfileWrapper>
        </StyledProfile>)}
    </>)
}

const StyledSpinner = styled.img `
    margin-left: 200px;
`

const StyledButton = styled.button `
    position: absolute;
    right: 0;
    top: 300px;
    background: ${COLORS.primary};
    color: white;
    font-size: 1.5em;
    outline: none;
    border: none;
    border-radius: 100px;
    padding: 5px 15px;
    margin-right: 10px;
`

const ProfileWrapper = styled.div `
    margin-top: 70px;
    margin-left: 10px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;

    .gray {
        color: gray;
    }

    .bold {
        font-weight: bold;
    }

    .background {
        background-color: lightgray;
        padding: 2px 4px;
        border-radius: 5px;
    }
`

const StyledBanner = styled.img `
    width: 100%;
`

const StyledAvatar = styled.img `
    height: 100px;
    margin-left: 10px;
    border: 1px solid white;
    border-radius: 50px;
    position: absolute;
    left: 0;
    top: 230px;
`

const StyledProfile = styled.div `
    margin: auto;
    border: 1px solid whitesmoke;
    width: 60%;
    position: relative;
`

export default Profile
