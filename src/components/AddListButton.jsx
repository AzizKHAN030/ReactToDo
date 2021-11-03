import React from "react";
import classNames from "classnames";
import axios from "axios";

import PlusIco from "../assets/img/PlusIco";
import List from "./List";
import CrossIco from "../assets/img/CrossIco";

export default function AddListButton({ colors, onAdd }) {
  const [popup, setPopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(3);
  const [inputVal, setInputVal] = React.useState("");
  const [disabledBtn, setDisabledBtn] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Array.isArray(colors) && setSelectedColor(colors[0].id);
  }, [colors]);

  const onAddList = () => {
    setIsLoading(true);
    setDisabledBtn(true);

    axios
      .post("http://localhost:3002/lists", {
        name: inputVal,
        colorId: selectedColor,
      })
      .then(({ data }) => {
        onAdd(data);
        setSelectedColor(colors[0].id);
        setInputVal("");
        setPopup(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
              onChange={(e) => {
                setInputVal(e.target.value);
                e.target.value ? setDisabledBtn(false) : setDisabledBtn(true);
              }}
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
            <button
              className="popup-btn"
              onClick={onAddList}
              disabled={disabledBtn}
            >
              {isLoading ? "Добавление" : " Добавить"}
            </button>
            <button className="popup-close" onClick={onPopup}>
              <CrossIco />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
