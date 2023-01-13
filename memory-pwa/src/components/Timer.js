import { useState, useRef, useEffect } from "react"

const formatTime = (time) => {
    let minutes = Math.floor(time / 60)
    let secondes = Math.floor(time - minutes * 60)

    if (minutes <= 10) minutes = '0' + minutes;
    if (secondes <= 10) secondes = '0' + secondes;

    return minutes + ':' + secondes
}

export default function Timer({secondes}) {
    const [countDown, setCountDown] = useState(secondes)
    const timerId = useRef()

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountDown(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
    } ,[])

    useEffect(() => {
        if (countDown <= 0){
            clearInterval(timerId.current)
            alert("Tu est trop nul 😂, recharge la page pour recommencer")
        }
    })

    return (
        <h5>Timer: {formatTime(countDown)}</h5>
    )
}