import React from "react";
import classNames from "classnames";

export default function List({ items, isRemovable, onPopup }) {
  return (
    <>
      <ul className={"todo__list"} onClick={onPopup}>
        {items.map((item, idx) => {
          return (
            <li
              className={classNames(item.className, {
                active: item.active,
              })}
              key={idx}
            >
              <i>
                {item.icon ? (
                  item.icon
                ) : (
                  <i
                    className="badge"
                    style={{
                      background: item.color,
                    }}
                  ></i>
                )}
              </i>
              <span> {item.name}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
