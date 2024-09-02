import { Box, Card, Grid, IconButton, styled, Tooltip } from "@mui/material";
import {
  CurrencyRupee,
  LocalShipping,
  ArrowRightAlt
} from "@mui/icons-material";
import { Small } from "../../../components/Typography";
import { useEffect, useState } from "react";
import {CashIcon, CodIcon, CreditIcon, ProfitIcon, TopayIcon, TotalRuppes, TruckIcon} from '../../../components/icons'

// STYLED COMPONENTS
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": { opacity: 0.6, fontSize: "44px", color: theme.palette.primary.main }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

const PngIcon = styled('img')(({}=({
  filter: 'invert(43%) sepia(67%) saturate(1012%) hue-rotate(157deg) brightness(99%) contrast(101%)'
})))

export default function StatCards({ data }) {
  const [cardList, setCardList] = useState([]);
  useEffect(() => {
    console.log(data);
    setCardList((p) => {
      const toArr = Object.entries(data);
      const list = toArr.map(([k, v], index) => {
        let icon = null;
        if (k.toLowerCase().includes("booking")) {
          icon = TruckIcon
        } else if(k.toLowerCase().includes("cod")){
          icon = CodIcon
        } else if(k.toLowerCase().includes("credit")){
          icon = CreditIcon
        } else if(k.toLowerCase().includes("topay")) {
          icon = TopayIcon
        } else if(k.toLowerCase().includes('total')){
          icon = ProfitIcon
        } else {
          icon = CashIcon
        }
        return {
          name: k
            .split(/(?=[A-Z])/)
            .join(" ")
            .toUpperCase(),
          amount: v,
          Icon: icon?icon : CurrencyRupee
        };
      });
      return list;
    });
  }, [data]);

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map(({ amount, Icon, name }) => (
        <Grid item xs={12} md={6} key={name}>
          <StyledCard elevation={6}>
            <ContentBox>
              <PngIcon src={Icon} height={45} width={45}  />
              <Box ml="12px">
                <Small>{name}</Small>
                <Heading>{amount}</Heading>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
