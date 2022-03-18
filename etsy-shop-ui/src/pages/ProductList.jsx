import { Announcement } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Container = styled.div`
  
`;

const Title = styled.h1`
margin:20px;
`;

const FilterContainer = styled.div`
  display:flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin:20px;
`;

const FilterText = styled.span`
  font-size:20px;
  font-weight:600;
  margin-right:20px;
`;

const Select = styled.select`
  padding:10px;
  margin-right: 20px;

`;

const Option = styled.option`
  
`;


const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>
            Filter Products:
          </FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
            <Option>Pink</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>XXL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>
            Sort Products:
          </FilterText>
          <Select>
            <Option selected>Relevancy</Option>
            <Option>Lowest Price</Option>
            <Option>Highest Price</Option>
            <Option>Top Customer Reviews</Option>
            <Option>Most Recent</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Footer />
    </Container>
  )
}

export default ProductList