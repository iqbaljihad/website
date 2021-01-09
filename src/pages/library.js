import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import Button from "react-bootstrap/Button"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"

export default function Library({ data }) {
  const [readingView, setReadingView] = useState(`default view`)
  const markdownList = data.allMdx.nodes

  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
            margin-right: 1rem;
          `}
        >
          Library
        </h1>
        <div
          css={css`
            display: inline-block;
          `}
        >
          {RadioButtonGroup(setReadingView)}
        </div>
      </div>

      <div
        css={css`
          display: inline-block;
        `}
      >
        {renderLibraryList(markdownList, readingView)}
      </div>
    </Layout>
  )
}

function renderLibraryList(readingList, readingView) {
  var filter
  if (readingView === `books`) {
    filter = [`book`]
  } else if (readingView === `articles`) {
    filter = [`article`]
  } else if (readingView === `videos`) {
    filter = [`video`]
  } else {
    // default view
    filter = [`book`]
  }

  const filteredReadingList = readingList.filter(node =>
    filter.includes(node.frontmatter.type)
  )

  return filteredReadingList.map((node, i) => (
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
    </div>
  ))
}

function RadioButtonGroup(setReadingView) {
  const [radioValue, setRadioValue] = useState("books")

  const radios = [
    { name: " Books", value: "books" },
    { name: " Articles", value: "articles" },
    { name: " Videos", value: "videos" },
  ]

  return (
    <div style={{marginBottom: rhythm(1)}}>
      <ToggleButtonGroup type="radio" name="viewType" defaultValue="books">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="secondary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={e => {
              setRadioValue(e.currentTarget.value)
              setReadingView(e.currentTarget.value)
            }}
            css={css`
              margin-right: 0.5rem;
            `}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  )
}

export const query = graphql`
  query {
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
      nodes {
        id
        fields {
          url
        }
        frontmatter {
          title
          author
          type
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
