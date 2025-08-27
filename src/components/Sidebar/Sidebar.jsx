import styles from './Sidebar.module.scss';
import { habitsData } from '../../data/habits.jsx';
import { AddButton } from '../../../public/buttons/iconsSVG.jsx';

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.logo} src="./public/logo.svg" alt="Логотип" />
      <nav className={styles.habits}>
        {habitsData.map((habit) => {
          const IconComponent = habit.icon;
          return (
            <button
              key={habit.id}
              className={styles.habit__button}
              aria-label={`Привычка: ${habit.name}`}
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