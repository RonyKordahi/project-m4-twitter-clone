import React, {useState, useContext} from 'react'
import styled from "styled-components"

import {icons} from "../../icons"
import {COLORS} from "../../constants"

function Buttons({tweetId, tweetLiked, tweetRetweet}) {
    //sends info to server
    const [isLiked, setIsLiked] = useState(tweetLiked);
    const [isRetweeted, setIsRetweeted] = useState(tweetRetweet);

    //static and useless
    const [isShared, setIsShared] = useState(false);
    const [isReplied, setIsReplied] = useState(false);

    return (
        <div>
            <StyledReply style={{background: isReplied && `${COLORS.background}`, color: isReplied && `${COLORS.primary}`}} onClick={() => {
                setIsReplied(!isReplied);
            }}>
                {icons.reply}
            </StyledReply>

            <StyledRetweet style={{background: isRetweeted && `${COLORS.retweet}`, color: isRetweeted && "blue"}} onClick={() => {
                // connects to the server and sets tweet's status to retweeted/unretweeted
                fetch(`/api/tweet/${tweetId}/retweet`, {
                    method: "PUT",
                    body: JSON.stringify({retweet: !isRetweeted}),
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": 'application/json'
                    }
                })
                setIsRetweeted(!isRetweeted);
            }}>
                {icons.retweet}{isRetweeted && <span>1</span>}
            </StyledRetweet>

            <StyledHeart style={{background: isLiked && `${COLORS.heart}`, color: isLiked && `red`}} onClick={() => {
                // connects to the server and sets tweet's status to liked/unliked
                fetch(`/api/tweet/${tweetId}/like`, {
                    method: "PUT",
                    body: JSON.stringify({like: !isLiked}),
                    headers: {
                        "Accept": 'application/json',
                        "Content-Type": 'application/json'
                    }
                })
                setIsLiked(!isLiked);
            }}>
                {icons.heart}{isLiked && <span>1</span>}
            </StyledHeart>

            <StyledShare style={{background: isShared && `${COLORS.share}`, color: isShared && `green`}} onClick={() => {
                setIsShared(!isShared);
            }}>
                {icons.share}
            </StyledShare>
        </div>
    )
}

const StyledButton = styled.button `
    border: none;
    background: none;
    padding: 5px 7px;
    border-radius: 1000px;
    font-size: 20px;
    margin-right: 80px;
    margin-left: 55px;
    cursor: pointer;
    outline: none;
`

const StyledReply = styled(StyledButton) `

    &:hover {
        background: ${COLORS.background};
    }
`

const StyledRetweet = styled(StyledButton) `
    &:hover {
        background: ${COLORS.retweet};
    }
`

const StyledHeart = styled(StyledButton) `
    &:hover {
        background: ${COLORS.heart};
    }
`

const StyledShare = styled(StyledButton) `
    &:hover { 
        background: ${COLORS.share};
    }
`

export default Buttons
