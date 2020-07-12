import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import TodoItem from "./Components/TodoItem";
import tick from "./img/tick.svg";

class App extends Component {
    constructor() {
        super();
        this.keyStorage = "todo";
        this.state = {
            newItem: "",
            TodoItems: [].concat(JSON.parse(localStorage.getItem(this.keyStorage)))
        };
        this.onItemClicked = this.onItemClicked.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onItemClicked(item) {
        return (event) => {
            let isComplete = item.isComplete;
            let { TodoItems } = this.state;
            let index = TodoItems.indexOf(item);
            this.setState({
                TodoItems: [
                    ...TodoItems.slice(0, index),
                    {
                        ...item,
                        isComplete: !isComplete,
                    },
                    ...TodoItems.slice(index + 1),
                ],
            });
        };
    }

    onKeyUp(event) {
        if (event.keyCode === 13) {
            let { TodoItems } = this.state;
            let item = event.target.value;
            if (!item) {
                return;
            }

            item = item.trim(); // loai bo dau cach o dau va cuoi hang
            if (!item) {
                return;
            }
            localStorage.setItem(
                "todo", 
                JSON.stringify(TodoItems)
            );
            this.setState({
                newItem: "",
                TodoItems: [
                    {
                        title: item,
                        isComplete: false
                    },
                    ...TodoItems
                ],
            });

            // TodoItems = TodoItems.concat(JSON.parse(localStorage.getItem(this.keyStorage)));    
        }

    }

    onChange(event) {
        this.setState({
            newItem: event.target.value,
        });
    }

    render() {
        let {TodoItems} = this.state;
        // let TodoItems = (JSON.parse(localStorage.getItem(this.keyStorage)));
        if (TodoItems.length) {
            return (
                <div className='App'>
                    <div className='create-input'>
                        <img src={tick} width={30} height='auto' />
                        <input
                            type='text'
                            placeholder='What is your item ?'
                            value={this.state.newItem}
                            onChange={this.onChange}
                            onKeyUp={this.onKeyUp}
                        />
                    </div>
                    {TodoItems.map((item, index) => (
                        <TodoItem
                            key={index}
                            items={item}
                            onClick={this.onItemClicked(item)}
                        />
                    ))}
                </div>
            );
        } else {
            return(
                <div className='App'>
                    <div className='create-input'>
                        <img src={tick} width={30} height='auto' />
                        <input
                            type='text'
                            placeholder='What is your item ?'
                            value={this.state.newItem}
                            onChange={this.onChange}
                            onKeyUp={this.onKeyUp}
                        />
                    </div>
                </div>
            );
        }
    }
}

export default App;
