import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { PenIco, CheckIco, PlusIco, CrossIco } from "../assets/img";
export default function Tasks({
  list,
  editTitle,
  onAdd,
  onRemove,
  onEdit,
  onComplete,
  setPath,
}) {
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
        <Task
          task={task}
          list={list}
          onRemove={onRemove}
          onEdit={onEdit}
          onComplete={onComplete}
          key={task.id}
        />
      );
    });
  const closeAddTaskField = () => {
    setAddTaskVisible(false);
    setAddTaskInputVal("");
  };
  const addTask = (list, inputVal) => {
    setIsLoading(true);
    axios
      .post("http://localhost:3002/tasks", {
        listId: list,
        text: inputVal,
        completed: false,
      })
      .then(({ data }) => {
        onAdd(data);
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
          <Link
            to={`/lists/${list.id}`}
            onClick={() => {
              setPath && setPath(`/lists/${list.id}`);
            }}
          >
            {list.name}
            <i
              onClick={() => {
                setPopupTitleEdit(!popupTitleEdit);
              }}
            >
              <PenIco />
            </i>
          </Link>
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

function Task({ task, list, onRemove, onEdit, onComplete }) {
  const [popupTaskEdit, setPopupTaskEdit] = React.useState(false);
  const [taskInputVal, setTaskInputVal] = React.useState(task.text);
  const [completed, setCompleted] = React.useState(task.completed);

  return (
    <>
      <div className="tasks__items-row">
        <div className="tasks__checkbox">
          <input
            type="checkbox"
            name=""
            id={"checkbox" + task.id}
            checked={task.completed}
            onChange={(e) => {
              setCompleted(!completed);
              onComplete(task.id, !completed);
            }}
          />
          <label htmlFor={"checkbox" + task.id}>
            <CheckIco />
          </label>
        </div>
        <p>{task.text}</p>
        <div className="taskCtr">
          <i
            className="taskEdit"
            onClick={() => setPopupTaskEdit(!popupTaskEdit)}
          >
            <PenIco />
          </i>
          <i
            className="taskRemove"
            onClick={() => {
              onRemove(task.id, list.id);
            }}
          >
            <CrossIco />
          </i>
        </div>
        {popupTaskEdit && (
          <div className="editBlock editTaskBlock">
            <input
              type="text"
              placeholder="Новое название"
              className="field"
              value={taskInputVal}
              onChange={(e) => {
                setTaskInputVal(e.target.value);
              }}
            />
            <div className="editBtns">
              <button
                disabled={!taskInputVal}
                onClick={() => {
                  onEdit(task.id, list.id, taskInputVal);
                  setPopupTaskEdit(false);
                }}
              >
                Изменить
              </button>
              <button
                onClick={() => {
                  setPopupTaskEdit(false);
                  setTaskInputVal(task.text);
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
