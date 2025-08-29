import { useState, useEffect } from 'react';
import { habitsData } from './data/habits';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorage';

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import TaskList from './components/TaskList/TaskList';
import ModalHabitForm from './components/Modal/ModalHabitForm';

import style from "./App.module.scss";

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = loadFromLocalStorage();
    return saved?.habits || habitsData;
  });

  const [currentHabitId, setCurrentHabitId] = useState(() => {
    const saved = loadFromLocalStorage();
    return saved?.currentHabitId || habitsData[0].id;
  });

  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ editingHabit, setEditingHabit ] = useState(null);
  const currentHabit = habits.find(h => h.id === currentHabitId);

  useEffect(() => {
    saveToLocalStorage({ habits, currentHabitId });
  }, [habits, currentHabitId]);

  const openAddModal = () => {
  setEditingHabit(null);
  setIsModalOpen(true);
  };

  const openEditModal = (habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const updateTask = (taskId, updates) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === currentHabitId
          ? {
              ...habit,
              tasks: habit.tasks.map(t =>
                t.id === taskId ? { ...t, ...updates } : t
              ),
            }
          : habit
      )
    );
  };

  const deleteTask = (taskId) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === currentHabitId
          ? {
              ...habit,
              tasks: habit.tasks.filter(t => t.id !== taskId),
            }
          : habit
      )
    );
  };

  const addDay = (newTask) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === currentHabitId
          ? {
              ...habit,
              tasks: [...habit.tasks, newTask],
            }
          : habit
      )
    );
  };

  const handleSaveHabit = (savedHabit) => {
    if (savedHabit.id && habits.some(h => h.id === savedHabit.id)) {
      setHabits(prev => prev.map(h => h.id === savedHabit.id ? savedHabit : h));
    } else {
      setHabits(prev => [...prev, savedHabit]);
      setCurrentHabitId(savedHabit.id);
    }
  };

  const deleteHabit = (habitId) => {
  setHabits(prev => prev.filter(h => h.id !== habitId));

  if (currentHabitId === habitId) {
    const remaining = habits.filter(h => h.id !== habitId);
    if (remaining.length > 0) {
      setCurrentHabitId(remaining[0].id);
    }
  }
  };
  

  return (
    <div className={style.page}>
      <Sidebar 
        habits={habits}
        currentHabitId={currentHabitId}
        onHabitClick={setCurrentHabitId}
        onAddClick={openAddModal}
      />
      <main className={style.main}>
        <Header 
          habit = {currentHabit}
          onEditHabit={() => openEditModal(currentHabit)}
          onDeleteHabit={deleteHabit}
        />
        <hr className={style.hr}/>
        <TaskList 
          habit={currentHabit}
          updateTask={updateTask}
          deleteTask={deleteTask}
          addDay={addDay}
        />
      </main>

      <ModalHabitForm
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        onSubmit={handleSaveHabit}
        habit={editingHabit}
      />
    </div>
  );
}

export default App
