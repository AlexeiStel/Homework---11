import React from 'react';
import { Button, Layout } from 'antd';
import SearchBox from './SearchBox';
import NoteItem from './NoteItem';  
import { useNotes } from '../../context/NoteContext';
import '../../styles/SideBar.css';

const Sidebar: React.FC = () => {
  const { filteredNotes, createNote } = useNotes(); 

  
  return (
    <Layout.Sider className="sidebar">
      <SearchBox />
      <Button type="primary" onClick={createNote} style={{ margin: '10px 0'}}>
        Добавить новую заметку
      </Button>
      <ul>
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} id={note.id} title={note.title} />
        ))}
      </ul>
    </Layout.Sider>
  );
};

export default Sidebar;
