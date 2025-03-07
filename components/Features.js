import { Typography, Grid, Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import SecurityIcon from "@mui/icons-material/Security";
import ShieldIcon from "@mui/icons-material/Shield";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

// Custom Feature Card
const FeatureCard = styled(Card)({
  textAlign: "center",
  padding: "20px",
  boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
});

const iconMapping = {
  Security: <SecurityIcon fontSize="large" />,
  Shield: <ShieldIcon fontSize="large" />,
  VerifiedUser: <VerifiedUserIcon fontSize="large" />,
};

export default function Features({ features }) {
  return (
    <Grid container spacing={4} justifyContent="center">
      {features.map((feature, index) => (
        <Grid item xs={12} md={4} key={index}>
          <FeatureCard>
            {iconMapping[feature.icon] || <SecurityIcon fontSize="large" />}
            <Typography variant="h5" sx={{ marginTop: "10px" }}>
              {feature.title}
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }}>
              {feature.description}
            </Typography>
          </FeatureCard>
      </Grid>
      ))}
    </Grid>
  );
}
