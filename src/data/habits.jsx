import { DumbbellIcon } from "../../public/habits/iconsSVG";
import { WaterIcon } from "../../public/habits/iconsSVG";

export const habitsData = [
  { 
    id: 1, 
    name: 'Отжимания', 
    goal: '50 раз за месяц', 
    icon: DumbbellIcon,
    tasks: [
      {
        id: 101,
        day: 'День 1',
        comment: 'Первый день дался тяжело',
        completed: true
      },
      {
        id: 102,
        day: 'День 2',
        comment: '',
        completed: false
      }
    ]
  },
  { 
    id: 2, 
    name: 'Питье', 
    goal: '2 литра в день', 
    icon: WaterIcon,
  },
];