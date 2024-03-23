import { /* computed ,*/ ref } from "vue"
import { useKanbanStore } from "@/stores/kanban"
import { ICard } from "@/utils/types"

export const useCardHook = () => {
  const cardName = ref("")
  const cardGroup = ref("")

  const { addCardToColumn, getCardInfo, editCardInfo } = useKanbanStore()

  const addCard = (group: string) => {
    cardName.value = "New card"
    cardGroup.value = group

    const dataCard: ICard = {
      cardId: Date.now().toString(),
      cardName: "New card",
      cardGroup: cardGroup.value,
      cardDescription: "",
      cardChecklist: [],
      checklistDone: 0,
      checklistPercent: 0,
      checklistTotal: 0,
    }

    addCardToColumn(cardGroup.value, dataCard)
  }

  const getCard = (cardId: string) => {
    return getCardInfo(cardId)
  }

  const editCard = (cardInfo: ICard) => {
    editCardInfo(cardInfo)
  }

  return {
    addCard,
    getCard,
    editCard,
  }
}
