const STORAGE_KEY = 'habit-tracker-data';

export const saveToLocalStorage = (data) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.warn('Не удалось сохранить в localStorage', error);
  }
};

// Загрузить данные
export const loadFromLocalStorage = () => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) return null;
    return JSON.parse(serialized);
  } catch (error) {
    console.warn('Не удалось загрузить из localStorage', error);
    return null;
  }
};