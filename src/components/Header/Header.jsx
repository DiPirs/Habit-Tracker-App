import styles from './Header.module.scss'

function Header({ habit }) {
  if (!habit) return null;
  const progress = 20;

  return(
    <header className={styles.header}>
      <div className={styles.header__title}>
        <h1 className={styles.header__habit_Name}>{habit.name}</h1>
        <p className={styles.header__habit_Goal}>Цель: {habit.goal}</p>
      </div>
      <div className={styles.header__progress}>
        <div className={styles.progress__info}>
          <span className={styles.info__title}>Прогресс</span>
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