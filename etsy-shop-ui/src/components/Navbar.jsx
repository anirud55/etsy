import React from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

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
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const handleClick = (e) => {
        e.preventDefault();
        logout(dispatch);
    };
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>
                        <Link to="/"><Logo>ETSYY</Logo></Link>
                    </Language>
                </Left>
                <Center>
                    <SearchContainer>
                        <Input />
                        <Search style={{ color: "gray", fontSize: 16 }} />
                    </SearchContainer>
                </Center>
                <Right>
                    <Link to="/register" hide={user}><MenuItem>Register</MenuItem></Link>
                    <Link to="/login" hide={user}><MenuItem>Login</MenuItem></Link>
                    <MenuItem onClick={handleClick} hide={!user}>Logout</MenuItem>
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