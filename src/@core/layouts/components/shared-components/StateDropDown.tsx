import { useEffect, useState } from 'react'
import { graphQlMapper } from 'src/graphql/graphql-mapper.service'
import { GraphQlKeyEnum } from 'src/graphql/graphql-query.enum'
import { getState } from 'src/graphql/query/country.query'
import { IState } from 'src/models/country.model'
import EmitterService, { EventEmitterEvents } from 'src/service/event-emitter.service'

interface StateDropDownProps {
  countryId: number
  onChange: (state: IState) => void
  classList?: string
  stateId?: number
}

function StateDropDown({ onChange, countryId, classList, stateId }: StateDropDownProps) {
  const stateData: IState[] | null = graphQlMapper<IState[]>(GraphQlKeyEnum.state, getState(countryId))

  useEffect(() => {
    if (stateData) {
      EmitterService.emit(EventEmitterEvents.STATE_LOADED, true)
    }
  }, [stateData])

  const [defaultValue, setDefaultValue] = useState<string>('none')

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = parseInt(event.target.value, 10)
    const selectedState = stateData?.find(state => state.id === stateId)
    if (selectedState) {
      onChange(selectedState)
      setDefaultValue(stateId.toString())
    }
  }

  useEffect(() => {
    if (stateId && stateData) {
      const matchedState = stateData.find(state => state.id === stateId)
      if (matchedState) {
        setDefaultValue(matchedState.id.toString())
        onChange(matchedState)
      }
    }
  }, [stateId, stateData, onChange])

  return (
    <>
      <select
        onChange={handleChange}
        name='state'
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
        {stateData?.map((state: IState) => (
          <option value={state.id} key={state.id}>
            {state.name}
          </option>
        ))}
      </select>
    </>
  )
}

export default StateDropDown
