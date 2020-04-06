import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import styled from "styled-components"

import Tweet from "../Tweet/Tweet"
import SpinnerSrc from "../../assets/spinner.gif"

function TweetDetails() {

    const [tweetDetail, setTweetDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const {tweetId} = useParams();
    console.log(tweetDetail);

    useEffect(() => {
        fetch(`/api/tweet/${tweetId}`)
            .then(res => res.json())
            .then(data => {
                const {tweet} = data;
                setTweetDetail(tweet);
                setIsLoading(false);
            })
    }, [isLoading])

    return (<>
        {isLoading ? <StyledSpinner src={SpinnerSrc} alt="spinner"/> : <TweetDetailsWrapper>
        {Object.values(tweetDetail).length ? <Tweet tweet={tweetDetail}/> : <h1>Loading</h1>}
        </TweetDetailsWrapper>}
    </>)
}

const StyledSpinner = styled.img `
    margin-left: 200px;
`

const TweetDetailsWrapper = styled.div `
    margin-left: 200px;
    margin-top: 50px;
`

export default TweetDetails
