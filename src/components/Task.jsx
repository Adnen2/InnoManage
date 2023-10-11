import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const rows = [
  { id: 1, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 2, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 3, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 4, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 5, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 6, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 7, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
  { id: 8, task: "aa", owner: ["email1@gmail.com", "email2@gmail.com"], dueDate: "aaa", status: "aaa", priority: 10, notes: "aaa", files: 5, timeline: 15, lastUpdated: 20 },
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
        <Box display="flex" flexDirection="row" alignItems="center">
          {/* <AddCircleOutlineIcon onClick={addEmail} /> */}
          <Stack direction="row" spacing={1}>
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
  // const [open, setOpen] = useState(false);
  const handleDelete = (id, emailToDelete) => {
    const updatedData = data.map((row) => {
      if (row.id === id) {
        const updatedEmails = row.owner.filter(email => email !== emailToDelete);
        return { ...row, owner: updatedEmails };
      }
      return row;
    });
    setData(updatedData);
  };
  // const addEmail = () => {
  //   setOpen(true)
  // }
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
      {/* <Dialog open={open} onClose={()=>setOpen(false)} >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpen(false)}>Cancel</Button>
          <Button onClick={()=>setOpen(false)}>Add</Button>
        </DialogActions>
      </Dialog>  */}
    </Box>
  );
}
