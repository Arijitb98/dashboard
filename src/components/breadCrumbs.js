import { ReactComponent as HomeIcon } from "../assets/Icons/house-solid.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/Icons/chevron-right.svg";
import { Box, Typography } from "@mui/material";

const Breadcrumbs = ({}) => {
  return (
    <Box
      padding={2}
      backgroundColor="#f5f5f5"
      boxShadow="0px 1px 5px rgba(0,0,0,0.1)"
    >
      <Typography
        // variant="h6"
        // fontWeight="bold"
        color="#333"
        display="flex"
        alignItems="center"
      >
        {/* Home Icon */}
        <HomeIcon width={20} height={20} />
        <ArrowRightIcon
          width={12}
          height={12}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        Client
        <ArrowRightIcon
          width={12}
          height={12}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        Matter
        <ArrowRightIcon
          width={12}
          height={12}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        Transaction Detail Page
        <ArrowRightIcon
          width={12}
          height={12}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        Transaction Contents
      </Typography>
    </Box>
  );
};

export default Breadcrumbs;
