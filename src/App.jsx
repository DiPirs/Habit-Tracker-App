import { useState } from 'react';

import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header"
import { habitsData } from './data/habits';

import style from "./App.module.scss"

function App() {
  const [ habits ] = useState(habitsData);
  const [currentHabitId, setCurrentHabitId] = useState(habitsData[0].id);
  const currentHabit = habits.find(h => h.id === currentHabitId);

  return (
    <div className={style.page}>
      <Sidebar 
        habits={habits}
        currentHabitId={currentHabitId}
        onHabitClick={setCurrentHabitId}
      />
      <main className={style.main}>
        <Header habit = {currentHabit}/>
      </main>
    </div>
  );
}

export default App
