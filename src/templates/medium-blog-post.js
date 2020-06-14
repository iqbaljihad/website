import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function MediumBlogPost({ data }) {
    const post = data.mediumJson
    return (
        <Layout>
            <div>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.content_encoded }} />
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    mediumJson(fields: { slug: { eq: $slug } }) {
        content_encoded
        title
    }
  }
`