const path = require(`path`)

exports.createPages = async({ actions, graphql }) => {
    // NOTE: Not sure why exactly it seems to be necessary to use continents > continents rather that a single top node but
    //      this seems to be the required hierarchy for querying to work as expected
    const { data } = await graphql(`
        query {
            continents {
                continents {
                    code
                    name
                    countries {
                        code
                        name
                    }
                }
            }
        }
    `)
    // Create continent template
    data.continents.continents.forEach(({ code, name }) => {
        actions.createPage({
            path: name.replace(/\s+/g, '-').toLowerCase(),
            component: path.resolve(`./src/templates/continent.js`),
            context: {
                code: code
            }
        })
    })
    // TODO: Create separate template for country page(s)
}