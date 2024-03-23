import { ref } from "vue"
import { defineStore } from "pinia"
import { ICard, IColumn } from "@/utils/types"
import { COLUMN_LIST } from "@/utils/constants"

export const useKanbanStore = defineStore("kanban", () => {
  const columns = ref<IColumn[]>(COLUMN_LIST)

  const searchCard = () => {}

  const addCardToColumn = (columnType: string, card: ICard) => {
    columns.value.map((cl) => {
      if (cl.type === columnType) {
        cl.items.push(card)
      }
    })
  }

  const getCardInfo = (cardId: string) => {
    const foundCard = columns.value.flatMap((column) => column.items).find((card) => card.cardId === cardId)
    return foundCard as ICard
  }

  const editCardInfo = (cardInfo: ICard) => {
    for (const cl of columns.value) {
      let card = cl.items.find((item) => item.cardId === cardInfo.cardId)
      if (card) {
        card = cardInfo
      }
    }
  }

  return {
    columns,
    addCardToColumn,
    getCardInfo,
    editCardInfo,
    searchCard,
  }
})
