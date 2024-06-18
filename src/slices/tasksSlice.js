import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState ={
    tasksList:[],
    isLoading:false,
    error:''
    
}

//get
export const getTasksFromServer = createAsyncThunk(
    "tasks/getTasksFromServer",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const data = await response.json();
        return data; // Return the response data
      } catch (error) {
        rejectWithValue(error.message);
      }
    }
  );

//post
export const addTaskToServer= createAsyncThunk(
    "tasks/addTaskToServer",
    async(task,{rejectWithValue})=>{
        try {
            const options={
                method:'POST',
                body:JSON.stringify(task),
                headers:{
                    'Content-Type' : 'application/json; charset=utf-8'
                }
            }
            const response=await fetch('http://localhost:3000/tasks',options)
            const data=await response.json()
            return data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

//patch
export const updateTaskInServer= createAsyncThunk(
    "tasks/updateTaskInServer",
    async(task,{rejectWithValue})=>{
        try {
            const options={
                method:'PATCH',
                body:JSON.stringify(task),
                headers:{
                    'Content-Type' : 'application/json; charset=utf-8'
                }
            }
            const response=await fetch(`http://localhost:3000/tasks/${task.id}`,options)
            const data=await response.json()
            return data
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)

//delete
export const deleteTaskFromServer = createAsyncThunk(
    "tasks/deleteTaskFromServer",
    async (task, { rejectWithValue }) => {
      try {
        const options = {
          method: 'DELETE',
        };
        const response = await fetch(`http://localhost:3000/tasks/${task.id}`, options);
  
        const data=await response.json();
        return data
  
      } catch (error) {
        return rejectWithValue(error.message);  // Corrected typo
      }
    }
  );
const taskSlice=createSlice({
    name:'tasksSlice',
    initialState,
    reducers:{
            remove:(state,action)=>{
                state.tasksList=state.tasksList.filter((task)=>task.id !==action.payload)
            }
    },
    extraReducers:(builder)=>{
        builder

        //get
        .addCase(getTasksFromServer.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getTasksFromServer.fulfilled,(state,action)=>{
            state.isLoading=false
            state.error=''
            state.tasksList=action.payload
        })
        .addCase(getTasksFromServer.rejected,(state,action)=>{
            state.error=action.payload.error
            state.isLoading=false
            state.tasksList=[]
        })

        //add
        .addCase(addTaskToServer.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addTaskToServer.fulfilled,(state,action)=>{
            state.isLoading=false
            state.error=''
            state.tasksList.push(action.payload)
        })
        .addCase(addTaskToServer.rejected,(state,action)=>{
            state.error=action.payload.error
            state.isLoading=false
            
        })
        //Patch
        .addCase(updateTaskInServer.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateTaskInServer.fulfilled,(state,action)=>{
            state.isLoading=false
            state.error=''
            state.tasksList=state.tasksList.map((task)=>task.id===action.payload.id ?action.payload:task)
        })
        .addCase(updateTaskInServer.rejected,(state,action)=>{
            state.error=action.payload.error
            state.isLoading=false
            
        })
      //delete
        .addCase(deleteTaskFromServer.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(deleteTaskFromServer.fulfilled,(state,action)=>{
            state.isLoading=false
            state.error=''
          
        })
        .addCase(deleteTaskFromServer.rejected,(state,action)=>{
            state.error=action.payload.error
            state.isLoading=false
            
        })
    }
})
export const {remove}=taskSlice.actions

export default taskSlice.reducer