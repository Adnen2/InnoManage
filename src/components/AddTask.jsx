import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Box from '@mui/material/Box';

const AddTask = ({ addTask }) => {
  const [taskData, setTaskData] = useState({
    timeline: {
      start: '',
      end: '',
    },
    nom: '',
    description: '',
    Notes: '',
    Budget: 0,
    Files: '',
    date_debut: '',
    Last_update: '',
    date_echeance: '',
    priorite: 0,
    statut: '',
    utilisateur_responsable: '',
    projet: '',
    group: '',
  });

  const handleInputChange = (field, value) => {
    setTaskData({ ...taskData, [field]: value });
  };

  const handleAddTask = async () => {
    try {
      // Perform the POST request to the API
      const response = await axios.post('http://localhost:3001/tasks/tasks', {
        task: taskData,
      });

      // Check if the request was successful
      if (response.status === 201) {
        // If successful, add the task to the local state
        addTask(response.data.task);
        // Clear the form after adding the task
        setTaskData({
          timeline: {
            start: '',
            end: '',
          },
          nom: '',
          description: '',
          Notes: '',
          Budget: 0,
          Files: '',
          date_debut: '',
          Last_update: '',
          date_echeance: '',
          priorite: 0,
          statut: '',
          utilisateur_responsable: '',
          projet: '',
          group: '',
        });
        
      } else {
        console.error('Error adding task:', response);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {/* Your form fields go here */}
      <TextField
        label="Task Name"
        value={taskData.nom}
        onChange={(e) => handleInputChange('nom', e.target.value)}
      />
      <TextField
        label="Description"
        value={taskData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
      />
      <TextField
      label="Notes"
      value={taskData.Notes}
      onChange={(e) => handleInputChange('Notes', e.target.value)}
    />
    <TextField
      label="Budget"
      type="number"
      value={taskData.Budget}
      onChange={(e) => handleInputChange('Budget', e.target.value)}
    />
    <TextField
      label="Files"
      type="file"
      value={taskData.Files}
      onChange={(e) => handleInputChange('Files', e.target.value)}
    />
     <TextField
        label="Start Date"
        type="date"
        value={taskData.timeline.start}
        onChange={(e) => handleInputChange('timeline.start', e.target.value)}
      />
      <TextField
        label="End Date"
        type="date"
        value={taskData.timeline.end}
        onChange={(e) => handleInputChange('timeline.end', e.target.value)}
      />
      <TextField
        label="Due Date"
        type="date"
        value={taskData.date_echeance}
        onChange={(e) => handleInputChange('date_echeance', e.target.value)}
      />
      {/* Add other form fields as needed */}
      <Button variant="contained" color="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </Box>
  );
};

export default AddTask;
