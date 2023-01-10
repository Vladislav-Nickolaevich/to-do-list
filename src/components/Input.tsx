import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputType = {
    addTask:(title: string) => void
}
export const Input = (props:InputType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)
    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAdd()
        }
    }
    const onClickAdd = () => {
        if (value.trim() !== '') {
            props.addTask( value)
            setValue('')
            setError(null)
        } else {
            setValue('')
            setError('Title is required')
        }
    }
    return (
        <div>
            <input
                value={value}
                onChange={inputOnChangeHandler}
                onKeyDown={onKeyDownInput}
                className={error ? 'error' : ''}
            />
            <button onClick={onClickAdd}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};

