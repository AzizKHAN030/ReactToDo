import React from "react";

import { PenIco, CheckIco } from "../assets/img";
export default function Tasks({ list }) {
  return (
    <>
      <div className="todo__tasks">
        <h2>
          {list.name} <PenIco />
        </h2>

        <div className="tasks__items">
          {list.tasks.map((task) => {
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
          })}
        </div>
      </div>
    </>
  );
}
