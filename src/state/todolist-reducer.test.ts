import {v1} from "uuid";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistReducer
} from './todolist-reducer'

let todolistID1: string
let todolistID2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
    todolistID2 = v1();
    startState = [
        {id: todolistID1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistID2, title: 'What to buy', filter: 'all', order: 1, addedDate: ''},
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';

    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
})

test('correct todolist should change its name', () => {
     let newTodolistTitle = 'New Todolist';

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistID2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
})


test('correct filter of todolist should be changed', () => {
     let newFilter: FilterValuesType = 'completed';

     const endState = todolistReducer(startState, changeFilterAC(todolistID2, newFilter))

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
})