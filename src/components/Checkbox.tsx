import React, {ChangeEvent} from 'react';

type CheckboxType = {
    callBack: (eventValue:boolean) => void
    checked: boolean
}
export const Checkbox = (props:CheckboxType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.callBack(e.currentTarget.checked)

    return (
        <input
            type='checkbox'
            onChange={onChangeHandler}
            checked={props.checked}
        />
    );
};

