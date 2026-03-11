import { useCallback, useEffect, useState } from "react"
import { debounce } from "../../../shared/lib/debounce"

type Props = {
  onSearch: (value: string) => void
};

export const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("")

  const debouncedSearch = useCallback(debounce(onSearch, 500), [])

  useEffect(() => {
    if (!value.trim()) {
      debouncedSearch.cancel()
      onSearch("")
      return
    }
    debouncedSearch(value.trim())
  }, [value])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="GitHub username"
      />
    </form>
  )
}