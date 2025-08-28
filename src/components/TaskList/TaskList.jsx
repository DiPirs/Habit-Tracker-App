import { useState } from "react";
import styles from "./TaskList.module.scss";

function TaskList ({ habit, updateTask, deleteTask, addDay }) {
  const [newComment, setNewComment] = useState('');

  if (!habit || !habit.tasks) return <p>Нет данных</p>;

  const handleAddDay = () => {
    const newTask = {
      id: Date.now(),
      day: `День ${habit.tasks.length + 1}`,
      comment: newComment.trim() || '',
      completed: false,
    };
    addDay(newTask);
    setNewComment('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddDay();
    }
  };

  return (
    <div className={styles.taskList}>
      <h2 className={styles.taskList__title}>Записи</h2>
      <div className={styles.taskList__addDay}>
        <input
          className={styles.addDay__commentInput}
          placeholder="Комментарий к новому дню..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          rows="2"
        />
        <button className={styles.addDay__addButton} onClick={handleAddDay}>
          Добавить день
        </button>
      </div>
      {habit.tasks.lenght === 0 ? (
        <p>Нет записей. Добавьте их!</p>
      ) : (
        <div className={styles.taskList__task}>
          {habit.tasks.map((task) => (
            <div key={task.id} className={styles.task__item}>
              <span className={styles.item__day}>{task.day}</span>
              <input
                className={styles.item__comment}
                placeholder="Добавьте комментарий..."
                value={task.comment}
                onChange={(e) =>
                  updateTask(task.id, { comment: e.target.value })
                }
                rows="2"
              />
              <div className={styles.item__actions}>
                <button
                  className={`${styles.actions__status_button} ${
                    task.completed ? styles.status_button_completed 
                    : styles.status_button_completed_pending}`}
                  onClick={() => updateTask(task.id, { completed: !task.completed })}
                >
                  {task.completed ? 'Готово' : 'Не готово'}
                </button>
                <button
                  className={styles.actions__delete_button}
                  onClick={() => deleteTask(task.id)}
                  aria-label="Удалить запись"
                >
                  <img src="./public/buttons/delete.svg" alt="" />
                </button>
              </div>
            </div>
          ))}
        </div>
        )   
      }
    </div>
  );
}

export default TaskList;