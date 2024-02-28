interface ICard {
    name: string;
    id: string;
    status: string;
}

interface IColumn {
    type: string,
    title: string,
    color: string,
    items: ICard[]
}

export { ICard, IColumn }