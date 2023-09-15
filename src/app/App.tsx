import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress"
import {useAppSelector} from "./store";
import {TodolistsList} from "../features/TodolistList";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Route, Routes, Navigate} from "react-router-dom";


function App() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar style={{height: '60px'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' &&
                    <div style={{marginTop: '60px', width: '100%', position: 'fixed'}}>
                        <LinearProgress color={"secondary"}/>
                    </div>}
            </AppBar>
            <Container fixed style={{marginTop: '40px'}}>
                <Routes>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/"} element={<TodolistsList/>}/>
                    <Route path={"*"} element={<Navigate to={'/404'}/>}/>
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
