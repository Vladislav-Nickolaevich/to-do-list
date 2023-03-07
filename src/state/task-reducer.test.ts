import {TasksStateType} from "../App";
import {AddAC, ChangeTaskStatusAC, RemoveAC, TaskReducer} from "./task-reducer";

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


    const endState = TaskReducer(startState, RemoveAC('todolistID1','2' ))

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
    const endState = TaskReducer(startState, AddAC('todolistID1', 'TS'))

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

    const endState = TaskReducer(startState, ChangeTaskStatusAC('2', false, 'todolistID2'))

    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID2'][1].isDone).toBe(false)
    expect(endState['todolistID1'][1].isDone).toBe(true)
})