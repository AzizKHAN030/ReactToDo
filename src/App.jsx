import React from "react";
import ListIco from "./assets/img/ListIco";
import AddListButton from "./components/AddListButton";

import DB from "./assets/db.json";

import List from "./components/List.jsx";

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[{ icon: <ListIco />, name: "Все задачи", active: true }]}
        />
        <List
          items={DB.lists.map((item) => {
            item.color = DB.colors.filter(
              (color) => color.id === item.colorId
            )[0].hex;
            return item;
          })}
          isRemovable
        />
        <AddListButton colors={DB.colors} />
      </div>
    </div>
  );
}

export default App;
