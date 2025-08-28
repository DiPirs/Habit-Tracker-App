import { useEffect } from 'react';
import style from './Comfirmed.module.scss'

function Comfirmed ({ habitName, onConfirm, onCancel }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') { onCancel(); }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onCancel]);
  return (
    <div className={style.comfirmed__wrapper} onClick={onCancel}>
      <div className={style.comfirmed} onClick={(e) => e.stopPropagation()}>
        <p className={style.comfirmed__title}>Вы уверены, что хотите удалить привычку "{habitName}"?</p>
        <div className={style.comfirmed__actions}>
          <button className={style.actions__button} onClick={onCancel}>
            Отмена
          </button>
          <button className={style.actions__button} onClick={onConfirm}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comfirmed;