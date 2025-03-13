import { AppBar, Toolbar, Button, Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

import SearchIcon from "@mui/icons-material/Search";



// Menu Item
const NavItem = styled(Button)(({  }) => ({
  color: "black",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "16px",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

export default function Header() {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "white", paddingY: 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Section */}
        <Box display="flex" alignItems="center" gap={4}>
          <Link href="/">
          <NavItem>Coalition</NavItem>
          </Link>
          <NavItem>Products</NavItem>
          <NavItem>Why Coalition</NavItem>
          <NavItem>Resources</NavItem>
          <NavItem>Company</NavItem>
        </Box>

    
        <Box display="flex" alignItems="center" gap={3}>
          <Typography variant="body2" sx={{ color: "gray" }}>
            Cyber Incident? <Link href="#"><b style={{ color: "#0057FF" }}>Get Help</b></Link>
          </Typography>
          <Button variant="contained" sx={{ backgroundColor: "#0057FF", color: "white" }}>
            Log In
          </Button>
          <IconButton>
            <SearchIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
