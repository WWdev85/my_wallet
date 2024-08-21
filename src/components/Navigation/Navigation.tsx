import { RouteInterface } from '../../App';
import { Link } from '../../components';
import './Navigation.scss';

interface NavigationProps {
    routes: RouteInterface[]
}

export const Navigation = (props: NavigationProps) => {
    const { routes } = props;
    const links = routes.map((route) => {
        return (
            <Link key={route.path} name={route.name} path={route.path} />
        )
    })

    return (
        <nav className='navigation'>
            <ul>
                {links}
            </ul>
        </nav>
    )
}