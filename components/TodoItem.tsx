import { useMemo } from "react"
import { Todo } from "../store/reducers/todoReducer"

interface Props {
    todo: Todo
    onClick: ()=> void
}

const TodoItem = ({ todo, onClick } : Props) =>{

    const displayTime = useMemo(()=>{
        if(todo.isCompleted && !!todo.completedAt)
        return  `Completed at ${new Date(todo.completedAt).toLocaleDateString()} at ${new Date(todo.completedAt).toLocaleTimeString()}`;

        if(!!todo.createdAt)
        return `Created at ${new Date(todo.createdAt).toLocaleDateString()} at ${new Date(todo.createdAt).toLocaleTimeString()}`;
    }, [ todo.isCompleted, todo.completedAt, todo.createdAt ])
    
    return (
        <li 
            className="bg-white p-5 rounded-xl flex items-center gap-x-4 cursor-pointer hover:bg-gray-50 mb-3" 
            onClick={onClick}
        >
            <span className={`material-icons-outlined  ${todo.isCompleted ? 'text-sky-600': 'text-gray-400'}`}>check_circle_outline</span>
            <div>
                <p className="break-all mb-2">{todo.description}</p>
                <p className="text-xs text-gray-500">{displayTime}</p>
            </div>
        </li>
    )
}

export default TodoItem;