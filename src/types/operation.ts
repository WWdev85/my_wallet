


export enum OperationType {
    expense = "wydatek",
    income = "przychód",
}

export interface OperationGroup {
    label: string,
    type: OperationType,
    color: string,
    value: string
}

export interface Operation {
    id: string,
    name: string,
    type: OperationType,
    group: string,
    date: Date,
    amount: number,
}