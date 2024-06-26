import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import FilterFormPage from "./FilterFormPage";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModularEnabled, setIsModularEnabled] = useState(false);
  const [dataMain, setDataMain] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (isLoading) {
      fetch("http://localhost:8080/api/filters")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDataMain(data);
        })
        .catch((err) => console.log(err));

      fetch("http://localhost:8080/api/criteria")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((err) => console.log(err));
    }

    setIsLoading(false);
  }, [isLoading]);

  function createData(id, title) {
    let myDetailedRow = [];
    data.map((data) => {
      if (data.filterID === id) {
        myDetailedRow.push({
          date: data.criteria,
          customerId: data.comparingCondition,
          amount: data.conditionValue,
        });
      }
    });

    return {
      id,
      title,
      history: myDetailedRow,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="right">{row.title}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Detailed Info
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell className="boldiks">Criteria</TableCell>
                      <TableCell className="boldiks">Condition</TableCell>
                      <TableCell align="right" className="boldiks">
                        Value
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((detailedInfo) => (
                      <TableRow key={detailedInfo.date}>
                        <TableCell component="th" scope="row">
                          {detailedInfo.date}
                        </TableCell>
                        <TableCell>{detailedInfo.customerId}</TableCell>
                        <TableCell align="right">
                          {detailedInfo.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const setModularValue = (event) => {
    event.preventDefault();
    setIsModularEnabled(true);
  };
  const setModularDisable = (event) => {
    event.preventDefault();
    setIsModularEnabled(false);
  };

  if (isLoading) {
    return (
      <div>
        <h1>Loading!</h1>
      </div>
    );
  }

  const myRows = [];
  dataMain.map((data) => myRows.push(createData(data.id, data.title)));

  return (
    <div>
      {isModularEnabled ? (
        <FilterFormPage props={{ isModularEnabled, setModularDisable }} />
      ) : undefined}

      <div className="HomePageButtons">
        <Button variant="contained" href="/addFilter" id="addFilterPage">
          Add Filter Page
        </Button>
        <Button variant="contained" onClick={(e) => setModularValue(e)}>
          Add Filter Modular
        </Button>
      </div>
      <div className="HomePage">
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell align="right">TITLE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myRows.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
