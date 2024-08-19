import { OperationGroup, OperationType } from "../types";

export const groups: OperationGroup[] = [
    {
        value: 'food',
        label: "żywność",
        type: OperationType.expense,
        color: "#ebae34"
    },
    {
        value: 'salary',
        label: "wynagrodzenie",
        type: OperationType.income,
        color: "#4e9923"
    },

]