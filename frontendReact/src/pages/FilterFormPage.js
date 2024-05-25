import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from "@mui/base/Unstable_NumberInput";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: "▴",
        },
        decrementButton: {
          children: "▾",
        },
      }}
      {...props}
      ref={ref}
    />
  );
});
const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };
  display: grid;
  grid-template-columns: 1fr 19px;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  column-gap: 8px;
  padding: 4px;

  &.${numberInputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[600] : blue[200]
    };
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  grid-column: 1/2;
  grid-row: 1/3;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
`
);

const StyledButton = styled("button")(
  ({ theme }) => `
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  padding: 0;
  width: 19px;
  height: 19px;
  font-family: system-ui, sans-serif;
  font-size: 0.875rem;
  line-height: 1;
  box-sizing: border-box;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 0;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    cursor: pointer;
  }

  &.${numberInputClasses.incrementButton} {
    grid-column: 2/3;
    grid-row: 1/2;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border: 1px solid;
    border-bottom: 0;
    &:hover {
      cursor: pointer;
      background: ${blue[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  }

  &.${numberInputClasses.decrementButton} {
    grid-column: 2/3;
    grid-row: 2/3;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border: 1px solid;
    &:hover {
      cursor: pointer;
      background: ${blue[400]};
      color: ${grey[50]};
    }

  border-color: ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
  background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
  color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
  }
  & .arrow {
    transform: translateY(-1px);
  }
`
);

function FilterForm() {
  const [isLoading, setIsLoading] = useState(true);

  const valuesMainList = ["Amount", "Title", "Date"];
  const valuesAmount = ["More", "Less"];
  const valuesTitle = ["Starts with", "Ends with"];
  const valuesDate = ["From", "To"];

  const [DataInformation, setDataInformation] = useState([
    ["Amount", "More", 4],
  ]);

  const handleChange = (event, index) => {
    console.log(event);
    console.log(event.target.value);
    console.log(index);
    let newData = DataInformation;

    newData[index][0] = event.target.value;
    console.log("newData");
    console.log(newData);
    setDataInformation(newData);
    setIsLoading(true);
  };

  const addRow = (event) => {
    event.preventDefault();
    setDataInformation([...DataInformation, ["Amount", "More", 4]]);
  };

  const removeRow = (event, index) => {
    event.preventDefault();
    const updatedData = [...DataInformation];
    updatedData.splice(index, 1);
    setDataInformation(updatedData);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Filter Name:", filterName);
  //   console.log("Criteria:", criteria);
  //   console.log("Selection:", selection);
  // };

  useEffect(() => {
    if (isLoading) {
      // console.log(DataInformation);
      setIsLoading(false);
    }
  }, [DataInformation, isLoading]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const createSecondField = (value, index) => {
    console.log(value);
    if (value[0] === "Amount") {
      return (
        <NativeSelect
          id={"condition" + index}
          value={value[1]}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {valuesAmount.map((value) => (
            <option value={value}>{value}</option>
          ))}
        </NativeSelect>
      );
    } else if (value[0] === "Title") {
      return (
        <NativeSelect
          id={"condition" + index}
          value={value[1]}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {valuesTitle.map((value) => (
            <option value={value}>{value}</option>
          ))}
        </NativeSelect>
      );
    } else {
      return (
        <NativeSelect
          id={"condition" + index}
          value={value[1]}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {valuesDate.map((value) => (
            <option value={value}>{value}</option>
          ))}
        </NativeSelect>
      );
    }
  };

  const createThirdField = (value, index) => {
    console.log(value);
    if (value[0] === "Amount") {
      return (
        <NumberInput
          aria-label={"Number" + index}
          placeholder="Type a number…"
          value={value[2]}
        />
      );
    } else if (value[0] === "Title") {
      return (
        <TextField label="Size" id="outlined-size-normal" value={value[2]} />
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="filter-form">
      <form>
        {DataInformation.map((value, index) => (
          <div className="oneLine">
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor={"criteria" + index}>Criteria</InputLabel>
              <NativeSelect
                id={"criteria" + index}
                value={value[0]}
                onChange={(e) => handleChange(e, index)}
                input={<BootstrapInput />}
              >
                {valuesMainList.map((value) => (
                  <option value={value}>{value}</option>
                ))}
              </NativeSelect>
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor={"condition" + index}>Condition</InputLabel>
              {createSecondField(value, index)}
            </FormControl>
            <FormControl sx={{ m: 1 }} variant="standard">
              {createThirdField(value, index)}
            </FormControl>

            <button onClick={(e) => removeRow(e, index)}>Remove Row</button>
          </div>
        ))}

        <button onClick={(e) => addRow(e)}>Add Row</button>

        {/* <button type="submit">Save</button> */}
      </form>
    </div>
  );
}

export default FilterForm;
