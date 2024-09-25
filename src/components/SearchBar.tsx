import React from 'react'

interface Props {
  value: string,
  dispatch: React.Dispatch<React.SetStateAction<string>>
  styleHolder?: string
  styleInput?: string
}

const SearchBar = ({ value, dispatch, styleHolder, styleInput }: Props): React.ReactNode => {
  return (
    <div className={`search-bar ${styleHolder}`}>
      <input
        className={styleInput}
        type='text'
        placeholder='Quick search'
        value={value}
        onChange={e => dispatch(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
