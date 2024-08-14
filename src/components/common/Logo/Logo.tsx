import './Logo.scss';

interface LogoProps {
    className: string;
}

export const Logo = (props: LogoProps) => {
    const { className } = props;

    return (
        <div className={'logo ' + className}></div>
    )
}