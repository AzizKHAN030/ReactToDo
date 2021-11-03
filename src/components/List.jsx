import React from "react";
import classNames from "classnames";
import { CrossIco } from "../assets/img";

export default function List({ items, isRemovable, onPopup, onRemoveList }) {
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
                      background: item.color.hex,
                    }}
                  ></i>
                )}
              </i>
              <span> {item.name}</span>
              {isRemovable && (
                <i onClick={() => onRemoveList(item)}>
                  <CrossIco />
                </i>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
