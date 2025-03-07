import Layout from "../components/Layout";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

// Custom Box
const AboutContainer = styled(Box)({
  padding: "30px",
  backgroundColor: "#eee",
  borderRadius: "8px",
  boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
});

export default function About() {
  return (
    <Layout>
      <AboutContainer>
        <Typography variant="h3" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
        Active Insurance is coverage designed to prevent digital risk before it strikes. We combine the power of technology and insurance to help organizations identify, mitigate and respond to digital risks.
        </Typography>
      </AboutContainer>
    </Layout>
  );
}
