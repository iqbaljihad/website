import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default function Thoughts({ data }) {
  const mediumJson = data.allMediumJson
  const thoughtList = mediumJson == null ?  null : data.allMediumJson.edges
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Thoughts
        </h1>

        {renderThoughts(thoughtList)}
      </div>
    </Layout>
  )
}

function renderThoughts(thoughtList) {
  if (!thoughtList) {
    return <div></div>
  } else {
    return thoughtList.map(({ node }, i) => (
      <div key={i}>
        <Link
          to={node.fields.url}
          css={css`
            text-decoration: none;
            color: inherit;
          `}
        >
          <h3
            css={css`
              margin-bottom: ${rhythm(1 / 4)};
            `}
          >
            {node.title}{" "}
            <span
              css={css`
                color: #bbb;
              `}
            >
              —{" "}
              {new Date(node.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </h3>
        </Link>
      </div>
    ))
  }
  
}

export const query = graphql`
  query {
    allMediumJson {
      edges {
        node {
          title
          date
          fields {
            url
          }
        }
      }
    }
  }
`
