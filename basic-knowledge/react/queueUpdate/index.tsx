import React from 'react'
import { useEffect, useRef, useState } from 'react'

export default () => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [ count, updateCount ] = useState(0)

    const handleClick = () => {
        updateCount(count => count + 2)
    }

    // react15 0 -> 1 -> 3              
    // react16 0 -> 2 -> 3 NormalPriority 被打断
    useEffect(() => {
        const button = buttonRef.current
        setTimeout(() => updateCount(1), 1000)   // NormalPriority
        setTimeout(() => button?.click(), 1040)  // UserBlockingPriority 由于优先级高 打断NormalPriority，所以会先执行
    }, [])

    return (
        <div>
            <button ref={buttonRef} onClick={handleClick}>click add 2</button>
            <div>
                {
                    Array.from(new Array(50000)).map((_, index) => (
                        <div key={index}>{count}</div>
                    ))
                }
            </div>
        </div>
    )

}