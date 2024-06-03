import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Todo = () => {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  let data = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  const [record, setRecord] = useState(data);
  const [editid, setEditid] = useState("");
  const [single, setSingle] = useState(null);

  useEffect(
    () => {
      setTask(single?.task);
      setTitle(single?.title);
    },
    [single]
  );

  const handleSubmite = e => {
    e.preventDefault();

    let obj = { id: Date.now(), task, title };

    if (editid) {
      let oldrecord = [...record];
      console.log(editid);
      console.log(oldrecord);
      let editdatas = oldrecord.map(val => {
        if (val.id == editid) {
          return {
            ...val,
            task: task,
            title: title
          };
        }
        return val;
      });
      console.log(editdatas);
      setRecord(editdatas);
      localStorage.setItem("user", JSON.stringify(editdatas));
      setEditid("");
      setSingle("");
    } else {
      let all = [...record, obj];
      setRecord(all);
      localStorage.setItem("user", JSON.stringify(all));
    }
    setTask("");
    setTitle("");
  };

  const handleEdit = id => {
    alert(id);
    let editdata = record.find(val => val.id == id);
    console.log(editdata);
    setEditid(id);
    setSingle(editdata);
  };

  const handleDelet = id => {
    let all = [...record];
    let deletdata = all.filter(val => val.id != id);
    setRecord(deletdata);
    localStorage.setItem("user", JSON.stringify(deletdata));
  };

  return (
    <div align="center">
      <h1>:: Add Task ::</h1>
      <form onSubmit={handleSubmite}>
        <div>
          <input
            type="text"
            placeholder="Add Title"
            onChange={e => setTitle(e.target.value)}
            value={title || ""}
          />
          <input
            type="text"
            placeholder="Add New Task"
            onChange={e => setTask(e.target.value)}
            value={task || ""}
          />
          <input type="submit" />
        </div>
        {record.map(val => {
          return (
            <div key={val.id}>
              <h3>
                {val.title}
              </h3>
              <p>
                {val.task}
              </p>
              <button onClick={() => handleEdit(val.id)}>
                <FiEdit />
              </button>
              <button onClick={() => handleDelet(val.id)}>
                <RiDeleteBin6Line />
              </button>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Todo;
