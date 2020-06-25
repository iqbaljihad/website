import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function MarkdownPost({ data }) {
  const post = data.mdx

  return (
    <Layout>
      <div> 
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($url: String!) {
    mdx(fields: { url: { eq: $url } }) {
      frontmatter {
        title
        author
      }
      body
    }
  }
`
