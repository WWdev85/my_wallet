import { ReactElement } from 'react';

import { OperationGroup } from '../../../types';
import { FaSuitcase, FaUtensils } from "react-icons/fa";

import './Group.scss';

interface GroupProps {
    group: OperationGroup
    className?: string;
}

export const Group = (props: GroupProps) => {
    const { group, className } = props;
    let icon: ReactElement = <></>;

    switch (group.value) {
        case 'food':
            icon = <FaUtensils style={{ backgroundColor: `${group.color}` }} className='group__icon' />
            break;
        case 'salary':
            icon = <FaSuitcase style={{ backgroundColor: `${group.color}` }} className='group__icon' />
            break;

    }
    return (
        <div className={`group ${className}`}>
            {icon}
            <div className='group__name'>{group.label}</div>

        </div>
    )
}