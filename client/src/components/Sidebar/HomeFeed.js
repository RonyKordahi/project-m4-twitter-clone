import React, { useEffect, useState, useContext } from 'react'
import styled from "styled-components"

import Tweet from "../Tweet/Tweet"
import TweetPost from "../TweetPost"
import CurrentUserContext from "../../CurrentUserContext"
import SpinnerSrc from "../../assets/spinner.gif"

function HomeFeed() {

    const [tweets, setTweets] = useState({});
    const {actions: {catchError}} = useContext(CurrentUserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/me/home-feed")
            .then(res => res.json())
            .then(data => {
                const {tweetsById} = data;
                setTweets(tweetsById);
                setIsLoading(false);
            })
            .catch(() => {
                catchError();
            })
    }, [isLoading])

    return (<>
        {isLoading ? <StyledSpinner src={SpinnerSrc} alt="spinner"/> : <><StyledInput>
            <TweetPost />
        </StyledInput>
        <StyledPage>
            {Object.values(tweets).map(tweet => {
                return <Tweet key={Math.random() * 100000000} tweet={tweet} />
            })}
        </StyledPage></>}
    </>)
}

const StyledSpinner = styled.img `
    margin-left: 200px;
`

const StyledPage = styled.div `
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 60%;
    margin: auto;
`
const StyledInput = styled(StyledPage) `
    flex-direction: column;
`

export default HomeFeed
