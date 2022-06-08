import { useState } from 'react'

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    const reset = () => {
        setValue("")
    }
    const bind = {
        onChange(e) {
            setValue(e.target.value)
        },
        value
    }
    return [value, bind, reset]
}

export default useInput