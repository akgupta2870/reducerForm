import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  Button,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { useReducer, useState } from "react";
import { arrayOfObject, DBEngine, DBname, RowsNumber } from "./DummyData";
import { useForm } from "react-hook-form";
export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function Validate() {
  const initialstate = {
    employee: [],
  };

  const reducer = (state = initialstate, action) => {
    switch (action.type) {
      case "FETCH":
        const filteredEmployee = arrayOfObject.filter(
          (item) => item.EmployeeID === action.payload
        );
        return {
          ...state,
          employee: filteredEmployee,
        };
      default:
        return state;
    }
  };
  const classes = useStyles();
  const [click, setCLick] = useState(false);
  const [output, dispatch] = useReducer(reducer, initialstate);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  React.useEffect(() => {
    handleSubmit(onSubmit)();
  });

  return (
    <>
      <div>
        <div>
          <Typography align="left" variant="h5" gutterBottom>
            Query Executor
          </Typography>
        </div>
        <div style={{ textAlign: "left" }}>
          <FormControl className={classes.formControl}>
            <InputLabel>Database Engine</InputLabel>
            <Select {...register("dbEngine", { required: true })}>
              {DBEngine.map((item) => (
                <MenuItem value={"SQL"}>{item.DB}</MenuItem>
              ))}
            </Select>
            {errors.dbEngine && (
              <helperText>Please select an database engine name </helperText>
            )}
          </FormControl>
        </div>
        <div style={{ textAlign: "left" }}>
          <FormControl className={classes.formControl}>
            <InputLabel>Database Name</InputLabel>
            <Select {...register("dbName", { required: true })}>
              {DBname.map((item) => (
                <MenuItem value={"Employee0"}>{item.Database}</MenuItem>
              ))}
            </Select>
            {errors.dbName && (
              <helperText>Please select Database Name</helperText>
            )}
          </FormControl>
        </div>
        <div style={{ textAlign: "left" }}>
          <FormControl className={classes.formControl}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="standard-basic"
                label="Table Name"
                {...register("table", { required: true })}
              />
            </form>
            {errors.table && (
              <helperText>Please enter your Table Name</helperText>
            )}
          </FormControl>
        </div>
        <div>
          <TextField
            label="Query"
            name="query"
            style={{ margin: 8 }}
            placeholder="Enter Employee ID"
            fullWidth
            disabled={errors.table || errors.dbName || errors.dbEngine}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("query", {
              required: true,
            })}
            onChange={(e) => {
              clearErrors("query");
              dispatch({
                type: "FETCH",
                payload: e.target.value,
              });
            }}
          />
          {errors.query && (
            <helperText>Please fill this Field to submit </helperText>
          )}
        </div>
        <div style={{ textAlign: "left" }}>
          <FormControl className={classes.formControl}>
            <InputLabel>Rows</InputLabel>
            <Select
              {...register("Rows", {
                required: true,
              })}
            >
              {RowsNumber.map((item) => (
                <MenuItem value={10}>{item.rows}</MenuItem>
              ))}
            </Select>
            {errors.Rows && <helperText>Select Number of Rows</helperText>}
          </FormControl>
        </div>
        <div style={{ textAlign: "left" }}>
          <Button
            variant="contained"
            color="primary"
            disabled={errors.query}
            onClick={() => {
              handleSubmit(onSubmit);
              setCLick(true);
            }}
          >
            submit
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setCLick(true)}
          >
            clear
          </Button>
        </div>
        <div>
          {click && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>EmployeeID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Designation</TableCell>
                    <TableCell>City</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {output.employee.map((row) => (
                    <TableRow>
                      <TableCell>{row.EmployeeID}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.designation}</TableCell>
                      <TableCell>{row.city}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </>
  );
}
