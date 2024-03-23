interface ICard {
  cardId: string
  cardName: string
  cardGroup: string
  cardDescription?: string
  cardChecklist?: ICardChecklist[]
  checklistTotal?: string | number | null
  checklistDone?: string | number | null
  checklistPercent?: string | number | null
}

interface IColumn {
  type: string
  title: string
  color: string
  items: ICard[]
}

interface ICardChecklist {
  id: string
  title: string
  checked: boolean
  isEdit: boolean
}

export { ICard, IColumn, ICardChecklist }
