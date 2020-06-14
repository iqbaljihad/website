import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import blockList from "../utils/blockList"

export default function Library({ data }) {

  const readingList = data.allReadwise.nodes.filter(node => !blockList.includes(node.source))
  console.log(readingList)
  const [readingView, setReadingView] = useState(`default view`)

  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Library
        </h1>
        <div>
          <button onClick={() => setReadingView('books')}>Books</button>
          <button onClick={() => setReadingView('articles')}>Articles</button>
          <button onClick={() => setReadingView('videos')}>Videos</button>
        </div>

        { renderLibraryList(readingList, readingView) }
      </div>
    </Layout>
  )
}

function renderLibraryList(readingList, readingView) {
  var filter;

  if (readingView === `books`) {
    filter = [`kindle`]
  } else if (readingView === `articles`) {
    filter = [`medium`]
  } else if (readingView === `videos`) {
    filter = [`none`]
  } else { // default view
    filter = [`kindle`]
  }
  const filteredReadingList = readingList.filter(node => filter.includes(node.medium))

  return filteredReadingList.map((node) => (
    <div >
      <Link
        to={node.slug}
        css={css`text-decoration: none; color: inherit;`}
      >
        <h3
          css={css`margin-bottom: ${rhythm(1 / 4)};`}
        >

          {node.source}{" "}
          <span
            css={css`color: #bbb;`}
          >
            {renderDate(node)}
          </span>

        </h3>
      </Link>
    </div>
  ))
}

function renderDate(node) {
  if (node.highlights.length > 0) {
    const date = node.highlights[0].created
    var d = new Date(date * 1000)
    //return d.toDateString
    return d.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
  }
}

export const query = graphql`
  query {
    allReadwise(sort: {fields: highlights___created, order: DESC}) {
      nodes {
        id
        slug
        author
        medium
        source
        highlights {
          created
        }
      }
    }
  }
`