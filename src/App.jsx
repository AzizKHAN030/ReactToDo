import React from "react";
import axios from "axios";

import DB from "./assets/db.json";

import { List, AddListButton, Tasks } from "./components";
import { ListIco } from "./assets/img";

function App() {
  const [lists, setLists] = React.useState([]);
  const [colors, setColors] = React.useState(null);
  React.useEffect(() => {
    axios
      .get("http://localhost:3002/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3002/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  const onAddList = (obj) => {
    obj.color = {
      id: obj.colorId,
      hex: colors.filter((color) => color.id === obj.colorId)[0].hex,
    };
    setLists([...lists, obj]);
  };

  const onRemoveList = (obj) => {
    setLists((prev) => prev.filter((list) => list.id !== obj.id));
    axios.delete(`http://localhost:3002/lists/${obj.id}`);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[{ icon: <ListIco />, name: "Все задачи", active: true }]}
        />
        <List items={lists} isRemovable onRemoveList={onRemoveList} />
        <AddListButton colors={colors} onAdd={onAddList} />
      </div>
      {lists[0] && <Tasks list={lists[0]} />}
    </div>
  );
}

export default App;
