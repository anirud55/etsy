import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Container = styled.div`
  
`;

const Wrapper = styled.div`
  padding : 50px;
  display:flex;

`;

const ImgContainer = styled.div`
  flex:1;

`;

const Image = styled.img`
  width:100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex:1;
  padding :0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin:20px 0px;
`;

const Price = styled.span`
  font-weight:100;
  font-size:40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display:flex;
  justify-content:space-between;
`;

const Filter = styled.div`
  display : flex;
  align-items:center;
`;

const FilterTitle = styled.span`
  font-size:20px;
  font-weight:200;
`;

const FilterColor = styled.div`
  width:15px;
  height: 15px;
  border-radius:40%;
  background-color: ${props=>props.color};
  margin: 0px 5px;
  cursor:pointer;
`;

const AddContainer = styled.div`
  width:50%;
  display:flex;
  align-items:center;
  justify-content : space-between;
`;
const AmountContainer = styled.div`
  display:flex;
  align-items:center;
  font-weight:700;
`;
const Amount = styled.span`
  width : 30px;
  height : 30px;
  border-radius : 10px; 
  border : 1px solid teal;
  display : flex;
  align-items:center;
  justify-content:center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight : 500;
  &:hover{
    background-color : #f8f4f4;
  }
`;

const Product = () => {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src="https://www.prada.com/content/dam/pradanux_products/1/1BA/1BA350/ZO6F02SB/1BA350_ZO6_F02SB_V_OOO_SLR.png/_jcr_content/renditions/cq5dam.web.hebebed.3000.3000.jpg" />
        </ImgContainer>
        <InfoContainer>
          <Title>Prada Re-Edition 1995 brushed-leather medium handbag</Title>
          <Desc>This handbag, a re-edition of an iconic Prada bag of 1995, is characterized by its elegant geometric silhouette with distinct, minimalist lines. Formal allure and practicality meet in its design with a central zipper closure and three internal compartments, enhanced by the sophisticated accent of the silver screen-printed lettering logo. The accessory is made of fine brushed leather, an expression of the brand's expertise.

            Product code: 1BA350_ZO6_F02SB_V_OOO
            Leather handles
            Metal hardware
            Screen-printed lettering logo
            Nylon logo-print lining with three compartments, including one with zipper
            Prada Re-Edition 1995 keychain
            Height: 21cm
            Length: 8cm
            Width: 30cm
          </Desc>
          <Price>$ 3,050</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="Red" />
              <FilterColor color="Black" />
              <FilterColor color="Blue" />
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
              <Button>ADD TO CART</Button>
            </AmountContainer>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Product