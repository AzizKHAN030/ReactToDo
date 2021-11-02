import React from "react";
import classNames from "classnames";

import PlusIco from "../assets/img/PlusIco";
import List from "./List";
import CrossIco from "../assets/img/CrossIco";

export default function AddListButton({ colors }) {
  const [popup, setPopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(colors[0].id);
  const onPopup = () => {
    setPopup(!popup);
  };
  const onSelectColor = (id) => {
    setSelectedColor(id);
  };
  return (
    <>
      <div className="add-list">
        <List
          items={[
            {
              className: "todo__list-addbtn",
              icon: <PlusIco />,
              name: "Добавить список",
            },
          ]}
          onPopup={onPopup}
        />
        {popup && (
          <div className="add-list-popup">
            <input
              type="text"
              placeholder="Название списка"
              className="field"
            />
            <div className="popup-colors">
              {colors.map((color) => {
                return (
                  <i
                    className={classNames("badge", {
                      active: selectedColor === color.id,
                    })}
                    style={{ background: color.hex }}
                    key={color.id}
                    onClick={() => {
                      onSelectColor(color.id);
                    }}
                  ></i>
                );
              })}
            </div>
            <button className="popup-btn">Добавить</button>
            <button className="popup-close" onClick={onPopup}>
              <CrossIco />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
