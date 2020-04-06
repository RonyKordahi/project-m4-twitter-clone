import React, { useState, useEffect, useContext }from 'react'
import styled from "styled-components"

import {COLORS} from "../../constants"
import Tweet from "../Tweet/Tweet"
import TweetDetails from './TweetDetails';
import CurrentUserContext from "../../CurrentUserContext"

function ProfileBar({profileId}) {
    const [tweetButton, setTweetButton] = useState(true);
    const [mediaButton, setMediaButton] = useState(false);
    const [likesButton, setLikesButton] = useState(false);
    const [userTweets, setUserTweets] = useState({});
    const [tweets, setTweets] = useState({});

    const {actions: {catchError}} = useContext(CurrentUserContext);

    useEffect(() => {
        fetch(`/api/${profileId}/feed`)
            .then(res => res.json())
            .then(data => {
                const {tweetsById} = data;
                setUserTweets(tweetsById);
            })
            .catch(() => {
                catchError();
            })

        fetch("/api/me/home-feed")
            .then(res => res.json())
            .then(data => {
                const {tweetsById} = data;
                setTweets(tweetsById);
            })
            .catch(() => {
                catchError();
            })

    }, [profileId])
    
    return (
        <StyledBar>
            <ProfileButtons className={tweetButton ? "active" : "not-active"} onClick={() => {
                setTweetButton(true);
                setMediaButton(false);
                setLikesButton(false);
            }}>
                Tweets
            </ProfileButtons>
            <ProfileButtons className={mediaButton ? "active" : "not-active"} onClick={() => {
                setTweetButton(false);
                setMediaButton(true);
                setLikesButton(false);
            }}>
                Media
            </ProfileButtons>
            <ProfileButtons className={likesButton ? "active" : "not-active"} onClick={() => {
                setTweetButton(false);
                setMediaButton(false);
                setLikesButton(true);
            }}>
                Likes
            </ProfileButtons>
            
            {/* rendering the user's tweets */}
            {tweetButton && <TweetDisplay>
                {Object.values(userTweets).map(tweet => {
                    return <Tweet key={Math.random() * 1000000} tweet={tweet}/>
                })}
            </TweetDisplay>}

            {/* rendering the user's liked tweets only */}
            {likesButton && <TweetDisplay>
                {Object.values(tweets).map(tweet => {
                    if(tweet.isLiked) return <Tweet key={Math.random() * 10000000000000} tweet={tweet} />
                })}
            </TweetDisplay>}
        </StyledBar>
    )
}

const TweetDisplay = styled.div `
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
`

const StyledBar = styled.div `
    .active {
        color: ${COLORS.primary};
        border-bottom: 2px solid ${COLORS.primary};
    }
`

const ProfileButtons = styled.button `
    font-size: 2em;
    border: none;
    outline: none;
    background: none;
    padding: 7px 85px;

    &:hover {
        border-bottom: 2px solid ${COLORS.primary}
    }
`

export default ProfileBar
