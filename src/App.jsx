import { useState } from 'react';

import Sidebar from "./components/Sidebar/Sidebar";
import style from "./App.module.scss"

function App() {
  return (
    <div className={style.page}>
      <Sidebar />
      <main>
        <div></div>
      </main>
    </div>
  );
}

export default App
