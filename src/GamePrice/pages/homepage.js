import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/navbar';
import styled from 'styled-components';

export const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  opacity: 0.94;
  background-image: url(${require('../assets/img/background.png')});
  background-size: cover;
`;
export const TitleContainer = styled.div`
  margin-left: 8%;
  margin-top: 20%;
`;

export const Title = styled.h1`
  font-size: 4.44vw;
  font-family: 'Josefin Sans';
  font-weight: 400;
  word-wrap: break-word;
  color: white;
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5em;
  font-weight: 400;
  color: white;
  margin-top: 1em;
`;

export const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #3498db;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

export const HomePage = () => {
  return (
    <Backdrop>
      <Navbar></Navbar>
      <TitleContainer>
        <Title>Newbies2Buy</Title>
        <Subtitle>Stop being a noob and find the best prices on the market on our website.</Subtitle>
        <Button>See cheapest games to play</Button>
      </TitleContainer>
    </Backdrop>
  );
};

