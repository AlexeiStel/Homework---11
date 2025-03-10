import React, { useState, useEffect } from 'react';
import { Button, Input, Layout, Popconfirm } from 'antd';
import SimpleMDE from 'react-simplemde-editor';
import { useNotes } from '../../context/NoteContext';
import 'easymde/dist/easymde.min.css';
import '../../styles/EditorStyles.css';
import '../../styles/Workspace.css';

const Workspace: React.FC = () => {
  const { selectedNote, updateNoteContent, updateNoteTitle, deleteNote } = useNotes();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(selectedNote?.title || '');
  const [content, setContent] = useState(selectedNote?.content || '');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleTitleSave = () => {
    if (selectedNote && title.trim()) {
      updateNoteTitle(selectedNote.id, title.trim());
    }
    setIsEditingTitle(false);
  };

  if (!selectedNote) {
    return <Layout.Content className='workspace'>Выберите или создайте заметку</Layout.Content>;
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    if (selectedNote) {
      updateNoteContent(selectedNote.id, newContent); 
    }
  };

  return (
    <Layout.Content 
      className='workspace'
    >
      {isEditingTitle ? (
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onPressEnter={handleTitleSave}
          onBlur={handleTitleSave}
          autoFocus
          style={{ fontSize: '1.5rem', marginBottom: '10px', width: '100%!important' }}
        />
      ) : (
        <h2>{selectedNote.title}</h2>
      )}

      <SimpleMDE
        style={{ padding: "20px", width: "100%" }}
        value={content}
        onChange={handleContentChange}
      />

      <div style={{ width: '50%', marginTop: '10px' }}>
        <Button type="primary" onClick={() => setIsEditingTitle(true)} style={{ marginRight: '10px' }}>
          Редактировать
        </Button>

        <Popconfirm 
          title="Удалить заметку?" 
          onConfirm={() => deleteNote(selectedNote.id)}
          okButtonProps={{ style: { width: '50px'} }}
          >
          <Button type="text" className="btn_delete">
            Удалить
          </Button>
        </Popconfirm>
      </div>
    </Layout.Content>
  );
};

export default Workspace;
