import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import Button from "react-bootstrap/Button"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


export default function Library({ data }) {
  const [readingView, setReadingView] = useState(`default view`)
  const markdownList = data.allMdx.nodes
  const tagList = markdownList.map(node => node.frontmatter.tag).filter(tag => tag != null).flat().sort()
  const uniqueTagList = [...new Set(tagList)]  
  const [filterTagList, setFilterTagList] = useState([])
  
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
        <div>
          {renderMultiSelect(uniqueTagList, setFilterTagList)}
        </div>
      </div>

      <div
        css={css`
          display: inline-block;
          margin-top: 1em;
        `}
      >
        {renderLibraryList(markdownList, readingView, filterTagList)}
      </div>
    </Layout>
  )

  function renderMultiSelect(tagList) {
    const animatedComponents = makeAnimated();
    const multiSelectOptions = tagList.map(function(tag, i) {
        return { value: i, label: tag }
      }
    )
  
    let uniqMultiSelectOptions = [...new Set(multiSelectOptions)]
    
    return (
      <Select
        components={animatedComponents} 
        options={uniqMultiSelectOptions} 
        isMulti
        onChange={filterByTag}
      />
    )           
  }
  
  function filterByTag(e) {
    let filterList = []
    if (e != null) {
      e.map(filterTag => {
        filterList.push(filterTag.label)
      })
    }
    setFilterTagList(filterList)
  }
  
  function renderLibraryList(readingList, readingView, filterTagList) {
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

    console.log(filterTagList)
    
    const filteredReadingList = readingList.filter(node => {
      let tag = node.frontmatter.tag
      let containsFilteredTag = true;

      if (tag != null) {
        filterTagList.map(filterTag => {
          if (!tag.includes(filterTag)) {
            containsFilteredTag = false
          }
        })
        // tag.map(node => {
        //   if (filterTagList.includes(node)) {
        //     containsFilteredTag = true
        //   }
        // })
      }  

      return filter.includes(node.frontmatter.type) && (containsFilteredTag || filterTagList.length == 0)
    })
  
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
          tag
        }
      }
    }
  }
`
