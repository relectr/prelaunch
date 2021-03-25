// The button componenets
function Button({ type, color, text, onClick }) {
    return (
        <button onClick={ onClick } type={ type } className={`${ color } pt-3 pb-2.5 px-4 rounded text-white`}>
            { text }
        </button>
    )
}

export default Button
