import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { styled } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getDateForInput } from "../../utils/utils";

const Div = styled("div")(() => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: "15px"
}));

export default function DatePickerValue({filter, handleFilter}) {
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Div>
        <DatePicker label="Start Date" value={dayjs(filter.dateFrom)} onChange={(val) => handleFilter("dateFrom",getDateForInput(val.$d))} />
        <DatePicker label="End Date" value={dayjs(filter.dateTo)} onChange={(val) => handleFilter("dateTo",getDateForInput(val.$d))} />
      </Div>
    </LocalizationProvider>
  );
}
