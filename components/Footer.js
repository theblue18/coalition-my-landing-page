import { Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom Footer
const FooterWrapper = styled("footer")({
  backgroundColor: "#0a2540",
  color: "white",
  padding: "20px 0",
  marginTop: "50px",
  textAlign: "center",
});

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <Typography variant="body1">© 2025 Coalition Security. All rights reserved.</Typography>
      </Container>
    </FooterWrapper>
  );
}
