import { background } from "@chakra-ui/react";
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import ToDoTasks from "./todotasks";
const getToDo =async () => {
let todos = await fetch("http://localhost:3001/api/todo/list");
return todos.json();    

}
export default async function ToDoList(){
    const {todos} = await getToDo();
    
    return(
        <ul style={{ listStyleType:"none", background:"gray", padding:0}}>
              
            {
              
            todos.map((t: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) =>
            {
                return(<li key={t.id} style={{padding:"0 5px"}}>
                    <ToDoTasks tasks={t} />
                    </li>);
                
            })
            }
        </ul>
        
    )

}