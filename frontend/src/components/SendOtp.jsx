import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function SendOtp(hiy){
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    if(open){
        handleClickOpen()
    }
  
    const handleClose = () => {
      setOpen(false);
    };



    return (
        <div>
          <Dialog open={open} onClose={handleClose}>
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
              <Button onClick={handleClose}>Cancel</Button>
              <Button >Send</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default SendOtp;