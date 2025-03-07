import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

// Custom Navbar
const Navbar = styled(AppBar)({
  backgroundColor: "#0a2540",
  padding: "10px",
});

// Custom Container
const MainContainer = styled(Container)({
  marginTop: "20px",
  padding: "20px",
});

export default function Layout({ children }) {
  return (
    <>
      {/* Navbar */}
      <Navbar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff" }}>
            Coalition
          </Typography>
          <Link href="/" passHref>
            <Button sx={{ color: "white" }}>Home</Button>
          </Link>
          <Link href="/about" passHref>
            <Button sx={{ color: "white" }}>About</Button>
          </Link>
          <Link href="/blog" passHref>
            <Button sx={{ color: "white" }}>Blogs</Button>
          </Link>
        </Toolbar>
      </Navbar>

      {/* Nội dung trang */}
      <MainContainer>{children}</MainContainer>
    </>
  );
}
