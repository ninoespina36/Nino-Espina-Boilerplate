import { createSlice, PayloadAction  } from '@reduxjs/toolkit';

export interface Todo {
    id: number
    description: string
    isCompleted: boolean
    createdAt: Date | null
    completedAt: Date | null
}

interface TodoState {
    todos: Todo[]
}

const initialState: TodoState =  {
    todos: []
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    markCompleteTodo: (state, { payload }: PayloadAction<Todo>) => {
        const todoIndex = state.todos.findIndex(todo => todo.id === payload.id);
        state.todos[todoIndex].isCompleted = true;
        state.todos[todoIndex].completedAt = new Date()
    },
    unmarkCompleteTodo: (state, { payload }: PayloadAction<Todo>) => {
        const todoIndex = state.todos.findIndex(todo => todo.id === payload.id);
        state.todos[todoIndex].isCompleted = false;
    },
    addTodo: (state, { payload }: PayloadAction<Todo>) => {
        state.todos.unshift(payload)
    },
    clearCompleted: (state) => {
        const newTodos = state.todos.filter(todo => !todo.isCompleted);
        state.todos = newTodos;
    },
  }
})


// Export functions so that can be used anywhere in the app
export const { 
    addTodo,
    markCompleteTodo,
    unmarkCompleteTodo,
    clearCompleted
} = todoSlice.actions;

export default todoSlice.reducer;