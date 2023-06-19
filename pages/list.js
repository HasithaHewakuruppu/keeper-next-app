import React, { useEffect, useState } from "react";
import ToDoItem from "../components/toDoItem"
import InputArea from "../components/inputArea";
import styles from '../styles/app.module.css'

function List(props) {

  const dateFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  let listDate;

  if (props.date) {
    const [day, month, year] = props.date.split("-").map(Number);
    listDate = new Date(year, month - 1, day);
  } else {
    listDate = new Date();
  }
  const date = listDate.toLocaleDateString(undefined, dateFormatOptions);
  const [items, setItems] = useState([]);
  const listDateString = listDate.toLocaleDateString("en-GB");

  useEffect(() => {
    fetch(`/api/list?date=${listDateString}`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
  }, [props.date]);

  useEffect(() => {
    document.body.classList.add(styles["appBody"]);

    return () => {
      document.body.classList.remove(styles["appBody"]);
    };
  }, []);

  function addItem(inputText) {
    fetch("/api/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: inputText, date:listDateString }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setItems((prevItems) => [...prevItems, data]);
      })
      .catch((error) => console.log(error));
  }

  function deleteItem(id) {
    fetch("/api/deleteItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: id, date:listDateString }),
      credentials: "include",
    })
      .then(() => {})
      .catch((error) => console.log(error));

    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  }

  function handleLogOut() {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/";
        } else {
          alert("Logout failed: " + data.message);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleCalender() {
    window.location.href = "/calender";
  }

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="heading">
          <h1 className="heading">{date}</h1>
        </div>
        <InputArea onAdd={addItem} />
        <div>
          <ul>
            {items.map((todoItem) => (
              <ToDoItem
                key={todoItem._id}
                id={todoItem._id}
                text={todoItem.name}
                onChecked={deleteItem}
              />
            ))}
          </ul>
        </div>
      </div>
      <div>

      <div className="logoutButton">
        <button id="vertical-button" className="vb-top" onClick={handleLogOut}>
          <span>L</span>
          <span>O</span>
          <span>G</span>
          <span></span>
          <span>O</span>
          <span>U</span>
          <span>T</span>
        </button>
      </div>
      <div className="logoutButton">
        <button id="vertical-button" className="vb-bottom" onClick={handleCalender}>
          <span>C</span>
          <span>A</span>
          <span>L</span>
          <span>E</span>
          <span>N</span>
          <span>D</span>
          <span>A</span>
          <span>R</span>
        </button>
      </div>

      </div>
    </div>
  );
}

export default List;
