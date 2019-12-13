/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `GeoInfo Demo`
  },
  plugins: [
    {
      // NOTE: Per the official Gatsby docs, this plugin in the recommended way to incorporate 3rd-party GraphQL APIs
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "Continent",
        // This is the field under which it's accessible
        fieldName: "continents",
        // URL to query from
        url: "https://countries.trevorblades.com/",
      }
    }
  ]
}
