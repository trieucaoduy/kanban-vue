import { COLORS } from "@/utils/constants"
import { v4 as uuidv4 } from "uuid"

export const useCommonHook = () => {
  const useId = () => {
    const uniqueId = uuidv4()

    return uniqueId
  }

  const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)]

  return {
    useId,
    getRandomColor,
  }
}
