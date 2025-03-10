
type Props = {
    title: string,
    disabled?: boolean,
    onClickHandler?: () => void
}

export const Button = ({title, onClickHandler, disabled}: Props) => {
    return <button onClick={onClickHandler} disabled={disabled}>{title}</button>
};
