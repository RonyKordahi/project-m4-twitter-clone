import React from 'react'
import styled from "styled-components"
import format from "date-fns/format";
import { Link } from "react-router-dom";

import {icons} from "../../icons";
import Buttons from "./Buttons";

function Tweet({tweet}) {
    return (
    <TweetWrapper>
        {/* conditional rendering of the entire tweet (to avoid blank rendering causing error on mount) */}
        {tweet && <FlexTweet>
            {/* whole tweet will be a link to the big tweet */}
            <StyledAvatar src={tweet.author.avatarSrc} alt="avatar" />
            <StyledTweet>
                <Link to={`/tweet/${tweet.id}`}>

                {/* conditional remeowed information rendering */}
                {tweet.retweetFrom && <span className="gray">
                    {icons.retweet} {tweet.retweetFrom.displayName} Meowed <br />
                </span>}

                {/* main body of the tweet */}
                    <span>
                        <span className="bold">
                            {tweet.author.displayName}
                        </span>
                        <span className="gray">
                        <Link className="gray link" to={`/${tweet.author.handle}`}>
                            @{tweet.author.handle}
                        </Link>
                            {format(Date.parse(tweet.timestamp), " · MMM do")}
                        </span>
                    </span>
                    <p>{tweet.status}</p>

                    {/* conditional rendering of media */}
                    {tweet.media.length ? <StyledMediaContainer>
                        <StyledMedia src={tweet.media[0].url} alt="media" />
                    </StyledMediaContainer> : null}
                    </Link>

                    {/* rendering of the Critter buttons */}
                    <Buttons tweetId={tweet.id} tweetLiked={tweet.isLiked} tweetRetweet={tweet.isRetweeted} />

            </StyledTweet>
        </FlexTweet>}
    </TweetWrapper>)
}

const StyledMediaContainer = styled.div `
    width: 95%;
    margin-bottom: 20px;
    height: 500px;
`

const StyledMedia = styled.img `
    width: 100%;
    height: 100%;
    border-radius: 5px;
`

const StyledAvatar = styled.img `
    border-radius: 100px;
    height: 60px;
    margin: 5px 5px 0px 5px;
`

const StyledTweet = styled.div `
    display: flex;
    flex-direction: column;
    
    a {
        text-decoration: none;
        color: black;
        cursor: default;
    }

    .link {
        cursor: pointer;
    }
`

const FlexTweet = styled.div `
    margin: 10px;
    display: flex;
`

const TweetWrapper = styled.div `
    border: whitesmoke solid 1px;
    width: 100%;

    .bold {
        font-weight: bold;
        margin-right: 5px;
    }

    .gray {
        color: gray;
    }
`

export default Tweet