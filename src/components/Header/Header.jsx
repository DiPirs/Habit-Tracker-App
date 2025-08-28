import styles from './Header.module.scss'

function Header({ habit }) {
  if (!habit) return null;
  
  const completed = habit.tasks?.filter(t => t.completed).length || 0;
  const total = habit.days? habit.days : 1;
  const progress = Math.round((completed / total) * 100);

  return(
    <header className={styles.header}>
      <div className={styles.header__title}>
        <h1 className={styles.header__habit_Name}>{habit.name}</h1>
        <p className={styles.header__habit_Goal}>Цель: {habit.goal}</p>
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
    </header>
  );
}

export default Header