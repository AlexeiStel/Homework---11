import React from 'react';
import Sidebar from '../components/SideBar';
import Workspace from '../components/WorkSpace';
import { Layout } from 'antd';

const NotesPage: React.FC = () => {
  return (
    <Layout style={{ height: '100vh', display: 'flex' }}>
      <Sidebar />
      <Workspace />
    </Layout>
  );
};

export default NotesPage;
