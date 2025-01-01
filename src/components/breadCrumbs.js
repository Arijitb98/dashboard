import { ReactComponent as HomeIcon } from "../assets/Icons/house-solid.svg";
import { ReactComponent as ArrowRightIcon } from "../assets/Icons/chevron-right.svg";
import { Box, IconButton, Typography } from "@mui/material";

import { ReactComponent as RightArrowIcon } from "../assets/Icons/rightArrow.svg";

const Breadcrumbs = ({ isSidebarVisible, toggleSidebar }) => {
  return (
    <Box
      padding={2}
      backgroundColor="#f5f5f5"
      boxShadow="0px 1px 5px rgba(0,0,0,0.1)"
    >
      <Typography color="#333" display="flex" alignItems="center">
        {!isSidebarVisible && (
          <IconButton onClick={toggleSidebar}>
            <RightArrowIcon width={20} height={20} />
          </IconButton>
        )}
        <HomeIcon width={20} height={20} />
        <ArrowRightIcon
          width={12}
          height={12}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        <span style={{ fontWeight: "normal" }}>Client</span>
        <ArrowRightIcon
          width={12}
          height={12}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        <span style={{ fontWeight: "normal" }}>Matter</span>
        <ArrowRightIcon
          width={12}
          height={12}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        <span style={{ fontWeight: "normal" }}>Transaction Detail Page</span>
        <ArrowRightIcon
          width={12}
          height={12}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        <span style={{ fontWeight: "bold" }}>Transaction Contents</span>
      </Typography>
    </Box>
  );
};

export default Breadcrumbs;
