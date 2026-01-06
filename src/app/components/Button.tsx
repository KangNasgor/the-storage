export default function Button({ text, background, color } : { text : string, background : string, color : string }) {
    return(
        <div className='bg-white rounded-3xl px-5 py-3 cursor-pointer active:scale-90 transition-transform duration-100' style={{
            backgroundColor : background
        }}>
            <h1 style={{
                color: color,
            }}>{text}</h1>
        </div>
    )
}