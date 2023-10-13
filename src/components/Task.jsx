import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Popper from '@material-ui/core/Popper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Owner from './Owner';
import { useEffect } from 'react';

const rows = [
  { id: 1, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 2, task: "aa", owner: ["email3@gmail.com", "email4@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 3, task: "aa", owner: ["email5@gmail.com", "email6@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 4, task: "aa", owner: ["email7@gmail.com", "email8@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 5, task: "aa", owner: ["email9@gmail.com", "email10@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 6, task: "aa", owner: ["email11@gmail.com", "email12@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 7, task: "aa", owner: ["email13@gmail.com", "email14@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 8, task: "aa", owner: ["email15@gmail.com", "email16@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
]
export default function Task() {
  const columns = [
    {
      field: 'task',
      headerName: 'Task',
      type: "string",
      width: 150
    },
    {
      field: 'owner',
      headerName: 'Owner',
      renderCell: emails => (
        <Box>
          <ArrowDropDownIcon id={emails.id} onClick={(event) =>{
            setBoxVisible(boxVisible === emails.id ? -1 : emails.id)
            setButton(event.target)
          }}/>
          {/* <Popper
            open={boxVisible === emails.id}
            anchorEl={boxVisible === emails.id ? button : null}
            placement="bottom-start"
          >
            <Box style={dropdownStyle}>
              <AddCircleOutlineIcon onClick={addEmail} />
              <Stack spacing={1}>
                {
                  emails.formattedValue.map((email, index) => (
                    <Chip
                      key={index}
                      label={email}
                      onDelete={() => {
                        handleDelete(emails.id, email)
                      }}
                    />
                  ))}
              </Stack>
            </Box>
          </Popper> */}
        </Box>
      ),
      flex: 1,
      width: 150
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 150,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
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
      type: 'number',
      width: 110,
      editable: true,
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
  const [emails,setEmails]=useState([ ])
  useEffect(()=>{
    if(boxVisible!=-1)
      setEmails(data.filter(item=>item.id===boxVisible)[0].owner)
  },[boxVisible])

  const handleDelete = (id, emailToDelete) => {
    const updatedData = data.map((row) => {
      if (row.id.toString() ==  id) {
        const updatedEmails = row.owner.filter(email => email !== emailToDelete);
        return { ...row, owner: updatedEmails };
      }
      return row;
    });
    setData(updatedData);
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%', 
    left: 0,
    background: 'white',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    zIndex: '1',
    padding: '10px',
  };
  const addEmail = (email,id) => {
    const updatedData = data.map((row) => {
      if (row.id.toString() ==  id) 
        return {...row,owner:[...row.owner,email]}
      return row;
    });
    setData(updatedData);
  };
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10, 15]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Owner 
        op={boxVisible!==-1} 
        button={button} 
        emails={emails} 
        handleDelete={(id,item)=>handleDelete(id,item)} 
        addEmail={(email,id)=>addEmail(email,id)}
      />
    </Box>
  );
}
