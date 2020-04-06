import React, { useState } from 'react'
import styled from "styled-components"

import {COLORS} from "../constants"

function TweetPost() {

    const [tweet, setTweet] = useState("");
    const [charCount, setCharCount] = useState(280);

    return (
        <InputContainer>
            <form onSubmit={(event) => {
                    fetch("/api/tweet", {
                        method: "POST",
                        body: JSON.stringify({status: tweet}),
                        headers: {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json'
                        }
                    })
                }}>
                <StyledText placeholder="What's up?" onChange={(e) => {
                    setTweet(e.target.value);
                    const length = e.target.value.length
                    setCharCount(280);
                    setCharCount(charCount => charCount - length)
                }} />
                <StyledCount charCount={charCount}>{charCount}</StyledCount>
                <SubmitButton disabled={charCount < 0 || charCount === 280}>Meow</SubmitButton>
            </form>
        </InputContainer>
    )
}

const StyledCount = styled.span `
    position: absolute;
    bottom: 0;
    right: 20%;
    color: ${props => props.charCount < 100 && "orange"};
    color: ${props => props.charCount < 0 && "crimson"};
`

const StyledText = styled.textarea `
    height: 200px;
    width: 600px;
    margin: 45px 0px;
    outline: none;
    resize: none;
    border-radius: 3px;
`

const SubmitButton = styled.button `
    position: absolute;
    outline: none;
    right: 0;
    bottom: 0;
    border: none;
    background: ${COLORS.primary};
    border-radius: 45px;
    color: white;
    padding: 3px 7px;
    font-size: 30px;

    &:disabled {
        cursor: not-allowed;
        background: ${COLORS.background};
    }
`

const InputContainer = styled.div `
    position: relative;
    margin-bottom: 10px;
`

export default TweetPost
