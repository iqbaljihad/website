const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === `Mdx` || node.internal.type === `MediumJson`) {
    relativePath = createFilePath({ node, getNode, basePath: `content` })

    createNodeField({
      node,
      name: `url`,
      value: cleanUpPath(relativePath),
    })
  }
}

function cleanUpPath(url) {
  return url.toLowerCase().replace(/\s/g, "-")
}
exports.createPages = async ({ graphql, actions, getNode }) => {
  const { createPage } = actions

  const mdxResult = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              url
            }
            frontmatter {
              title
              author
            }
          }
        }
      }
    }
  `)

  mdxResult.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.url,
      component: path.resolve(`./src/templates/markdown-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        url: node.fields.url,
      },
    })
  })

  const mediumResult = await graphql(`
    query {
      allMediumJson {
        edges {
          node {
            fields {
              url
            }
          }
        }
      }
    }
  `)

  console.log(mediumResult)

  mediumResult.data.allMediumJson.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.url,
      component: path.resolve(`./src/templates/medium-blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        url: node.fields.url,
      },
    })
  })
}
