import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function About({ data }) {
  return (
    <Layout>
      <h1>About</h1>
      <p>
        This website is about hosting my mind. I want it to be first accessible and useful for me, but later be able to share it with others.
      </p>
    </Layout>
  )
}