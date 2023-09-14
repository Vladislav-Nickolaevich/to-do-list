import {updateTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer, TasksStateType} from "../features/task-reducer";
import {addTodolistAC, removeTodolistAC} from "../features/todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/task-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'todolistID1': [
            {
                id: '1', title: "HTML & CSS", status: TaskStatuses.Completed, todoListId: 'todolistID1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: '2', title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistID1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: '3', title: "React", status: TaskStatuses.New, todoListId: 'todolistID1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
        'todolistID2': [
            {
                id: '1', title: "Auto", status: TaskStatuses.New, todoListId: 'todolistID2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: '2', title: "Mobile Phont", status: TaskStatuses.Completed, todoListId: 'todolistID2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
    }
})

test('Should remove task', () => {
    const endState = taskReducer(startState, removeTaskAC('todolistID1', '2'))

    expect(endState).toEqual({
        'todolistID1': [
            {
                id: '1', title: "HTML & CSS", status: TaskStatuses.Completed, todoListId: 'todolistID1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: '3', title: "React", status: TaskStatuses.New, todoListId: 'todolistID1', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
        'todolistID2': [
            {
                id: '1', title: "Auto", status: TaskStatuses.New, todoListId: 'todolistID2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: '2', title: "Mobile Phont", status: TaskStatuses.Completed, todoListId: 'todolistID2', startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
    })
})


test('Status of specified task should be changed', () => {
    const endState = taskReducer(startState, updateTaskStatusAC('2', TaskStatuses.New, 'todolistID2'))

    expect(endState['todolistID2'].length).toBe(2)
    expect(endState['todolistID2'][1].status).toBe(TaskStatuses.New,)
    expect(endState['todolistID1'][1].status).toBe(TaskStatuses.New,)
})

test('Title should be changed', () => {
    const endState = taskReducer(startState, changeTaskTitleAC('2', 'iPad Air', 'todolistID2'))

    expect(endState['todolistID2'].length).toBe(2)
    expect(endState['todolistID2'][1].title).toBe('iPad Air')
    expect(endState['todolistID1'][1].title).toBe("JS")
})

test('new array should be added when new todolist is added', () => {
    const newTodo = {
        id: "a2dfe62b-ebce-4b37-9581-1cc77ebc999f",
        title: 'New Todolist',
        addedDate: "",
        order: 0
    }
    const endState = taskReducer(startState, addTodolistAC(newTodo))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistID1' && k != 'todolistID2')
    if(!newKey){
        throw  Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistID should be deleted', () => {
    const endState = taskReducer(startState, removeTodolistAC('todolistID2'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).toBeUndefined()
})