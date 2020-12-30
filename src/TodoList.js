import React, { Component } from "react";
import NewTodoForm from "./NewTodoForm";
import Todo from "./Todo";
import logo from "./logo.png";
import "./TodoList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

//local storage

  componentDidUpdate(){
    localStorage.setItem('todos',JSON.stringify(this.state.todos));
}
  componentDidMount(){
    const todos=JSON.parse(localStorage.getItem("todos"));
    if (todos!== null){
      this.setState({todos:todos})
    }
}



create(newTodo) {
  this.setState({
    todos: [...this.state.todos, newTodo]
  });
}

  remove(id) {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== id)
    });
  }

  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos});
  }

  toggleCompletion(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  render() {
    const todos = this.state.todos.map(todo => {
      return (
        <CSSTransition key={todo.id} timeout={500} classNames='todo'>
          <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            completed={todo.completed}
            removeTodo={this.remove}
            updateTodo={this.update}
            toggleTodo={this.toggleCompletion}
          />
        </CSSTransition>
      );
    });

  
  const animation1= (e)=>{
    const TodoList = document.querySelector(".TodoList");

    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    TodoList.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  };

  const animation2= (e)=>{

    const TodoList = document.querySelector(".TodoList");
    const h1 = document.querySelector("h1");
    const img = document.querySelector("img");
    const input = document.querySelector("input");
    const label = document.querySelector("label");
    const button= document.querySelector("button");
    const ul = document.querySelector("ul");
 
    TodoList.style.transition = "none";
    h1.style.transform = "translateZ(150px)";
    img.style.transition = "all 1s ease";
    img.style.transform = "translateZ(400px) rotateZ(30deg)";
    label.style.transform = "translateZ(125px)";
    button.style.transform = "translateZ(100px)";
    input.style.transform = "translateZ(75px)";
    ul.style.transform = "translateZ(150px)";
  };

  const animation3= (e)=>{

    const TodoList = document.querySelector(".TodoList");
    const h1 = document.querySelector("h1");
    const img = document.querySelector("img");
    const input = document.querySelector("input");
    const label = document.querySelector("label");
    const button= document.querySelector("button");
    const ul = document.querySelector("ul");


    TodoList.style.transition = "all 0.5s ease";
    TodoList.style.transform = `rotateY(0deg) rotateX(0deg)`;
  
    h1.style.transform = "translateZ(0px)";
    img.style.transform = "translateZ(0px) rotateZ(0deg)";
    label.style.transform = "translateZ(0px)";
    button.style.transform = "translateZ(0px)";
    input.style.transform = "translateZ(0px)";
    ul.style.transform = "translateZ(0px)";
  };



    return (
      <div  className="Container" 
      onMouseMove={animation1} onMouseEnter={animation2} onMouseLeave={animation3}
      >
      <div className='TodoList'>
        <div className="Title">
        <img src={logo} alt="logo" />
        <h1 >
          Get To Work! <span>An Animated Todo List By Daisy.</span>
        </h1>
        </div>
        <NewTodoForm createTodo={this.create} />

        <ul>
          <TransitionGroup className='todo-list'>{todos}</TransitionGroup>
        </ul>
      </div>
      </div>
    );
  }


}
export default TodoList;
