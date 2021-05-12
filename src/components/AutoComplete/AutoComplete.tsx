import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Input, { InputProps } from '../Input/Input'
import Icon from '../Icon/Icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (keyword: string) => string[] | Promise<string[]>;
  onSelect?: (item: string) => void;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useState(value as string)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  // useRef可以看成是一个变量，用来表示是否需要触发联想
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouceVal = useDebounce(inputValue, 500)
  useClickOutside(componentRef, () => {setSuggestions([])})
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    triggerSearch.current = true
  }
  useEffect(() => {
    if(!triggerSearch.current) return 
    const fetchData = async () => {
      setLoading(true)
      if (debouceVal) {
        const results = await fetchSuggestions(debouceVal)
        setSuggestions(results)
      } else {
        setSuggestions([])
      }
      setLoading(false)
    }
    fetchData()
  }, [debouceVal, fetchSuggestions])
  const handleSelect = (str: string) => {
    setInputValue(str)
    setSuggestions([])
    if (onSelect) {
      onSelect(str)
    }
    triggerSearch.current = false
  }
  // 显示dropdown
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((suggestion, index) => {
          return (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion}
              <Icon className="angle-right" icon="angle-right" />
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="corgii-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
      />
      {loading && <div className="spinner"><Icon icon="spinner" spin /></div>}
      {(suggestions.length > 0) && generateDropdown()}
    </div>
  )
}

AutoComplete.defaultProps = {
  value: ''
}

export default AutoComplete

