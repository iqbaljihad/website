import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function ReadwiseHighlights(props) {
    return props.highlights.reverse().map((node) => (
        <p>{node.highlight}</p>
    ))
} 
