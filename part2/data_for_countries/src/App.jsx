import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = ({setCountryFilter}) => {
  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <div>
      <label htmlFor="country">Find countries</label>
      <input type="text" name="country" onChange={handleFilterChange} />
    </div>
  )
}

const Results = ({results}) => {
  if(results === null || results.length === 0) {
    return null
  }
  if(results.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if(results.length > 2) {
    return (
      <div>
        {results.map(result =>
          <p key={result.name.common}>{result.name.common}</p>
        )}
      </div>
    )
  }
  return (
    <div>
      <h1>{results[0].name.common}</h1>
      <p>Capital {results[0].capital}</p>
      <p>Area {results[0].area}</p>
      <em>Languages</em>
      <ul>
        {Object.values(results[0].languages).map(lang =>
          <li key={lang}>{lang}</li>
        )}
      </ul>
      <img src={results[0].flags.png} alt={results[0].flags.alt} />
    </div>
  )
}

const App = () => {
  const [all, setAll] = useState(null)
  const [countryFilter, setCountryFilter] = useState('')
  const baseURL = `https://studies.cs.helsinki.fi/restcountries/api`

  useEffect(() => {
    axios
      .get(`${baseURL}/all`)
      .then(response => {
        console.log("Retrieved data")
        setAll(response.data)
      })
  }, [])

  if(all === null) {
    return (
      <div>
      <form>
        <label htmlFor="country">Find countries</label>
        <input type="text" name="country" />
      </form>
    </div>
    )
  }

  const results = countryFilter === '' ? null : all.filter(country => country.name.common.toUpperCase().indexOf(countryFilter.toUpperCase()) !== -1)

  return (
    <div>
      <Filter setCountryFilter={setCountryFilter} />
      <Results results={results} />
    </div>
  )
}

export default App
