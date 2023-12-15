import React, { useState,useEffect } from 'react'
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Owner from './Owner';

const rows = [
  { id: 1, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: new Date(2023, 9, 25), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 2, task: "aa", owner: ["email3@gmail.com", "email4@gmail.com"], dueDate: new Date(2023, 10, 15), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 3, task: "aa", owner: ["email5@gmail.com", "email6@gmail.com"], dueDate: new Date(2023, 11, 5), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 4, task: "aa", owner: ["email7@gmail.com", "email8@gmail.com"], dueDate: new Date(2023, 11, 25), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 5, task: "aa", owner: ["email9@gmail.com", "email10@gmail.com"], dueDate: new Date(2024, 0, 15), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 6, task: "aa", owner: ["email11@gmail.com", "email12@gmail.com"], dueDate: new Date(2024, 1, 5), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 7, task: "aa", owner: ["email13@gmail.com", "email14@gmail.com"], dueDate: new Date(2024, 1, 25), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 8, task: "aa", owner: ["email15@gmail.com", "email16@gmail.com"], dueDate: new Date(2024, 2, 15), status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
];

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
        <ArrowDropDownIcon id={emails.id} onClick={(event) =>{
          setBoxVisible(boxVisible === emails.id ? -1 : emails.id)
          setButton(event.target)
        }}/>
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
  const [emails,setEmails]=useState([])
   
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
        setBoxVisible={()=>setBoxVisible(-1)}
      />
    </Box>
  );
}
