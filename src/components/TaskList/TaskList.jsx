import { useState } from "react";
import styles from "./TaskList.module.scss";
import { IconsButton } from "../../../public/buttons/iconsButton";

function TaskList ({ habit, updateTask, deleteTask, addDay }) {
  const [newComment, setNewComment] = useState('');

  const handleAddDay = () => {
    const dayNumbers = habit.tasks.map(task => {
    const match = task.day.match(/День\s+(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });

    const maxDay = dayNumbers.length > 0 ? Math.max(...dayNumbers) : 0;

    const newTask = {
      id: Date.now(),
      day: `День ${maxDay + 1}`,
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

  const isGoalReached = habit.days && habit.tasks.filter(t => t.completed).length >= parseInt(habit.days, 10);

  return (
    <div className={styles.taskList}>
      <h2 className={styles.taskList__title}>Записи</h2>

      {!isGoalReached && (
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
            <button
              className={styles.addDay__addButton}
              onClick={handleAddDay}
              disabled={isGoalReached}
            >
              Добавить день
            </button>
          </div>
        </div>
      )}

      {isGoalReached && (
        <div className={styles.goalReached}>
          <p>Цель достигнута! Все {habit.days} дней выполнены. Спасибо за участие!</p>
        </div>
      )}

      {/* Список задач */}
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
                    task.completed
                      ? styles.status_button_completed
                      : styles.status_button_pending
                  }`}
                  onClick={() => updateTask(task.id, { completed: !task.completed })}
                  disabled={isGoalReached}
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
      )}
    </div>
  );
}

export default TaskList;