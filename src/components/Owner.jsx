import React from 'react'
import { Popper,Box, TextField  } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { useEffect } from 'react';
export default function Owner({op,button,emails,handleDelete,addEmail}) {
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
      useEffect(()=>setMails(emails),[emails])
      const [mails,setMails]=useState(emails)
      const [mail,setMail]=useState("")
    return (
        
        <Popper
            open={op}
            anchorEl={ button }
            placement="bottom-start"
          >
             <Box style={dropdownStyle}>
                <TextField label="Email" onChange={e=>setMail(e.target.value)} variant="outlined"/>
              <AddCircleOutlineIcon onClick={()=>{
                addEmail(mail,button.id)
                setMails([...mails,mail])
            }} />
              <Stack spacing={1}>
                {
                  mails.map((email, index) => (
                    <Chip
                      label={email}
                      key={index}
                       onDelete={() => {
                         handleDelete(button.id, email)
                         setMails(mails.filter(item=>item!=email))
                       }}
                    />
                  ))}
              </Stack>
            </Box> 
          </Popper>
    )
}
