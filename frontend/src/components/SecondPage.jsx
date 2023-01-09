import React from "react";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';

function SecondPage(param) {
  const location = useLocation();
  const obj = location.state.a;
  let otp;
  let date;
  let otpDate = [];
  if (obj?.user) {
    otp = obj.value;
    date = obj.date;
    for (let i = 0; i < date.length; i++) {
      if (!otp[i]) {
        otp[i] = "Default Message";
      }
      otpDate.push(otp[i] + " " + date[i]);
    }
  }
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [ snack , setSnack] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    const data = await axios
      .post("/otp", {
        firstName: obj.firstName,
        lastName: obj.lastName,
        value: value,
        contact: obj.contact,
      })
      .then((res) => {console.log(res);setSnack(true)})
      .catch((error) => console.log(error, "error"));
    setValue("");
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 500,
            height: 300,
          },
    
        }}
        justifyContent="center"
      >
        <Paper elevation={5} style={{overflow:"auto"}}>
          <Grid container justifyContent="center" mt={3} >
            {!obj?.user ? (
              <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                {obj.firstName} {obj.lastName}
              </Typography>
            ) : (
              <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                Full Name : {obj.user.firstName} {obj.user.lastName}
              </Typography>
            )}
          </Grid>
          <Grid container justifyContent="center">
            {!obj?.user ? (
              <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                {obj.contact}
              </Typography>
            ) : (
              <Typography variant="h8" sx={{ fontWeight: "bold" }}>
                Contact No : {obj.user.contact}
              </Typography>
            )}
            {obj.user && (
              <Grid container justifyContent="center">
                <Typography sx={{ fontWeight: "bold", marginTop: "8px" }}>
                  Otp and Date :
                </Typography>
                {otpDate?.map((o) => (
                  <Grid container justifyContent="center">
                    <Typography sx={{ fontWeight: "bold" }}>
                      {" "}
                      {"  "} {o}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            )}
            <Grid container justifyContent="center">
              {console.log(otpDate, "thsi is otpDate")}
            </Grid>
            {!obj?.user && (
              <>
                <Grid container item justifyContent="center">
                  <Typography mt={2} mb={2}>
                    Please click the below button to send the Otp
                  </Typography>
                </Grid>
                <Button
                  display="block"
                  variant="contained"
                  onClick={handleClickOpen}
                >
                  Send Message
                </Button>
              </>
            )}
          </Grid>
        </Paper>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Otp</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once clicked 'Sent' will Otp to particular user . Otp will be random
            generated number from the system . Format of the message will be :{" "}
            <strong> ' Hi. Your Otp is otp'</strong>. If you want to sent
            customized message do enter your message below .
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Customized message goes here (only numbers not allowed) "
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleSend();
              handleClose();
            }}
          >
            Sent
          </Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={snack} autoHideDuration={1000} onClose={handleClose}>
        <Alert  severity="success" sx={{ width: '100%' }}>
          Otp Sent
        </Alert>
      </Snackbar>
    </Stack>
    </>
  );
}
export default SecondPage;
