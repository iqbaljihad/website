require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata:{
    title: `Jihad Iqbal`
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: "gatsby-source-gh-readme",
      options: {
        gitHubToken: `${process.env.GITHUB_API_TOKEN}`
      }
    },
  ],
}
