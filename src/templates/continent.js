import React, { useState, useRef } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Card from "../components/card"

export default ({ data }) => {
    const { continent } = data.continents
    const inputEl = useRef()
    const [matches, setMatches] = useState([])

    // Filter array of countries where name contains provided input
    const handleInput = (e) => {
        // Reset array on each input event so combined results are not returned as input changes
        let matchingCountries = []
        // Get all countries where name contains provided input
        continent.countries.forEach(country => {
            if(country.name.toLowerCase().includes(e.target.value) && matchingCountries.indexOf(country.name) === -1) {
                matchingCountries.push(country.name)
            }
        })
        // Set state array for referencing during DOM class toggling
        setMatches(matchingCountries)

        matches.forEach(name => {
            toggleHiddenCountries(name)
        })
    }

    const toggleHiddenCountries = (countryName) => {
        // If input value is blank, return an empty string
        // If input value is not blank *and* state array contains current card country, return an empty string
        // If current card country is not included in state array, return 'hidden' css class name. Otherwise return an empty string
        return inputEl.current && inputEl.current.value === '' ? 
            '' 
            : inputEl.current && inputEl.current.value !== '' ? 
                matches.indexOf(countryName) !== -1 ? '' 
                : 'hidden' 
                : ''
    }

    return (
        <Layout>
            <header className='header sticky-scroll'>
                <h1 className='heading'>Welcome to { continent.name }!</h1>
                <Link to='/' className='header-link'>Take me home</Link>
            </header>
            <p>The following is a list of all of the countries within { continent.name }: </p>
            
            <label htmlFor='country-filter' className='input input-label'>Filter countries where name includes: </label>
            <input type='text' 
                    name='country-filter' 
                    ref={ inputEl }
                    onInput={ handleInput }
                    className='input input-field'
            />
            
            <div className='card-container'>
                { 
                    continent.countries.sort((a, b) => a.name.localeCompare(b.name)).map((country, i) => {
                        return (
                            <Card key={i} 
                                name={ country.name }
                                className={`country-card ${ toggleHiddenCountries(country.name) }`}
                            >
                                <p className='card-info'>
                                    <span className='card-info--label'>Currency:</span> { country.currency || 'N/A' }
                                </p>
                                <p className='card-info'>
                                    <span className='card-info--label'>Phone Prefix:</span> { country.phone || 'N/A' }
                                </p>
                                <p className='card-info'>
                                    <span className='card-info--label'>Language(s):</span>
                                    {
                                        country.languages.length >= 1 ? 
                                            country.languages.map((lang, i) => {
                                                return (
                                                    <span key={i} className='country-card--language'>{ lang.name }</span>
                                                )
                                            })
                                            : 'N/A'
                                    }
                                </p>
                            </Card>
                        )
                    })
                }
            </div>
        </Layout>
    )
}

export const query = graphql`
    query ($code: String) {
        continents {
            continent(code: $code) {
                code
                name
                countries {
                    name
                    phone
                    currency
                    languages {
                        name
                    }
                }
            }
        }
    }
`
