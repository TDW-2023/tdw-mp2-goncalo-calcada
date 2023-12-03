import React, { useEffect } from 'react';
import { useGetGameDealsQuery } from '../redux/listgamedeals';
import styled from 'styled-components';
import { store } from './store';
import { updateCurrentPage, fetchGamesFailure } from '../redux/listcardreducer';
import { Carousel } from 'react-bootstrap';




const StyledCarousel = styled(Carousel)`
width: 50%; /* Ajuste a largura conforme necessário */
margin: auto;
margin-top:7%;

`;
const StyledCarouselItem = styled(Carousel.Item)`
  img {
    width: 100%;
    height: auto;
  }
`;
const StyledCarouselCaption = styled(Carousel.Caption)`
  position: absolute;

  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 1; 
text-align: center;



  ::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1; 
  }
`;

const PriceText = styled.p`
  margin: 0;
  font-size: 18px;
`;

const ListGameDeals = () => {
    const { data, isLoading, error } = useGetGameDealsQuery();

    useEffect(() => {
        if (data) {



            store.dispatch(updateCurrentPage([data]));
        } else if (error) {
            store.dispatch(fetchGamesFailure({ error: error.message }));
        }
    }, [data, error]);

    if (isLoading) {
        return <p>Dados a serem carregados...</p>;
    }

    if (error) {
        return <p>Erro ao carregar dados: {error.message}</p>;
    }

    return (

        <StyledCarousel>
            {data.map((deal) => (
                <StyledCarouselItem key={deal.dealID}>
                    <img
                        className="d-block w-100"
                        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${deal.steamAppID}/header.jpg`}
                        alt={`Imagem de ${deal.title}`}
                    />
                    <StyledCarouselCaption>
                        <h3>{deal.title}</h3>
                        <PriceText>Normal Price: {deal.normalPrice} €</PriceText>
                        <PriceText>Discounted price: {deal.salePrice} €</PriceText>
                    </StyledCarouselCaption>
                </StyledCarouselItem>
            ))}
        </StyledCarousel>

    );
};

export default ListGameDeals;