import React, { Component } from "react";
import "./TodoItem.css";
import checkImg from "../img/check.svg";
import checkComplete from "../img/checkComplete.svg";
class TodoItem extends Component {
    render() {
        const { items, onClick } = this.props;
        let className = "TodoItem";
        if (items.isComplete) {
            className += " complete";
        }

        let img = checkImg;
        if (items.isComplete) {
            img = checkComplete;
        }
        return (
            <div className={className}>
                <img onClick={onClick} src={img} style={imgStyle} />
                <p>{items.title}</p>
            </div>
        );
    }
}

const imgStyle = {
    width: "30px",
};

export default TodoItem;
