export default function Button({ text, background, color } : { text : string, background : string, color : string }) {
    const backgroundColor : string = background.trim();
    const textColor : string = text.trim();
    return(
        <div className={`${backgroundColor.startsWith('bg-') ? backgroundColor : ''} rounded-3xl px-5 py-3 cursor-pointer active:scale-90 transition-transform duration-100`} style={{
            backgroundColor : backgroundColor.startsWith('bg-') ? undefined : backgroundColor
        }}>
            <h1 className={`${textColor.startsWith('text') ? textColor : ''}`} style={{
                color: textColor.startsWith('text') ? undefined : textColor,
            }}>{text}</h1>
        </div>
    )
}

// Provide background/text color in tailwind way or hexadecimal
