import { useQuery } from "react-query";
import Task from "./Task";

interface TodosType<T> {
    _id: T
     task: T,
     description: T,
     completed: boolean
}

export const ViewTask = ()=> {

    const {data:todos,isLoading,refetch} = useQuery('todo', () => fetch('http://localhost:5000/viewtask').then(res=> res.json()))

    if(isLoading){
        <p>Loading.....</p>
    }
    return (
        <div>
           {todos?.length === 0 ?<div><h3>"You don't added a single task yet</h3>
           <p>Please add some task that might help you to manage</p></div> : <h3>Your task lists in below</h3> }
        <div className="container">
            {
                todos?.map((todo: TodosType<string>) => (<Task key={todo._id} todo={todo} refetch={refetch}/>))
            }
        </div>
        </div>
    )
}