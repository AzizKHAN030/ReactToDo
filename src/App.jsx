import React from "react";
import axios from "axios";

import { List, AddListButton, Tasks } from "./components";
import { ListIco } from "./assets/img";

function App() {
  const [lists, setLists] = React.useState([]);
  const [colors, setColors] = React.useState(null);
  const [activeList, setActiveList] = React.useState(null);
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

  const onSelectList = (item, e) => {
    setActiveList(item);
    // console.log(selectedList);
  };

  const onEditTitle = (listId, inputVal) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.name = inputVal;
      }
      return list;
    });
    setLists(newList);
    axios
      .patch(`http://localhost:3002/lists/${listId}`, { name: inputVal })
      .catch(() => {
        alert("Не удалость изменить название списка");
      });
  };

  const onAddTask = (obj) => {
    const newTask = lists.map((list) => {
      if (list.id === obj.listId) {
        list.tasks = [...list.tasks, obj];
      }
      return list;
    });

    setLists(newTask);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[{ icon: <ListIco />, name: "Все задачи" }]} />
        <List
          items={lists}
          isRemovable
          onRemoveList={onRemoveList}
          selectList={onSelectList}
          activeList={activeList}
        />
        <AddListButton colors={colors} onAdd={onAddList} />
      </div>
      {lists && activeList && (
        <Tasks
          list={activeList}
          editTitle={onEditTitle}
          onAddTask={onAddTask}
        />
      )}
    </div>
  );
}

export default App;
