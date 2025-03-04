import React, { useEffect } from 'react';
import { Button, Layout, Popconfirm } from 'antd';
import SimpleMDE from 'react-simplemde-editor';
import { useNotes } from '../../context/NoteContext';
import 'easymde/dist/easymde.min.css';
import '../../styles/EditorStyles.css';
import '../../styles/Workspace.css';

const Workspace: React.FC = () => {
  const { selectedNote, updateNoteContent, deleteNote } = useNotes();

  useEffect(() => {
  }, [selectedNote]);

  if (!selectedNote) {
    return <Layout.Content style={{ padding: 20, width: "100%" }}>Выберите или создайте заметку</Layout.Content>;
  }

  return (
    <Layout.Content style={{ padding: 20, width: "100%"  }}>
      <h2>{selectedNote.title}</h2>
      <SimpleMDE
        style={{ padding: "20px", width: "700px" }}
        value={selectedNote.content}
        onChange={(content) => updateNoteContent(selectedNote.id, content)}
      />
      
      <Popconfirm title="Удалить заметку?" onConfirm={() => deleteNote(selectedNote.id)}>
        <Button type="danger" className='btn_delete'>
          Удалить
        </Button>
      </Popconfirm>
    </Layout.Content>
  );
};

export default Workspace;
