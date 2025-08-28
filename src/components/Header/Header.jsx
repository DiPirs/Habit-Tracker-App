import { useState } from 'react';
import styles from './Header.module.scss'
import Comfirmed from '../Comfirmed/Comfirmed';

function Header({ habit, onDeleteHabit }) {
  if (!habit) return null;
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const completed = habit.tasks?.filter(t => t.completed).length || 0;
  const total = habit.days? habit.days : 1;
  const progress = Math.round((completed / total) * 100);

   const handleDeleteClick = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    onDeleteHabit(habit.id);
    setIsConfirmOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  return(
    <header className={styles.header}>
      <div className={styles.header__title}>
        <div className={styles.title__container}>
          <h1 className={styles.title__habit_Name}>{habit.name}</h1>
          <button
            className={styles.title__habit_delButton}
            onClick={handleDeleteClick}
            aria-label="Удалить привычку"
          >
            <img src="./public/buttons/delete.svg" alt="Удалить привычку" />
          </button>
        </div>
        <p className={styles.header__habit_Goal}>
          Цель: {habit.goal} | В течении: {habit.days} дней.
        </p>
      </div>
      <div className={styles.header__progress}>
        <div className={styles.progress__info}>
          <span className={styles.info__title}>Прогресс</span>
          <span className={styles.info__days}>{completed} / {total}</span>
          <span className={styles.info__progress}>{progress}%</span>
        </div>
        <div className={styles.progress__bar}>
          <div 
            className={styles.progress__fill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {isConfirmOpen && (
        <Comfirmed
          habitName={habit.name}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </header>
  );
}

export default Header