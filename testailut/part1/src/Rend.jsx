import { useState } from 'react'

const Display = ({counter}) => <div>{counter}</div>

const Button = ({handleClick, text}) => (
        <button onClick={handleClick}>
            {text}
        </button>
)

const Rend = () => {
    const [ counter, setCounter ] = useState(0)

    const increment = () => setCounter(counter + 1)
    const setToZero = () => setCounter(0)
    const decrement = () => setCounter(counter - 1)

    return (
        <div>
            <Display counter={counter} />
            <Button
                handleClick={increment}
                text="lisää >:)"
            />
            <Button
                handleClick={setToZero}
                text="nollaa :("
            />
            <Button
                handleClick={decrement}
                text="vähennä :)"
            />
        </div>
    )
}

export default Rend