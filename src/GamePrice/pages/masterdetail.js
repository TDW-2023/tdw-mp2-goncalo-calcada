import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameDetailSuccess } from '../redux/listcardreducer';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

const Frame = styled.div`
  display: flex;
  align-items: center;
  background-color:#24325a;
  height: auto;
 
  width: 80%; 
  margin: 20px auto;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 2);
  
`;




const Group = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: flex-start;
`;

const OverlapGroup = styled.div`
  height: 900px;
  width: 600px;
  position: relative;
`;




const TextContainer = styled.div`
  margin-left: 70px;
  margin-bottom: 10px; /* Ajuste conforme necessário para espaçamento vertical */
`;

const TextWrapper = styled.div`
  color: #818af9;
  font-family: Roboto;

  
  margin-top: 10px;
  position: flex;
  width: 100%;
`;

const TextWrapper11 = styled(TextWrapper)`
  color: #FFF;
  font-size: 70px;
  font-weight: 20em;


`;

const TextWrapper3 = styled(TextWrapper)`
  color: #FFF;
  font-size: 20px;
  font-weight: 20em;

`;

const ScaledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit:cover;
 
`;
const commonButtonStyle = `
width: auto;
  background-color: #3498db;
  color: #fff;
  padding: 12px 50px;
  border-radius: 7px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease;
  display:flex;
  &:hover {
    background-color: #2980b9;
  }
`;
const StyledLink = styled(Link)`
  ${commonButtonStyle}
  font-size:25px; 
  margin-bottom: 10px;  
  display:flex;
`;

const InstallButton = styled(Link)`
  ${commonButtonStyle}
  font-size:25px; 
  display:flex;

`;


const StyledLinkWrapper = styled.div`
  margin-top: 25px; 
  margin-left: 70px;
`;


export const Backdrop = styled.div`
  width: 100vw; /* 100% of viewport width */
  height: 100vh; /* 100% of viewport height */
  opacity: 0.94;
  background-image: url(${require('../assets/img/background.png')});
  background-size: cover;
`;



const MasterDetail = () => {
  const dispatch = useDispatch();
  const gameDetailState = useSelector((state) => state.games);
  const { detail, loading, error } = gameDetailState;
  const { id } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {

        const decodedID = decodeURIComponent(id);
        const detailApiUrl = `https://www.cheapshark.com/api/1.0/deals?id=${decodedID}`;


        const response = await fetch(detailApiUrl);
        console.log('Detalhes do jogo:', response);


        const data = await response.json();
        if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
          throw new Error('Data invalida da api');
        }
        const gameDetails = data;

        dispatch(fetchGameDetailSuccess(gameDetails));
      } catch (error) {
        console.error('erro com os detalhes do jogo:', error);

        navigate('/Listcard');
      }
    };

    fetchData();
  }, [dispatch, id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!detail || !detail.gameInfo) {
    return <div>Loading...</div>;
  }

  const retailPrice = parseFloat(detail.gameInfo.retailPrice);
  const salePrice = parseFloat(detail.gameInfo.salePrice);
  const percetageOfSaving = ((retailPrice - salePrice) / retailPrice) * 100;

  return (

    <>
      <Backdrop><Navbar />
        <Frame>




          <OverlapGroup>

            <ScaledImage src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${detail.gameInfo.steamAppID}/library_600x900_2x.jpg`} alt="Game Thumbnail" />
          </OverlapGroup>



          <Group>
            <TextContainer>
              <TextWrapper11>Title: {detail.gameInfo.name}</TextWrapper11>
            </TextContainer>
            <TextContainer>
              <TextWrapper3>Publisher: {detail.gameInfo.publisher}</TextWrapper3>
            </TextContainer>
            <TextContainer>
              <TextWrapper3>Release Date: {new Date(detail.gameInfo.releaseDate * 1000).toLocaleDateString()}</TextWrapper3>
            </TextContainer>
            <TextContainer>
              <TextWrapper3>Retail Price: ${detail.gameInfo.retailPrice}</TextWrapper3>
            </TextContainer>
            <TextContainer>
              <TextWrapper3>Sale Price: ${detail.gameInfo.salePrice}</TextWrapper3>
            </TextContainer>
            <TextContainer>
              <TextWrapper3>Metacritic Score: {detail.gameInfo.metacriticScore}</TextWrapper3>
            </TextContainer>
            <TextContainer>
              <TextWrapper3>Metacritic Score: {detail.gameInfo.metacriticScore}</TextWrapper3>
            </TextContainer>
            <TextContainer>
              <TextWrapper3>Percetage Of Saving; {percetageOfSaving.toFixed(1)} %</TextWrapper3>
            </TextContainer>
            <TextContainer>
              <TextWrapper3>Steam Rating: {detail.gameInfo.steamRatingText}</TextWrapper3>
            </TextContainer>
            <StyledLinkWrapper>
              <StyledLink to={`https://store.steampowered.com/app/${detail.gameInfo.steamAppID}`}>
                Steam Link
              </StyledLink>
              <InstallButton to={`steam://install/${detail.gameInfo.steamAppID}`} target="_blank" rel="noopener noreferrer">
                Install Game
              </InstallButton>
            </StyledLinkWrapper>
          </Group>


        </Frame>
      </Backdrop>
    </>
  );
};

export default MasterDetail;