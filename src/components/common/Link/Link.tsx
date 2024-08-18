import { NavLink } from 'react-router-dom';
import './Link.scss';

interface LinkProps {
    name: string;
    path: string;
}

export const Link = (props: LinkProps) => {
    const { name, path } = props
    return (
        <li><NavLink to={path} className={({ isActive }) => isActive ? "active-link link" : 'link'}>{name}</NavLink></li>
    )
}