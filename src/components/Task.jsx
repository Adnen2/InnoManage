import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Owner from './Owner';
import ProgressBar from './SeekBar';
import '../App.css';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const rows = [
  { id: 1, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: new Date(2023, 9, 25), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 2, task: "aa", owner: ["email3@gmail.com", "email4@gmail.com"], dueDate: new Date(2023, 10, 15), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
];

export default function Task() {
  const columns = [
    {
      field: 'task',
      headerName: 'Task',
      type: "string",
      width: 150,
      editable: true
    },
    {
      field: 'owner',
      headerName: 'Owner',
      renderCell: emails => (
        <ArrowDropDownIcon id={emails.id} onClick={(event) => {
          setBoxVisible(boxVisible === emails.id ? -1 : emails.id)
          setButton(event.target)
        }} />
      ),
      flex: 1,
      width: 150
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      type: 'date',
      width: 150,
      editable: true,
      renderCell: (params) => {
        const task = params.row;
        const currentDate = new Date();
        const dueDate = task.dueDate;
        const progress = Math.min(100, Math.round(((currentDate - dueDate) / (task.timeline * 24 * 60 * 60 * 1000)) * 100));

        return (
          <div>
            <ProgressBar value={progress} />
            {dueDate.toDateString()} {/* You can format the due date as needed */}
          </div>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {
        const { id, value } = params;
        const handleStatusChange = (event) => {
          // Handle status change here and update the data accordingly
        };

        return (
          <Select
            labelId={`status-select-label-${id}`}
            id={`status-select-${id}`}
            value={value}
            onChange={handleStatusChange}
            renderValue={(selected) => selected}
          >
            <MenuItem value="Done">Done</MenuItem>
            <MenuItem value="Working on it">Working on it</MenuItem>
            <MenuItem value="Stuck">Stuck</MenuItem>
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="Not Started" disabled>______________________</MenuItem>
            <MenuItem value="Not Started">
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                //onClick={ }
              >
                Edit
              </Button>
              </MenuItem>
          </Select>
        );
      },
    },
    {
      field: 'priority',
      headerName: 'Priority',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'notes',
      headerName: 'Notes',
      width: 160,
    },
    {
      field: 'files',
      headerName: 'Files',
      type: 'file',
      width: 150,
      renderCell: (params) => {
        const task = params.row;

        const handleFileChange = (event) => {
          const selectedFiles = event.target.files;
          // Process the selected files and associate them with the task as needed.

          // For example, you might want to update the task's files property:
          const updatedData = data.map((row) => {
            if (row.id === task.id) {
              return { ...row, files: selectedFiles };
            }
            return row;
          });
          setData(updatedData);
        };

        return (
          <label className="file-input-label">
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              className="file-input"
            />
            <span className="file-input-button">
              <AttachFileIcon style={{ fontSize: 20 }} />
            </span>
          </label>
        );
      },
    },
    {
      field: 'timeline',
      headerName: 'Timeline',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'lastUpdated',
      headerName: 'Last Updated',
      type: 'number',
      width: 110,
      editable: true,
    },
  ];
  const [data, setData] = useState(rows)
  const [button, setButton] = useState(null)
  const [boxVisible, setBoxVisible] = useState(-1);
  const [emails, setEmails] = useState([])

  useEffect(() => {
    if (boxVisible != -1)
      setEmails(data.filter(item => item.id === boxVisible)[0].owner)
  }, [boxVisible])

  const handleDelete = (id, emailToDelete) => {
    const updatedData = data.map((row) => {
      if (row.id.toString() == id) {
        const updatedEmails = row.owner.filter(email => email !== emailToDelete);
        return { ...row, owner: updatedEmails };
      }
      return row;
    });
    setData(updatedData);
  };


  const addEmail = (email, id) => {
    const updatedData = data.map((row) => {
      if (row.id.toString() == id)
        return { ...row, owner: [...row.owner, email] }
      return row;
    });
    setData(updatedData);
  };
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <NavLink to={"/AddTask"} className={"btn border-t-neutral-950"}>Add New Task</NavLink>
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Owner
        op={boxVisible !== -1}
        button={button}
        emails={emails}
        handleDelete={(id, item) => handleDelete(id, item)}
        addEmail={(email, id) => addEmail(email, id)}
        setBoxVisible={() => setBoxVisible(-1)}
      />
    </Box>
  );
}
