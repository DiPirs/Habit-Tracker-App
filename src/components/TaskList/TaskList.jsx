import { useState } from "react";
import styles from "./TaskList.module.scss";
import { IconsButton } from "../../../public/buttons/iconsButton";

function TaskList ({ habit, updateTask, deleteTask, addDay }) {
  const [newComment, setNewComment] = useState('');

  

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

  if (!habit) return <p>Нет записей. Добавьте их!</p>;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddDay();
    }
  };

  return (
    <div className={styles.taskList}>
      <h2 className={styles.taskList__title}>Записи</h2>
      <div className={styles.taskList__addDay}>
        <div className={styles.addDay__title}>
          <span>Добавить новую запись</span>
        </div>
        <div className={styles.addDay__container}>
          <input
            className={styles.addDay__commentInput}
            placeholder="Комментарий к новому дню..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.addDay__addButton} onClick={handleAddDay}>
            Добавить день
          </button>
        </div>
      </div>
      {habit.tasks.length === 0 ? (
        <p>Нет записей. Добавьте их!</p>
      ) : (
        <div className={styles.taskList__task}>
          {habit.tasks.map((task) => (
            <div key={task.id} className={styles.task__item}>
              <div className={styles.item__day}>
                <span>{task.day}</span>
              </div>
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
                  <IconsButton.delete />
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