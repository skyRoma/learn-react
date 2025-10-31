import { useState } from "react";
import classes from "./DaD.module.css";

const initialItems = [
  "Заголовок",
  "Подзаголовок",
  "Кнопка",
  "Изображение",
  "Описание",
  "Форма",
];

export default function DaD() {
  const [items, setItems] = useState(initialItems);
  const [dragIndex, setDragIndex] = useState(null);

  const handleDragStart = (index) => setDragIndex(index);

  const handleDragEnter = (index) => {
    console.log('handleDragEnter', index, dragIndex);
    if (dragIndex === index) return;
    const updated = [...items];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setDragIndex(index);
    setItems(updated);
  };

  const handleDrop = () => setDragIndex(null);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>🧩 Конструктор элементов</h2>
      <ul className={classes.list}>
        {items.map((item, index) => (
          <li
            key={item}
            className={`${classes.item} ${dragIndex === index ? classes.dragging : ""
              }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDrop}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
