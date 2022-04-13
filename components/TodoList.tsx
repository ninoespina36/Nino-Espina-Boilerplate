import { useRef } from "react";
import { useState, FormEvent, useMemo } from "react";
import toast from 'react-hot-toast';

import { useAppSelector, useAppDispatch } from "../store/hooks";
import { markCompleteTodo, unmarkCompleteTodo, Todo, addTodo, clearCompleted } from '../store/reducers/todoReducer';
import TodoItem from './TodoItem';

const TodoList = () =>{

    const initialState = {
        id: 0,
        description: '',
        isCompleted: false,
        createdAt: null,
        completedAt: null
    }

    const { todos } = useAppSelector(state => state.todo);
    const [ search, setSearch ] = useState<string>('');
    const [ state, setState ] = useState<Todo>(initialState);
    const dispatch = useAppDispatch();
    const modalCloseBtn = useRef<HTMLAnchorElement>(null)

    const handleSearch = (e: FormEvent<HTMLInputElement>) =>{
        const { value } = e.currentTarget;
        setSearch(value)
    }

    const handleChange = (e: FormEvent<HTMLInputElement>) =>{
        const { value, name } = e.currentTarget;
        setState({
            ...state,
            [ name ]: value
        })
    }

    const handleSubmit = (e: FormEvent) =>{
        e.preventDefault();
        dispatch(addTodo({
            ...state,
            id: Math.random(),
            description: state.description,
            createdAt: new Date()
        }));
        modalCloseBtn?.current?.click();
        setState(initialState);
        toast.success('Todo successfully added!');
    }

    const unCompletedTodos = useMemo(()=>{
        return todos.filter(todo => !todo.isCompleted && todo.description.match(search))
    }, [ search, todos ]);

    const completedTodos = useMemo(()=>{
        return todos.filter(todo => todo.isCompleted)
    }, [ todos ]);

    return (
        <div>

            {/* Add Todo modal */}
            <div className="modal" id="add-todo">
                <div className="modal-box relative">
                    <a 
                        href="#" 
                        ref={modalCloseBtn} 
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >✕</a>
                    <h3 className="text-lg font-bold">Add Todo</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Describe your todo</span>
                            </label>
                            <input 
                                required
                                type="text" 
                                placeholder="Type the description here" 
                                className="input input-bordered w-full mb-3"
                                value={state.description}
                                name="description"
                                onChange={handleChange}
                            />
                            <button
                                type="submit"
                                className="btn no-animation"
                            >
                                Add Todo
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Uncompleted Todos */}
            <div className="lg:grid grid-cols-2 gap-x-10">
                <div className="col-span-1">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-3">Todos</h1>
                        <div className="tooltip" data-tip="Add Todo">
                            <a href="#add-todo" className="btn btn-circle btn-sm">
                                <span className="material-icons-outlined">add</span>
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center my-3 gap-x-1">
                        <span className="material-icons-outlined text-gray-400">search</span>
                        <input 
                            type="text"
                            className="input ml-2 input-ghost w-full" 
                            placeholder="Search Todo"
                            onChange={handleSearch}
                        />
                    </div>

                    {!unCompletedTodos.length ? (
                        <p className="text-gray-500 text-sm mt-10 text-center">No todos to display</p>
                    ) : (
                        <ul>
                            {unCompletedTodos.map((todo, index)=> (
                                <TodoItem 
                                    key={index}
                                    todo={todo} 
                                    onClick={()=>{
                                        toast.success('Todo completed');
                                        dispatch(markCompleteTodo(todo))
                                    }}
                                />
                            ))}
                        </ul>
                    )}
                </div>

                {/* Completed Todos */}
                <div className="col-span-1 lg:mt-0 mt-5">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-2xl font-bold mb-3">Completed</h1>
                        <div className="tooltip" data-tip="Reset">
                            <button 
                                onClick={()=> {
                                    toast.success('Completed todos cleared!');
                                    dispatch(clearCompleted())
                                }} 
                                className="btn btn-circle btn-sm"
                            >
                                <span className="material-icons-outlined">restart_alt</span>
                            </button>
                        </div>
                    </div>

                    {!completedTodos.length ? (
                        <p className="text-gray-500 text-sm mt-10 text-center">No completed todos yet</p>
                    ) : (
                        <ul>
                            {completedTodos.filter(todo => todo.isCompleted).map((todo, index)=> (
                                <TodoItem 
                                    key={index}
                                    todo={todo} 
                                    onClick={()=>{
                                        toast('Todo marked uncomplete');
                                        dispatch(unmarkCompleteTodo(todo))
                                    }}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TodoList;