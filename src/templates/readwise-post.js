import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ReadwiseHighlights from "./readwise-highlights"

export default function ReadwisePost({ data }) {
    const node = data.allReadwise.edges[0].node
    return (
        <Layout>
            <div>
                <h1>{node.source}</h1>
                <ReadwiseHighlights highlights={node.highlights} name="Jihad" />
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    allReadwise(filter: {slug: {eq: $slug}}) {
        edges {
          node {
            id
            slug
            author
            medium
            source
            highlights {
                highlight
            }
          }
        }
      }
  }
`