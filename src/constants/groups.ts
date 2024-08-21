import { OperationGroup, OperationType } from "../types";

export const groups: OperationGroup[] = [
    {
        value: 'food',
        label: "żywność",
        type: OperationType.expense,
        color: "#ebae34"
    },
    {
        value: 'entertainment',
        label: "rozrywka",
        type: OperationType.expense,
        color: "#873662"
    },
    {
        value: 'salary',
        label: "wynagrodzenie",
        type: OperationType.income,
        color: "#4e9923"
    },
    {
        value: 'payment',
        label: "wpłata własna",
        type: OperationType.income,
        color: "#574930"
    },


]