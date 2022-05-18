import { toast } from "react-toastify";

interface TaskProps<T> {
   todo: {
    _id: T
    task: T,
    completed: boolean,
    description: T,
   },
   refetch: ()=> void
}
 
 const Task = ({todo,refetch}: TaskProps<string>) => {
     const {task,description,_id, completed} = todo;

     
    const handleOnClick = (id: string) => {
        const completedTodo = {completed: true};
        (async () => {
            try {
                const res = await fetch(`https://morning-fjord-49700.herokuapp.com/completetask?id=${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(completedTodo)
                });
                const data = await res.json();
                if (data.success) {
                    toast.success("Task is marked as completed");
                    refetch();
                }
                else {
                }

            }
            catch (err: any) {
                console.error(err.message);
            }
        })();
}

    const handleDelete = (id: string) => {
           const proceed = window.confirm("Are you sure want to delete the task?");
           if(proceed){
            (async () => {
                try {
                    const res = await fetch(`https://morning-fjord-49700.herokuapp.com/deletetask?id=${id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-type': 'application/json'
                        }
                    });
                    const data = await res.json();
                    if (data.success) {
                        toast.success("Task is deleted successfully");
                        refetch();
                    }
                    else {
                    }
    
                }
                catch (err: any) {
                    console.error(err.message);
                }
            })();
           }
    }

     return (
         <div className="task-container">
             <h4>{task}</h4>
             <p>{description}</p>
             {completed ? "Task is completed" : <button onClick={() => handleOnClick(_id)} className="button">Complete</button>}
             <button className="button" onClick={() => handleDelete(_id)}>Delete</button>
          </div>
     )
 }
 
 export default Task;