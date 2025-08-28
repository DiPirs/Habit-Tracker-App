import styles from './Sidebar.module.scss';
import { AddButton } from '../../../public/buttons/addSVG';
import { iconHabitsMap } from '../../../public/habits/iconsHabitsMap';


function Sidebar({ habits, currentHabitId, onHabitClick }) {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.logo} src="./public/logo.svg" alt="Логотип" />
      <nav className={styles.habits}>
        {habits.map((habit) => {
          const IconComponent = iconHabitsMap[habit.icon];
          const isActive = habit.id === currentHabitId;
          return (
            <button
              key={habit.id}
              className={`${styles.habit__button} ${isActive ? styles.habit__buttonActive : ''}`}
              
              aria-label={`Привычка: ${habit.name}`}
              onClick={() => onHabitClick(habit.id)}
            >
              <IconComponent/>
            </button>
          );
        })}
        <button
          className={styles.habit__button__add}
        >
          <AddButton />
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;