import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import '../../Styles/Styles.css';

export const ManageTodo = () => {
    const taskRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);

    const handleOnSubmit = (e: any) => {
            e.preventDefault();
            const task = taskRef?.current?.value;
            const description = descriptionRef?.current?.value;
            const todo = {task, description};
            (async () => {
                try {
                    const res = await fetch('https://morning-fjord-49700.herokuapp.com/addtask', {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(todo)
                    });
                    const data = await res.json();
                    if (data.success) {
                        e.target.reset();
                        toast.success("Task added successfully");
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
        <div>
             <form className="input-group" onSubmit={handleOnSubmit}>
                    <h4>Add Task</h4>
                    <input className="first-input" ref={taskRef} type="text" name="taskName" id="taskName" placeholder='Task Name' autoComplete='off' required />
                     <textarea placeholder="Add a shop description" ref={descriptionRef} name="taskDescription" id="taskDescription"></textarea>
                    <input className="form-submit" type="submit" value="ADD" />
                    <button className="btn"><Link className="link" to="/viewtask">View your task</Link></button>
                </form>
        </div>
    )
}