import React from "react";
import classNames from "classnames";
import { CrossIco } from "../assets/img";

export default function List({
  items,
  isRemovable,
  onPopup,
  onRemoveList,
  selectList,
  activeList,
}) {
  return (
    <>
      <ul className={"todo__list"} onClick={onPopup}>
        {items.map((item, idx) => {
          return (
            <li
              className={classNames(item.className, {
                active: activeList && item.id === activeList.id,
              })}
              key={idx}
              onClick={(e) => {
                selectList && selectList(item, e);
              }}
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
                <span className="counter">
                  ({item.tasks && item.tasks.length})
                </span>
              )}
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
