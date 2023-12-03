import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../redux/listcardactions';
import { fetchGamesSuccess, fetchGamesFailure, updateCurrentPage } from '../redux/listcardreducer';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ListGameDeals from '../components/listgames';
import Navbar from '../components/navbar';
import { css } from 'styled-components';
import { Card as BootstrapCard } from 'react-bootstrap';

export const linkStyle = css`
  margin-top: 1%;
  margin-left: 2%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const CardContainer = styled.div`
  display: grid;
  justify-content: center;
`;

export const StyledCard = styled(BootstrapCard)`
  width: 30rem; 
  height:25rem;
  padding:0; 
 
`;

export const CardImg = styled(BootstrapCard.Img)`
  height: 160px;
  object-fit: cover;
`;

export const CardBody = styled(BootstrapCard.Body)`
  text-align: center;
`;



export const LoadingMessage = styled.p`
  font-size: 18px;
  color: #007bff;
`;

export const ErrorMessage = styled.p`
  font-size: 18px;
  color: #dc3545;
`;
export const CardButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;
export const Backdrop = styled.div`
  width: 100%;
  height: 78vh;
  opacity: 0.94;
  background-image: url(${require('../assets/img/background.png')});
  background-size: cover;
`;

export const StyledContainer = styled.div`

  display: flex;
  align-items: center;
  background-color: #24325C;
  padding: 150px;
  h1 {
    font-size: 24px;
    color: white;
  }
`;

const FilterContainer = styled.div`
color: #FFF;
background-color: #24325C;
display: flex;
justify-content: center;
align-items: center;

`;

const FilterButtons = styled.div`
display: flex;
  margin-right: 30px; 
  display: flex;
`;

const PaginationButtons = styled.div`
  display: flex;


`;

const StyledButton = styled.button.attrs(props => ({
    'data-active': props.active,
}))`
    background-color: ${props => props['data-active'] ? '#007bff' : 'grey'};
    text-decoration: ${props => props['data-active'] ? 'underline' : 'none'};
    margin: 30px;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    padding:100 100px;
    Color:#FFF;
    cursor: pointer;
    width: 150px;
    &:hover {
        background-color: ${props => props['data-active'] ? 'lightcyan' : 'lightgray'};
        Color: ${props => props['data-active'] ? 'black' : 'black'};
        text-decoration: ${props => props['data-active'] ? 'underline' : 'none'};
       
`;
const SearchInput = styled.input`
  margin: 10px;
  padding: 8px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  margin: 10px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;



const GameList = () => {
    const [store, setStore] = useState('Steam');
    const dispatch = useDispatch();
    const gameListState = useSelector((state) => state.games);
    const { deals, loading, error, currentPage, size, storeID } = gameListState;
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await dispatch(fetchGames({ page: currentPage, size }));
                const data = await response.payload;
                console.log(currentPage, size)

                console.log('Fetched data:', data);
                dispatch(fetchGamesSuccess(data));


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


        fetchData();
    }, [dispatch, currentPage, size, storeID]);

    const handleSearch = () => {
        const term = searchTerm.toLowerCase();
        const filteredDeals = deals.filter(
            deal => deal.title.toLowerCase().includes(term)
        );
        dispatch(fetchGamesSuccess(filteredDeals));
    };


    const nextPage = () => {
        const nextSize = size + 10;

        dispatch(updateCurrentPage({ page: currentPage, size: nextSize }));
    };

    const prevPage = () => {
        const prevSize = size - 10;

        dispatch(updateCurrentPage({ page: currentPage, size: prevSize }));
    };

    const storeUpdate = async (storeId) => {
        try {

            const response = await dispatch(fetchGames({ page: storeId, size }));

            // verificar se os dados de resposta foram bem sucedidos
            if (response.payload) {

                const data = response.payload;


                dispatch(fetchGamesSuccess(data));
            } else {

                dispatch(fetchGamesFailure({ error: 'Erro ao buscar jogos' }));
            }
        } catch (error) {

            dispatch(fetchGamesFailure({ error: error.message }));
        }
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const displayedDeals = deals.slice(deals.length - 10, deals.length);

    const validDeals = displayedDeals.filter(deal => deal.dealID);


    return (


        <>

            <Backdrop><Navbar /><ListGameDeals /></Backdrop>

            <FilterContainer>

                <FilterButtons>

                    <StyledButton active={store === 'Steam'} onClick={() => { setStore('Steam'); storeUpdate(1); }}>Steam</StyledButton>
                    <StyledButton active={store === 'GamersGate'} onClick={() => { setStore('GamersGate'); storeUpdate(2); }}>GamersGate</StyledButton>
                </FilterButtons>
                <h1>Check Out Our Game Library</h1>
                <SearchInput
                    type="text"
                    placeholder="Search by item name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchButton onClick={handleSearch}>Search</SearchButton>

                <PaginationButtons>
                    <StyledButton onClick={prevPage}>Back</StyledButton>
                    <StyledButton onClick={nextPage}>Forward</StyledButton>
                </PaginationButtons>

            </FilterContainer>

            <StyledContainer>


                {loading && <LoadingMessage>Carregando...</LoadingMessage>}
                {error && <ErrorMessage>Erro ao carregar imagens: {error}</ErrorMessage>}


                {validDeals.length > 0 ? (
                    <Row  >
                        {validDeals
                            .slice()
                            .filter((deal) => deal.title.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((deal) => (
                                <Col key={deal.dealID} xs={12} sm={6} md={4} lg={3} className='mb-5 mt-n5'>
                                    <StyledCard >
                                        <CardImg src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${deal.steamAppID}/capsule_616x353.jpg`} alt={`Games ${deal.title}`} onError={(e) => {
                                            e.target.src = deal.thumb;
                                        }}
                                        />
                                        <CardBody>
                                            <h6>Game title:{deal.title}</h6>
                                            <p>Sale Price:{deal.salePrice} €</p>
                                        </CardBody>

                                        <Button className='m-2' variant="primary" as={Link} to={`https://store.steampowered.com/app/${deal.dealID}`}>Steam</Button>
                                        <Button
                                            className='m-2'
                                            variant="primary"
                                            as={Link}
                                            to={`/Listcard/${encodeURIComponent(deal.dealID)}&amp;k=1`}
                                        >
                                            Detailed Overview
                                        </Button>
                                    </StyledCard>
                                </Col>
                            ))}
                    </Row>
                ) : (
                    <p>{searchTerm ? 'No matching games found' : 'Any game was found'}</p>
                )}
            </StyledContainer>
        </>

    );
};
export default GameList;