// import React from "react"
// import { graphql } from "gatsby"

// export default function TableOfContents() {
//   ; <h1>Test</h1>
// }

// export const query = graphql`
//   query PostBySlug($url: String!) {
//     mdx(fields: { url: { eq: $url } }) {
//       frontmatter {
//         title
//         date(formatString: "YYYY MMMM Do")
//       }
//       body
//       excerpt
//       tableOfContents
//       timeToRead
//       fields {
//         slug
//       }
//     }
//   }
// `