import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import React from "react";
import Grid from "@mui/material/Grid";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import SecondPage from "./SecondPage";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function FirstPage() {
  const arr = [
    { firstName: "Sayam", lastName: "Gandhak", contact: "9834540106" },
    { firstName: "Manu", lastName: "Mishra", contact: "9834540107" },
    { firstName: "Kanu", lastName: "Jaiswal", contact: "9834540104" },
    { firstName: "Gogi", lastName: "Ahuja", contact: "9834540101" },
  ];

  const [data, setData] = React.useState();

  const handleSent = async () => {
    await axios
      .get("/otp")
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => console.log(e));
  };

  React.useEffect(() => {
    handleSent();
  }, []);

  return (
    <>
      {" "}
      <Grid container display="flex" justifyContent="center" marginTop="20px">
        <Grid item marginRight="20px">
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button variant="contained" {...bindTrigger(popupState)}>
                  Send Otp
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  {arr.map((a) => (
                    <Typography sx={{ p: 2 }}>
                      {" "}
                      <Link to={"/contact"} key={a} state={{ a }}>
                        {" "}
                        {a.firstName} {a.lastName}
                      </Link>
                    </Typography>
                  ))}
                </Popover>
              </div>
            )}
          </PopupState>
        </Grid>
        <Grid item>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button variant="contained" {...bindTrigger(popupState)}>
                  View Sent Messages
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Grid item>
                    {data?.map((a) => (
                      <Typography style={{ padding: "10px" }}>
                        {" "}
                        <Link to={"/contact"} state={{ a }}>
                          {a?.user?.firstName} {a?.user?.lastName}
                        </Link>{" "}
                      </Typography>
                    ))}
                  </Grid>
                </Popover>
              </div>
            )}
          </PopupState>
        </Grid>
      </Grid>
    </>
  );
}

export default FirstPage;
