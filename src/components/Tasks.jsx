import React from "react";
import axios from "axios";

import { PenIco, CheckIco, PlusIco } from "../assets/img";
export default function Tasks({ list, editTitle, onAddTask }) {
  const [popupTitleEdit, setPopupTitleEdit] = React.useState(false);
  const [titleInputVal, setTitleInputVal] = React.useState("");
  const [addTaskVisible, setAddTaskVisible] = React.useState(false);
  const [addTaskInputVal, setAddTaskInputVal] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setTitleInputVal(list.name);
    setPopupTitleEdit(false);
    closeAddTaskField();
  }, [list]);

  const renderTasks = () =>
    list.tasks.map((task) => {
      return (
        <div className="tasks__items-row" key={task.id}>
          <div className="tasks__checkbox">
            <input type="checkbox" name="" id={"checkbox" + task.id} />
            <label htmlFor={"checkbox" + task.id}>
              <CheckIco />
            </label>
          </div>
          <p>{task.text}</p>
        </div>
      );
    });
  const closeAddTaskField = () => {
    setAddTaskVisible(false);
    setAddTaskInputVal("");
  };
  const addTask = (list, inputVal) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3002/tasks", { listId: list, text: inputVal })
      .then(({ data }) => {
        onAddTask(data);
      })
      .finally(() => {
        setIsLoading(false);
        closeAddTaskField();
      });
  };
  return (
    <>
      <div className="todo__tasks">
        <h2 style={{ color: list.color.hex }}>
          {list.name}
          <i
            onClick={() => {
              setPopupTitleEdit(!popupTitleEdit);
            }}
          >
            <PenIco />
          </i>
        </h2>
        {popupTitleEdit && (
          <div className="editBlock">
            <input
              type="text"
              placeholder="Новое название"
              className="field"
              value={titleInputVal}
              onChange={(e) => {
                setTitleInputVal(e.target.value);
              }}
            />
            <div className="editBtns">
              <button
                disabled={!titleInputVal}
                onClick={() => {
                  editTitle(list.id, titleInputVal);
                  setPopupTitleEdit(false);
                }}
              >
                Изменить
              </button>
              <button
                onClick={() => {
                  setPopupTitleEdit(false);
                  setTitleInputVal(list.name);
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        )}

        <div className="tasks__items">
          {list.tasks.length > 0 ? renderTasks() : <h3>Задачи отсутствуют.</h3>}
          <div className="addTaskBlock">
            {addTaskVisible ? (
              <div className="addTaskField">
                <input
                  type="text"
                  className="field"
                  placeholder="Текст задачи"
                  onChange={(e) => setAddTaskInputVal(e.target.value)}
                />
                <div className="addTaskBtns">
                  <button
                    disabled={!addTaskInputVal || isLoading}
                    onClick={() => {
                      addTask(list.id, addTaskInputVal);
                    }}
                  >
                    {isLoading ? "Добавление..." : " Добавить задачу"}
                  </button>
                  <button onClick={closeAddTaskField}>Отмена</button>
                </div>
              </div>
            ) : (
              <button
                className="addTaskBtn"
                onClick={() => setAddTaskVisible(true)}
              >
                <PlusIco /> <span>Новая задача </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
