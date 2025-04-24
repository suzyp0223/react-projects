import React, { useState } from 'react'

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null); // 수정 중인 항목의 인덱스
  const [editValue, setEditValue] = useState(""); // 수정 중인 항목의 값

  // 할 일 생성
  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, inputValue]);
    setInputValue('');
  };

  // 수정 모드 활성화
  const startEdit = (index) => {
    setEditIndex(index); // 수정할 항목의 인덱스 설정
    setEditValue(todos[index]); // 수정할 항목의 기존 값 설정
  };

  // 수정 내용 저장
  const saveEdit = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = editValue; // 수정된 값 반영
    setTodos(updatedTodos);
    setEditIndex(null); // 수정 모드 종료
    setEditValue(""); // 수정 값 초기화
  };

  // 할 일 삭제
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div style={styles.container}>
      <h1>To-Do List</h1>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button style={styles.addButton} onClick={addTodo}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.listItem}>
            {editIndex === index ? (
              <div style={styles.editContainer}>
                <input
                  style={styles.input}
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button style={styles.saveButton} onClick={saveEdit}>
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>{todo}</span>
                <button
                  style={styles.editButton}
                  onClick={() => startEdit(index)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    width: "250px",
    padding: "10px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  editContainer: {
    display: "flex",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  saveButton: {
    backgroundColor: "#ffc107",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    marginLeft: "5px",
  },
};