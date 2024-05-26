import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
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
import FilterForm from "../components/FilterForm";
import Button from "@mui/material/Button";

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

function FilterFormPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [filterName, setFilterName] = useState("");

  const valuesMainList = ["Amount", "Title", "Date"];
  const valuesAmount = ["More", "Less"];
  const valuesTitle = ["Starts with", "Ends with"];
  const valuesDate = ["From", "To"];

  const today = dayjs();
  const yesterday = dayjs().subtract(1, "day");
  // console.log(yesterday);
  const todayStartOfTheDay = today.startOf("day");

  const [DataInformation, setDataInformation] = useState([
    ["Amount", "More", 4],
  ]);

  const handleChange = (event, val, index, valueIndex) => {
    event.preventDefault();
    let newData = DataInformation;

    var result;

    if (valueIndex === 0) {
      if (event.target.value === "Amount") {
        result = {
          ...DataInformation,
          [index]: [event.target.value, "More", 4],
        };
      } else if (event.target.value === "Title") {
        result = {
          ...DataInformation,
          [index]: [event.target.value, "Starts with", "Ka"],
        };
      } else {
        result = {
          ...DataInformation,
          [index]: [event.target.value, "From", "2024-05-24T13:52:47.000Z"],
        };
      }
    } else if (valueIndex === 2 && newData[index][0] === "Amount") {
      let array = DataInformation[index];
      array[valueIndex] = val;
      result = {
        ...DataInformation,
        [index]: array,
      };
    } else {
      let array = DataInformation[index];
      array[valueIndex] = event.target.value;
      result = {
        ...DataInformation,
        [index]: array,
      };
    }
    // console.log(result);
    // console.log(Object.values(result));
    setDataInformation(Object.values(result));
    // setDataInformation(newData);
    // setIsLoading(true);
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

  const updateDate = (event, index, valueIndex) => {
    let test = dayjs(event).toString();
    var date = new Date(test);
    // console.log(date.toISOString());

    let array = DataInformation[index];
    array[valueIndex] = date.toISOString();
    var result = {
      ...DataInformation,
      [index]: array,
    };

    setDataInformation(Object.values(result));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Data:", DataInformation);
    let x = Math.round(Math.random() * 100000000);
    let newInformation = {
      id: x,
      title: filterName,
    };

    try {
      fetch("http://localhost:8080/api/filters", {
        method: "POST",
        body: JSON.stringify(newInformation),
        headers: { "Content-Type": "application/json" },
      }).then((response) => console.log(response));
    } catch (error) {
      console.error(error);
    }

    DataInformation.forEach((element) => {
      let newInformationCriteria = {
        id: Math.round(Math.random() * 100000000),
        filterID: x,
        criteria: element[0],
        comparingCondition: element[1],
        conditionValue: element[2],
      };
      // console.log(newInformationCriteria);
      try {
        fetch("http://localhost:8080/api/criteria", {
          method: "POST",
          body: JSON.stringify(newInformationCriteria),
          headers: { "Content-Type": "application/json" },
        }).then((response) => console.log(response));
      } catch (error) {
        console.error(error);
      }
    });
  }

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [DataInformation, isLoading]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  const createSecondField = (value, index) => {
    if (value[0] === "Amount") {
      return (
        <NativeSelect
          id={"condition" + index}
          value={value[1]}
          onChange={(e) => handleChange(e, undefined, index, 1)}
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
          onChange={(e) => handleChange(e, undefined, index, 1)}
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
          onChange={(e) => handleChange(e, undefined, index, 1)}
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
    if (value[0] === "Amount") {
      return (
        <NumberInput
          aria-label={"Number" + index}
          placeholder="Type a number…"
          value={value[2]}
          onChange={(e, val) => handleChange(e, val, index, 2)}
        />
      );
    } else if (value[0] === "Title") {
      return (
        <div className="textInput">
          <TextField
            label="Title"
            id="outlined-size-normal"
            value={value[2]}
            onChange={(e) => handleChange(e, undefined, index, 2)}
          />
        </div>
      );
    } else {
      return (
        <div className="datePicker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DemoItem label="DatePicker">
                <DatePicker
                  value={dayjs(value[2])}
                  disablePast
                  onChange={(e) => updateDate(e, index, 2)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
      );
    }
  };

  console.log(DataInformation);

  return (
    <div className="filter-form">
      <form>
        <div className="filterNameInput">
          <TextField
            label="Filter Name"
            id="outlined-size-normal"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </div>
        {DataInformation.map((value, index) => (
          <FilterForm
            props={{
              value,
              index,
              valuesMainList,
              handleChange,
              removeRow,
              createSecondField,
              createThirdField,
            }}
          ></FilterForm>
        ))}
        <div className="addRowButton">
          <Button
            variant="contained"
            onClick={(e) => addRow(e)}
            id="addRowButton"
          >
            Add Row
          </Button>
        </div>
        <div className="bottomButtons">
          <Button variant="contained" href="/" id="closeButton">
            Close
          </Button>
          <Button
            id="savebutton"
            variant="contained"
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FilterFormPage;
