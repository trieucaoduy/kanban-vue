import { v4 as uuidv4 } from "uuid"

export const useCommonHook = () => {
  const useId = () => {
    const uniqueId = uuidv4()

    return uniqueId
  }

  return {
    useId,
  }
}
