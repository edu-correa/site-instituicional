import { useState } from "react"

export const useAsyncState = (props) => {
  const [state, setState] = useState(props)

  const getState = async () => {
    return await state
  }

  return [ state, setState, getState ]
}