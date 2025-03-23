
type Props = {
    title: string,
    disabled?: boolean,
    onClickHandler?: () => void
    className?: string
}

export const Button = ({title, onClickHandler, disabled, className}: Props) => {
    return <button className={className} onClick={onClickHandler} disabled={disabled}>{title}</button>
};
