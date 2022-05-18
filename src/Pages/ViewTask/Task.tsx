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
                const res = await fetch(`http://localhost:5000/completetask?id=${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(completedTodo)
                });
                const data = await res.json();
                console.log(data);
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
     return (
         <div className="task-container">
             <h4>{task}</h4>
             <p>{description}</p>
             {completed ? "Task is completed" : <button onClick={() => handleOnClick(_id)} className="button">Complete</button>}
          </div>
     )
 }
 
 export default Task;