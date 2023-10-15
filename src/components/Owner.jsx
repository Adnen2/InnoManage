import React, { useState, useEffect, useRef } from 'react'
import { Popper, Box, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
export default function Owner({ op, button, emails, handleDelete, addEmail, setBoxVisible }) {
  const OwnerRef = useRef(null);
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
  useEffect(() => setMails(emails), [emails])
  const [mails, setMails] = useState(emails)
  const [mail, setMail] = useState("")
  useEffect(() => {
    const handleClickOutside = event => {
      if (OwnerRef.current && !OwnerRef.current.contains(event.target))
        setBoxVisible(-1)
    }
    document.addEventListener('mousedown  ', handleClickOutside);
  }, []);
  return (

    <Popper
      open={op}
      ref={OwnerRef}
      anchorEl={button}
      placement="bottom-start"
    >
      <Box style={dropdownStyle}>
        <Box display="flex" flexDirection="row">
          <TextField label="Email" sx={{ mr: 1,mb:1,width: '250px' }} onChange={e => setMail(e.target.value)} variant="outlined" />
          <AddCircleOutlineIcon onClick={() => {
            addEmail(mail, button.id)
            setMails([...mails, mail])
          }} />
        </Box>
        <Stack spacing={1}>
          {
            mails.map((email, index) => (
              <Chip
                label={email}
                key={index}
                onDelete={() => {
                  handleDelete(button.id, email)
                  setMails(mails.filter(item => item != email))
                }}
              />
            ))}
        </Stack>
      </Box>
    </Popper>
  )
}
