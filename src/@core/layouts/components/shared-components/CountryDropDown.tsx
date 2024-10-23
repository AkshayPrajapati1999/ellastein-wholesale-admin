import { useEffect, useState } from 'react'
import { graphQlMapper } from 'src/graphql/graphql-mapper.service'
import { GraphQlKeyEnum } from 'src/graphql/graphql-query.enum'
import { getCountry } from 'src/graphql/query/country.query'
import { ICountry } from 'src/models/country.model'
import EmitterService, { EventEmitterEvents } from 'src/service/event-emitter.service'

interface CountryDropDownProps {
  onChange: (country: ICountry) => void
  classList?: string
  countryId?: number
}

function CountryDropDown({ onChange, classList, countryId }: CountryDropDownProps) {
  const countryData: ICountry[] | null = graphQlMapper<ICountry[]>(GraphQlKeyEnum.country, getCountry())

  if (countryData) {
    EmitterService.emit(EventEmitterEvents.COUNTRY_LOADED, true)
  }

  const [defaultValue, setDefaultValue] = useState<string>('')

  useEffect(() => {
    if (countryId && countryData) {
      const country = countryData.find(x => x.id === countryId)
      if (country) {
        const newValue = `${country.id}|${country.countryId}`
        setDefaultValue(newValue)
        onChange(country)
      }
    }
  }, [countryId, countryData, onChange])

  const handleChange = (str: string) => {
    const countryId = parseInt(str.split('|')[0], 10)
    const country = countryData?.find(x => x.id === countryId)
    if (country) {
      onChange(country)
      setDefaultValue(str)
    }
  }

  return (
    <>
      <select
        name='country'
        onChange={e => handleChange(e.target.value)}
        style={{
          width: '100%',
          marginBottom: 8,
          padding: 19,
          borderRadius: 6,
          border: '1px solid rgba(58, 53, 65, 0.22)'
        }}
        className={classList ?? 'confirm_Order_Disabled'}
        value={defaultValue}
        required
      >
        {countryData?.map((country: ICountry) => (
          <option value={`${country.id}|${country.countryId}`} key={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default CountryDropDown
