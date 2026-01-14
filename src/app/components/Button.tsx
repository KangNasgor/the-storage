type Button = {
    text : string,
    background : string,
    color : string,
    onClick? : React.MouseEventHandler<HTMLButtonElement>,
    type? : "submit" | "reset" | "button" | undefined,
    disabled? : boolean;
}

export default function Button({ text, background, color, onClick, type, disabled } : Button) {
    const backgroundColor : string = background.trim();
    const textColor : string = color.trim();
    return(
        <button disabled={disabled} type={type} onClick={onClick} className={`${backgroundColor.startsWith('bg-') ? backgroundColor : ''} rounded-3xl px-5 py-3 cursor-pointer active:scale-90 transition-transform duration-100`} style={{
            backgroundColor : backgroundColor.startsWith('bg-') ? undefined : backgroundColor
        }}>
            <h1 className={`${textColor.startsWith('text') ? textColor : ''}`} style={{
                color: textColor.startsWith('text') ? undefined : textColor,
            }}>{text}</h1>
        </button>
    )
}

// Provide background/text color in tailwind way or hexadecimal
