import { useState, useEffect } from 'react'
import countryService from './services/country'
import Weather from './components/Weather'

const Country = ({country}) => {
  if (country === null) return null

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital {country.capital[0]} <br/>
        area {country.area}
      </p>
      <h2>languages: </h2>
      <ul>
        {Object.values(country.languages).map(
          l => <li key={l}>{l}</li>
        )}
      </ul>
      <img className={"flag"} src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      <Weather lat={country.capitalInfo.latlng[0]} lon={country.capitalInfo.latlng[1]} />
    </div>
  )
}

const SearchResults = ({countries, onShow}) => {
  let result = <div>No matches, specify another filter</div>

  if (countries.length > 10) {
    result = (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countries.length > 1) {
    result = (
      <div>
        {countries.map(c =>
          <div key={c.name.official}>
            {c.name.common}
            <button onClick={() => onShow(c)}>show</button>
          </div>
        )}
      </div>
    )
  }
  if (countries.length === 1) result = <Country country={countries[0]} />

  return result
}

const App = () => {
  const [searchValue, setSearchValue] = useState('')
  const [countryList, setCountyList] = useState([])
  const [countryToShow, setCountryToShow] = useState(null)

  useEffect(() => {
    countryService.getAll().then(resp => {
      setCountyList(resp)
    })
  }, [])

  const filteredCountries = countryList.filter(
    c => c.name.common.toUpperCase().includes(searchValue.toUpperCase())
  )

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
    setCountryToShow(null)
  }

  const show = (country) => {
    setCountryToShow(country)
  }

  return (
    <div>
      <div className="searchField">
        find countries 
        <input value={searchValue} onChange={handleInputChange} />
      </div>
      <SearchResults countries={filteredCountries} onShow={show}/>
      <Country country={countryToShow} />
    </div>
  )
}

export default App
