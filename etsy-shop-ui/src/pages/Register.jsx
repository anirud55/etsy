import { useState } from "react";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import ENavbar from "../components/ENavbar";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    );
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;


const Register = () => {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [uname, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { fname, lname, uname, email, password });
};

  return (
    <div>
      <ENavbar />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input placeholder="First Name" 
            autoComplete="off" 
            name="fname" 
            onChange={(e) => setFName(e.target.value)}
            required="true" />
            <Input placeholder="Last Name" 
            autoComplete="off" 
            name="lname" 
            onChange={(e) => setLName(e.target.value)}
            required="true" />
            <Input placeholder="Username" 
            autoComplete="off" 
            name="uname" 
            onChange={(e) => setUName(e.target.value)}
            required="true"/>
            <Input placeholder="Email" 
            autoComplete="off" 
            name="email" 
            onChange={(e) => setEmail(e.target.value)}
            type="email" 
            required="true"/>
            <Input placeholder="Password" 
            autoComplete="off" 
            type="password" 
            onChange={(e) => setPassword(e.target.value)}
            name="pass" 
            required="true"/>
            <Input placeholder="Confirm Password" 
            autoComplete="off" 
            type="password" 
            name="cpass" 
            required="true"/>
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleClick} disabled={isFetching} hide={error}>
              CREATE
              </Button>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Register;