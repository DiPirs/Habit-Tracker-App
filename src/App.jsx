import { useState } from 'react';

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import TaskList from './components/TaskList/TaskList';
import { habitsData } from './data/habits';

import style from "./App.module.scss";

function App() {
  const [ habits, setHabits ] = useState(habitsData);
  const [currentHabitId, setCurrentHabitId] = useState(habitsData[0].id);
  const currentHabit = habits.find(h => h.id === currentHabitId);

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
  

  return (
    <div className={style.page}>
      <Sidebar 
        habits={habits}
        currentHabitId={currentHabitId}
        onHabitClick={setCurrentHabitId}
      />
      <main className={style.main}>
        <Header habit = {currentHabit}/>
        <hr className={style.hr}/>
        <TaskList 
          habit={currentHabit}
          updateTask={updateTask}
          deleteTask={deleteTask}
          addDay={addDay}
        />
      </main>
    </div>
  );
}

export default App
