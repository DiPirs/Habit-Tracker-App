import { useState, useEffect, useRef } from "react";
import style from "./ModalHabitForm.module.scss";

import { iconHabitsMap } from "../../../public/habits/iconsHabitsMap";

function ModalAddHabit ({ isOpen, onCloseModal, onSubmit, habit = null }) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [days, setDays] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('');
  const isEditing = !!habit;

  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCloseModal();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCloseModal]);

   useEffect(() => {
    if (habit) {
      setName(habit.name);
      setGoal(habit.goal);
      setDays(habit.days);
      setSelectedIcon(habit.icon);
    } else {
      setName('');
      setGoal('');
      setDays('');
      setSelectedIcon('alarmClock');
    }
  }, [habit, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    const habitData = {
      id: isEditing ? habit.id : Date.now(),
      name: name.trim(),
      goal: goal.trim() || 'Без цели',
      icon: selectedIcon,
      days: days.trim(),
      tasks: isEditing ? habit.tasks : []
    };

    onSubmit(habitData);
    onCloseModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.modal__wrapper}>
      <div className={style.modal}>
        <h2 className={style.modal__title}>
          {isEditing ? 'Редактировать привычку' : 'Новая привычка'}
        </h2>
        <div className={style.modal__select__icon}>
          <div 
            className={style.icon_scroll_container}
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
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
            {isEditing ? 'Сохранить' : 'Добавить'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddHabit;