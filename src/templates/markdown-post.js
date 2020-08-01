import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { css } from "@emotion/core"

export default function MarkdownPost({ data }) {
  const post = data.mdx

  return (
    <Layout>
      <div>
        <div>
          <h1>{post.frontmatter.title}</h1>
          <h2 css={css`
              color: #bbb;
            `}>{post.frontmatter.author}</h2>
        </div>
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
