import { useEffect, useState } from 'react'
import { graphQlMapper } from 'src/graphql/graphql-mapper.service'
import { GraphQlKeyEnum } from 'src/graphql/graphql-query.enum'
import { getCity } from 'src/graphql/query/country.query'
import { ICity } from 'src/models/country.model'
import EmitterService, { EventEmitterEvents } from 'src/service/event-emitter.service'

interface CityDropDownProps {
  stateId: number
  onChange: (city: ICity) => void
  classList?: string
  cityId?: number
}

function CityDropDown({ stateId, onChange, classList, cityId }: CityDropDownProps) {
  const cityData: ICity[] | null = graphQlMapper<ICity[]>(GraphQlKeyEnum.city, getCity(stateId))

  useEffect(() => {
    if (cityData) {
      EmitterService.emit(EventEmitterEvents.CITY_LOADED, true)
    }
  }, [cityData])

  const [defaultValue, setDefaultValue] = useState<string>('none')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = parseInt(event.target.value, 10)
    const selectedCity = cityData?.find(city => city.id === cityId)
    if (selectedCity) {
      onChange(selectedCity)
      setDefaultValue(cityId.toString())
    }
  }

  useEffect(() => {
    if (cityId && cityData) {
      const matchedCity = cityData.find(city => city.id === cityId)
      if (matchedCity) {
        setDefaultValue(matchedCity.id.toString())
        onChange(matchedCity)
      }
    }
  }, [cityId, cityData, onChange])

  return (
    <>
      <select
        name='city'
        onChange={handleChange}
        className={classList ?? 'confirm_Order_Disabled'}
        value={defaultValue}
        style={{
          width: '100%',
          marginBottom: 8,
          padding: 19,
          borderRadius: 6,
          border: '1px solid rgba(58, 53, 65, 0.22)'
        }}
        required
      >
        <option value='none' selected disabled hidden>
          select one...
        </option>
        {cityData?.map((city: ICity) => (
          <option value={city.id} key={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default CityDropDown
