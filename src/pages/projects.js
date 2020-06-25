import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default function Projects({ data }) {
  //const projectList = data.allMarkdownRemark.edges
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Projects
        </h1>

        {
          //renderProjects(projectList)
        }
      </div>
    </Layout>
  )
}

function renderProjects(projectList) {
  return projectList.map(({ node }) => (
    <div key={node.id}>
      <Link
        to={node.fields.slug}
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
          {node.frontmatter.title}{" "}
          <span
            css={css`
              color: #bbb;
            `}
          >
            — {node.frontmatter.date}
          </span>
        </h3>
      </Link>

      <p>{node.excerpt}</p>
    </div>
  ))
}
// export const query = graphql`
//   query {
//     allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: { fileAbsolutePath: { regex: "/projects/" } }
//     ) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM, YYYY")
//           }
//           fields {
//             slug
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `
