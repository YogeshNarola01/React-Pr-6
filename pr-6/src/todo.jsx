import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const Todo = () => {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  let data = localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : [];
  const [record, setRecord] = useState(data);
  const [editId, setEditId] = useState("");
  const [single, setSingle] = useState(null);

  useEffect(() => {
      if (single) {
        setTask(single.task);
        setTitle(single.title);
      } else {
        setTask("");
        setTitle("");
      }
    },[single]);

  const handleSubmit = e => {
    e.preventDefault();

    let obj = { id: Date.now(), task, title };

    if(!title || !task){
      alert("All filed are required")
      return false;
    }
    if (editId) {
      let updatedRecords = record.map(val => {
        if (val.id === editId) {
          return {
            ...val,
            task,
            title
          };
        }
        return val;
      });
      setRecord(updatedRecords);
      localStorage.setItem("user", JSON.stringify(updatedRecords));
      setEditId("");
      setSingle(null);
    } else {
      let all = [...record, obj];
      setRecord(all);
      localStorage.setItem("user", JSON.stringify(all));
    }
    setTask("");
    setTitle("");
  };

  const handleEdit = id => {
    let editData = record.find(val => val.id === id);
    setEditId(id);
    setSingle(editData);
  };

  const handleDelete = id => {
    let updatedRecords = record.filter(val => val.id !== id);
    setRecord(updatedRecords);
    localStorage.setItem("user", JSON.stringify(updatedRecords));
  };

  return (
    <div className="mainmain" align="center">
      <div className="main" align="center">
      <h1>Keep Note</h1><br/>
      <form onSubmit={handleSubmit}>
        <div>
          Title : <input type="text" placeholder="Add Title" onChange={e => setTitle(e.target.value)} value={title}/><br/>
          Text : <input type="text" placeholder="Add New Task" onChange={e => setTask(e.target.value)} value={task}/><br/>
          <button className="btn" type="submit">Submit</button>
        </div>
      </form>
      {record.map(val =>
        <div className="box" key={val.id}>
          <h3 className="flex">
            {val.title}
          </h3>
          <p className="flex">
            {val.task}
          </p>
          <button className="btn2" onClick={() => handleEdit(val.id)}><FiEdit /></button>
          <button className="btn2" onClick={() => handleDelete(val.id)}><RiDeleteBin6Line /></button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Todo;
