import React from "react";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";

import { List, AddListButton, Tasks } from "./components";
import { ListIco } from "./assets/img";

function App() {
  const [lists, setLists] = React.useState([]);
  const [colors, setColors] = React.useState(null);
  const [activeList, setActiveList] = React.useState(null);
  const [path, setPath] = React.useState("/");
  let history = useHistory();
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
  React.useEffect(() => {
    const listId = history.location.pathname.split("/lists/")[1];
    if (lists) {
      const list = lists.find((list) => list.id === Number(listId));
      list ? setActiveList(list) : setActiveList(null);
    }
  }, [lists, path, history.location.pathname]);

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
    // history.goBack();
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
  const onRemoveTask = (taskId, listId) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.filter((task) => task.id !== taskId);
      }
      return list;
    });
    setLists(newList);
    axios.delete(`http://localhost:3002/tasks/${taskId}`);
  };
  const onEditTask = (taskId, listId, inputVal) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks.map((task) => {
          if (task.id === taskId) {
            task.text = inputVal;
          }
          return list;
        });
      }
      return list;
    });
    setLists(newList);
    axios.patch(`http://localhost:3002/tasks/${taskId}`, { text: inputVal });
  };

  const onCompleteTask = (taskId, status) => {
    lists.map((list) => {
      list.tasks.map((task) => {
        if (task.id === taskId) {
          task.completed = status;
        }
        return list;
      });
      return list;
    });
    axios
      .patch(`http://localhost:3002/tasks/${taskId}`, { completed: status })
      .catch(() => {
        alert("Не удалость изменить название списка");
      });
  };
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[{ icon: <ListIco />, name: "Все задачи", all: activeList }]}
          onRemoveList={onRemoveList}
          activeList={activeList}
          onClickItem={() => {
            history.push("/");
            setPath(history.location.pathname);
          }}
        />
        <List
          items={lists}
          isRemovable
          onRemoveList={onRemoveList}
          activeList={activeList}
          onClickItem={(item) => {
            history.push(`/lists/${item.id}`);
            setPath(history.location.pathname);
          }}
        />
        <AddListButton colors={colors} onAdd={onAddList} />
      </div>
      <Route exact path="/">
        <div className="todo__tasks-block">
          {lists &&
            lists.map((list) => (
              <Tasks
                key={list.id}
                list={list}
                editTitle={onEditTitle}
                onAdd={onAddTask}
                onRemove={onRemoveTask}
                onEdit={onEditTask}
                onComplete={onCompleteTask}
                setPath={setPath}
              />
            ))}
        </div>
      </Route>

      <Route path="/lists/:id">
        {lists && activeList && (
          <Tasks
            list={activeList}
            editTitle={onEditTitle}
            onAdd={onAddTask}
            onRemove={onRemoveTask}
            onEdit={onEditTask}
            onComplete={onCompleteTask}
          />
        )}
      </Route>
    </div>
  );
}

export default App;
