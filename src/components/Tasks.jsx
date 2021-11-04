import React from "react";

import { PenIco, CheckIco } from "../assets/img";
export default function Tasks({ list, editTitle }) {
  const [popupTitleEdit, setPopupTitleEdit] = React.useState(false);
  const [titleInputVal, setTitleInputVal] = React.useState("");

  React.useEffect(() => {
    setTitleInputVal(list.name);
    setPopupTitleEdit(false);
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

        {list.tasks.length > 0 ? renderTasks() : <h3>Задачи отсутствуют.</h3>}
        <div className="tasks__items"></div>
      </div>
    </>
  );
}
