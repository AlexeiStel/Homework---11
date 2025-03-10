import React, { useState } from 'react';
import { Input } from 'antd';
import { useNotes } from '../../context/NoteContext';

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState('');
  const { notes, setFilteredNotes } = useNotes(); 

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setQuery(searchText);
    if (searchText) {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchText) ||
          note.content.toLowerCase().includes(searchText)
      );
      setFilteredNotes(filtered);   
    }
  };

  return (
    <Input
      value={query}
      onChange={handleSearch}
      placeholder="Поиск по заметкам"
      style={{ marginBottom: 20 }}
    />
  );
};

export default SearchBox;
