import React, {memo} from "react";
import {Button} from "@mui/material";

type ButtonWithMemoType = {
    title: string
    onClick: () => void
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    size: string
}
export const ButtonWithMemo = memo((props: ButtonWithMemoType) => {
    return (
        <Button
            sx={{fontSize: `${props.size}px`}}
            color={props.color}
            onClick={props.onClick}
        >
            {props.title}
        </Button>)
})