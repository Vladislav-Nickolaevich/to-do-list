import {TasksStateType} from "../App";
import {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC, removeTodolistAC,
    taskReducer

} from "./task-reducer";
import {addTodolistAC} from "./todolist-reducer";


test('Should remove task', () => {
    const startState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},

        ],
        'todolistID2': [
            {id: '1', title: "Auto", isDone: false},
            {id: '2', title: "Scissors", isDone: true},
            {id: '3', title: "Mobile Phone", isDone: false},
        ],
    }


    const endState = taskReducer(startState, removeTaskAC('todolistID1','2' ))

    expect(endState).toEqual({
        'todolistID1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '3', title: "React", isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: "Auto", isDone: false},
            {id: '2', title: "Scissors", isDone: true},
            {id: '3', title: "Mobile Phone", isDone: false},
        ],
    })
})

test('Should add task', () => {
    const startState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},

        ],
        'todolistID2': [
            {id: '1', title: "Auto", isDone: false},
            {id: '2', title: "Scissors", isDone: true},
            {id: '3', title: "Mobile Phone", isDone: false},
        ],
    }
    const endState = taskReducer(startState, addTaskAC('todolistID1', 'TS'))

    expect(endState).toEqual({
        'todolistID1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
            {id: '4', title: "TS", isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: "Auto", isDone: false},
            {id: '2', title: "Scissors", isDone: true},
            {id: '3', title: "Mobile Phone", isDone: false},
        ],
    })
    expect(endState['todolistID1'].length).toBe(4)
    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID1'][0].id).toBe('1')
    expect(endState['todolistID1'][3].id).toBe('4')
    expect(endState['todolistID1'][3].title).toBe('TS')
    expect(endState['todolistID1'][3].isDone).toBe(false)
})

test('Status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},

        ],
        'todolistID2': [
            {id: '1', title: "Auto", isDone: false},
            {id: '2', title: "Scissors", isDone: true},
            {id: '3', title: "Mobile Phone", isDone: false},
        ],
    }

    const endState = taskReducer(startState, changeTaskStatusAC('2', false, 'todolistID2'))

    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID2'][1].isDone).toBe(false)
    expect(endState['todolistID1'][1].isDone).toBe(true)
})

test('Title should be changed', () => {
    const startState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: "Auto", isDone: false},
            {id: '2', title: "Scissors", isDone: true},
            {id: '3', title: "Mobile Phone", isDone: false},
        ],
    }

    const endState = taskReducer(startState, changeTaskTitleAC('2', 'iPad Air', 'todolistID2'))

    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID2'][1].title).toBe('iPad Air')
    expect(endState['todolistID1'][1].title).toBe("JS")
})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},
        ],
        'todolistID2': [
            {id: '1', title: "Auto", isDone: false},
            {id: '2', title: "Scissors", isDone: true},
            {id: '3', title: "Mobile Phone", isDone: false},
        ],
    }

    const endState = taskReducer(startState, addTodolistAC('New Todolist'))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistID1' && k != 'todolistID2')
    if(!newKey){
        throw  Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistID should be deleted', () => {
    const startState: TasksStateType = {
        'todolistID1': [
            {id: '1', title: "HTML & CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "React", isDone: false},

        ],
        'todolistID2': [
            {id: '1', title: "Auto", isDone: false},
            {id: '2', title: "Scissors", isDone: true},
            {id: '3', title: "Mobile Phone", isDone: false},
        ],
    }

    const endState = taskReducer(startState, removeTodolistAC('todolistID2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).toBeUndefined()
})