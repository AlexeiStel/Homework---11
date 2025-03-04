import React from 'react';
import { useNotes } from '../../context/NoteContext';

interface NoteItemProps {
  id: string;
  title: string;
}

const NoteItem: React.FC<NoteItemProps> = ({ id, title }) => {
  const { selectNote } = useNotes();

  return (
    <li 
      onClick={() => selectNote(id)} 
      className='notes' 
    >
      {title}
    </li>
  );
};

export default NoteItem;
