import { ReactNode } from 'react';
import './Modal.scss';
import { FaRegCircleXmark } from 'react-icons/fa6';

interface OperationModalProps {
    title: string;
    setIsModalOpened: Function;
    children: ReactNode;
}

export const Modal = (props: OperationModalProps) => {
    const { title, setIsModalOpened, children } = props

    const handleCloseModal = () => {
        setIsModalOpened(false)
    }

    return (
        <div className='modal'>
            <div className='modal__background'></div>
            <div className='modal__content modal-content'>
                <div className='modal-content__title'>{title}<FaRegCircleXmark className='close' onClick={handleCloseModal} /></div>

                {children}
            </div>
        </div>
    )
}