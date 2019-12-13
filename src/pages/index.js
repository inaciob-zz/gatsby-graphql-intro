import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/card"
import "./index.css"

export default ({ data }) => {
    const { continents } = data.continents

    return (
        <Layout>
            <h1 className='heading main-heading'>The world is a <span className='text-upper'>really</span> big place.</h1>
            <p>
                To help make sense of it all, go ahead and explore the world at your fingertips through this site. You may find information about 
                different parts of the world you didn't know about before. You might even find your next travel destination!
            </p>
            <p>
                Start by selecting a continent. The rest is up to you.
            </p>

            <div className='card-container'>
                {
                    continents.sort((a, b) => a.name.localeCompare(b.name)).map(({ name, countries }, i) => {
                        return (
                            <Link to={ name.replace(/\s+/g, '-').toLowerCase() } 
                                key={i}
                            >
                                <Card key={i} 
                                    name={ name }
                                >
                                    <p className='card-info'>{ countries.length } Countries</p>
                                </Card>
                            </Link>
                        )
                    })
                }
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        continents {
            continents{
                name
                countries {
                    code
                }
            }
        }
    }
`
