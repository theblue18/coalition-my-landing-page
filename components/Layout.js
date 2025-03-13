import {  Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header  from "./Header";



// Custom Container
const MainContainer = styled(Container)({
  marginTop: "20px",
  padding: "20px",
});

export default function Layout({ children }) {
  return (
    <>
  
      <Header/>

      {/* Nội dung trang */}
      <MainContainer>{children}</MainContainer>
    </>
  );
}
