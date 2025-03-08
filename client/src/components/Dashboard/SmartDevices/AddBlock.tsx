import { AddBlockProps } from '../../../types';

export default function AddBlock({ onClick, text, icon }: AddBlockProps) {
    return (
        <div className="device__block add__device__block" onClick={onClick}>
            <img src={icon} alt={text} className="add__device__block__image"/>
            <p className="device__block__text">{text}</p>
        </div>
    );
}