import React from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link } from "react-router-dom";

const Container = styled.div`
    height : 60px;
`;

const Wrapper = styled.div`
    padding : 10px 20px;
    display : flex;
    align-items : center;
    justify-content : space-between;
`;

const Left = styled.div`
    flex : 1;
    display : flex;
    align-items : center;
`;

const Language = styled.span`
    font-size : 14px;
    cursor : pointer;
`;

const Input = styled.input`
    border : none;
`;

const Logo = styled.h1`
    font-weight : bold;
    justify-content : flex-start;
    align-items : center;
`;

const SearchContainer = styled.div`
    border : 0.5px solid lightgray;
    display : flex;
    align-items : center;
    margin-left : 25px;
    padding : 5px;
`;

const Center = styled.div`
    flex : 1;
    display : flex;
    align-items : center;
    width : 100%;
`;

const Right = styled.div`
    flex : 1;
    display : flex;
    align-items : center;
    justify-content : flex-end;
`;

const MenuItem = styled.div`
    font-size : 14px;
    cursor : pointer;
    margin-left : 25px;
    text-decoration : none;
`;

const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>
                        <Logo>ETSYY</Logo>
                    </Language>
                </Left>
                <Center>
                    <SearchContainer>
                        <Input />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Center>
                <Right>
                    <Link to="/register"><MenuItem>Register</MenuItem></Link>
                    <Link to="/login"><MenuItem>Login</MenuItem></Link>
                    <MenuItem>
                        <Badge badgeContent={1} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar