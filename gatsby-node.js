const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type === `MarkdownRemark` || node.internal.type === `MediumJson`) {
    console.log(node)
    const slug = createFilePath({ node, getNode, basePath: `content` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  } else if (node.internal.type === `LibraryJson`) { //convert readwise 
    const slug = createFilePath({ node, getNode, basePath: `content` })
    const readwiseReadings = node.data

    readwiseReadings.map((reading, index) => {
      const urlPath = reading.source
        .replace(/\s+/g, '-')
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        .toLowerCase();

      createNode({
        ...reading,
        id: index.toString(),

        slug: slug + urlPath,
        internal: {
          type: `Readwise`,
          contentDigest: `exampleContentDigest`,
        }

      })
    })
  }
}


exports.createPages = async ({ graphql, actions, getNode }) => {
  const { createPage } = actions


  // * Note: The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const markdownResult = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)

  console.log(markdownResult)

  markdownResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.fields != null) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/markdown-post.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    }
  })

  const mediumResult = await graphql(`
    query {
      allMediumJson {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  mediumResult.data.allMediumJson.edges.forEach(({ node }) => {

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/medium-blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })

  })

  const readwiseResult = await graphql(`
    query {
      allReadwise {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  readwiseResult.data.allReadwise.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/readwise-post.js`),
      context: {
        slug: node.slug
      }
    })
  })
}