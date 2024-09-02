import { Fragment, useEffect, useState } from "react";
import { Card, Grid, Select, styled, useTheme, MenuItem, InputLabel, FormControl } from "@mui/material";
import StatCards from "./shared/StatCards";
import StatCards2 from "./shared/StatCards2";
import DoughnutChart from "./shared/Doughnut";
import { observer } from "mobx-react-lite";
import useGet from "../../hooks/useGet";
import { constants } from "../../utils/constant";
import { get30DaysBeforeDate, getDateForInput } from "../../utils/utils";
import { SdlLoading } from "../../components";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" }
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize"
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary
}));

function Dashboard() {
  const { palette } = useTheme();
  const initFilter = {
    tenure:constants.MONTHLY,
    dateFrom:get30DaysBeforeDate(),
    dateTo:new Date()
  }
  const [filter, setFilter] = useState(initFilter)
  const [query, setQuery] = useState("")
  useEffect(()=>{
    let q=""
    if(filter.tenure!=""){
      q+="tenure="+filter.tenure
    }
    if(filter.dateFrom && filter.dateTo && filter.tenure==""){
      q="fromDate="+getDateForInput(filter.dateFrom)+"&toDate="+getDateForInput(filter.dateTo)
    }
    setQuery(p=>q)
  },[filter])
  const [err, loading, analytics] = useGet("stats/analytic?"+query,[query]);

  const handleFilter=(e)=>{
    setFilter(p=>{
      const obj = {...p}
      obj[e.target.name]=e.target.value
      return obj
    })
  }

  const setFilterFieldValue=(field,value)=>{
    setFilter(p=>{
      const obj = {...p}
      obj[field] = value
      return obj
    })
  }

  return (
    <Fragment>
      {loading?<SdlLoading/>:
      <ContentBox className="analytics">
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Card sx={{ px: 2, py: 2, mb: 3 }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="tenure">Tenure</InputLabel>
              <Select
                labelId="tenure"
                value={filter.tenure}
                defaultValue={constants.MONTHLY}
                label="Tenure"
                name="tenure"
                onChange={handleFilter}
              >
                <MenuItem value="">NONE</MenuItem>
                <MenuItem value={constants.MONTHLY}>{constants.MONTHLY.toUpperCase()}</MenuItem>
                <MenuItem value={constants.QUARTERLY}>{constants.QUARTERLY.toUpperCase()}</MenuItem>
                <MenuItem value={constants.YEARLY}>{constants.YEARLY.toUpperCase()}</MenuItem>
              </Select>
              </ FormControl>
            </Card>
            <StatCards data={analytics?.income??[]} />
            <StatCards2 
            incomeGrowth={analytics?.incomeGrowth} 
            bookingGrowth={analytics?.bookingGrowth}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            {/* client card like client growth */}
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Bookings</Title>
              <DoughnutChart
                sourceData={analytics?.bookings??[]}
                height="320px"
                color={["blueviolet", "indigo", "dodgerblue", "teal", "navy"]}
              />
            </Card>
          </Grid>
        </Grid>
      </ContentBox>}
    </Fragment>
  );
}

export default observer(Dashboard);
