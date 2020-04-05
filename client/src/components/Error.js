import React from 'react'
import styled from "styled-components"

import {icons} from "../icons"

function Error() {
    return (
        <ErrorPage>
            <span className="big">{icons.bomb}</span>
            <h1 className="bold">An unknwon error has occured.</h1>
            <h2>Please try refreshing the page!</h2>
        </ErrorPage>
    )
}

const ErrorPage = styled.div `
    .big {
        font-size: 2em;
    }

    .bold {
        font-weight: bold;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 300px;
    margin-top: 50px;
`

export default Error
