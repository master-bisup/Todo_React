import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./ToDo.css";

function ToDo(){
    let [Todos, setTodos] = useState([
        {task: "", id: "", Time:"", isDone: false}
    ]); 
    let newTodo, time;
    let Tmark = "Mark as Done ✅";
    let Tunmark = "UN-mark ❌";
    function times(event){
        time = "at " + event.target.value;
    }
    function newVal(event){
        newTodo=event.target.value;   
    }
    function pushTask(){
        if(time){
            setTodos([...Todos,{task: newTodo, id: uuidv4(), Time:time, isDone: false}]);          
        }
        else{
            setTodos([...Todos,{task: newTodo, id: uuidv4(), Time:"", isDone: false}]);
        } 
    }        
    
    function trash(id){
        setTodos(Todos.filter((todo) => todo.id!=id));        
    }
    function trashAll(id){
        setTodos(Todos.filter((todo) => todo.id==id));        
    }
    function mark(id){
        setTodos((prevTodo) => 
        prevTodo.map((todo) => {
            if(todo.id==id){
                if(todo.isDone == false){
                    return {
                        ...todo,
                        isDone: true};
                }else{             
                    return {
                        ...todo,
                        isDone: false};
                }                
            }else{
                return todo;
            }
        }
        ));        
    }    
    
    return (
        <>
            <h1 className="keania-one-regular">Set Your Schedules</h1>
            <form className="row" >
                <div className="task">
                    <input type="text" className="form-control" placeholder="add tasks" onChange={newVal} value={newTodo}/>
                </div>
                <div className="time">
                    <label className="tl" htmlFor="time">At</label>
                    <input type="time" placeholder="Time" id="time"  className="form-control" onChange={times} value={time}/>
                </div>
                <button  type="button" className="btn btn-primary" onClick={pushTask} >Add</button>
            </form>            
            <ul >
                { 
                    Todos.map((el) =>(
                        <li className=
                        {
                            el.task=="" || el.task==undefined ?"non":""} key={el.id
                        }>
                            <span className={el.isDone? "marked":""}>
                                {el.task}  <b>{el.Time}</b>
                            </span>
                            <button onClick={() => mark(el.id)} type="button" className="btn m btn-outline-success">
                                {el.isDone? Tunmark:Tmark}
                            </button>
                            <i onClick={() => trash(el.id)} className="fa-solid fa-trash-can"></i>
                        </li>                
                    ))                                   
                }
                <button className="btn btn-outline-danger" onClick={trashAll}>Reset</button>            
            </ul>
        </>
    );
}

export default ToDo;