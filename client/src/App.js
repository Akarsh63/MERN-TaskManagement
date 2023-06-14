import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateTask from './Pages/CreateTask';
import TaskManager from './Pages/TaskManager';
function App() {
  return (
    <Router>
        <Routes>
          <Route exact path='/' element={<CreateTask />} />
          <Route path='/tasks' element={<TaskManager />} />
        </Routes>
    </Router>
  );
}

export default App;
