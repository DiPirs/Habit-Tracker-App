import { useState, useEffect } from "react";
import style from "./ModalAddHabit.module.scss";

import { iconHabitsMap } from "../../../public/habits/iconsHabitsMap";

function ModalAddHabit ({ isOpen, onCloseModal, onAddHabit }) {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [days, setDays] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('dumbbell');

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCloseModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCloseModal]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    const newHabit = {
      id: Date.now(),
      name: name.trim(),
      goal: goal.trim() || 'Без цели',
      icon: selectedIcon,
      days: days.trim(),
      tasks: [],
    };

    onAddHabit(newHabit);
    setName('');
    setGoal('');
    setDays('');
    setSelectedIcon('dumbbell');
    onCloseModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modal__wrapper} onClick={onCloseModal}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={style.modal__title}>Новая привычка</h2>
        <div className={style.modal__select__icon}>
          {Object.keys(iconHabitsMap).map((iconKey) => {
            const IconComponent = iconHabitsMap[iconKey];
            return (
              <button
                key={iconKey}
                className={`${style.icon__Button} ${
                  selectedIcon === iconKey ? style.icon__selected : ''
                }`}
                onClick={() => setSelectedIcon(iconKey)}
                aria-label={`Выбрать иконку: ${iconKey}`}
              >
                <IconComponent />
              </button>
            );
          })}
        </div>
        <div className={style.modal__name}>
          <span>Название привычки</span>
          <input 
            type="text" 
            placeholder="Назовите новую привычку"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className={style.modal__input}
          />
        </div>

        <div className={style.modal__goal}>
          <span>Цель</span>
          <input
            type="text"
            placeholder="Цель (например: 2 литра в день)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            onKeyDown={handleKeyDown}
            className={style.modal__input}
          />
        </div>

        <div className={style.modal__days}>
          <span>Сколько дней длится привычка</span>
          <input
            type="number"
            placeholder="Введите кол-во дней"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            onKeyDown={handleKeyDown}
            className={style.modal__input}
          />
        </div>

        <div className={style.modal__actions}>
          <button className={style.actions__button} onClick={onCloseModal}>
            Отмена
          </button>
          <button className={style.actions__button} onClick={handleSubmit}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddHabit;