import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '../UI/button/Button';
import Typography from '@mui/material/Typography';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIconFilled from '@mui/icons-material/Favorite';

function CustomCard({ cardData}) {
    return (
        <Card className="p-4 position-relative shadow" style={{ height: '470px', position: 'relative'}}>
            {/* Product Image */}
            <div
                className='pro'>
                <img src={cardData.prec} alt='' />
            </div>
            <CardContent className='p-0'>
                <div className='d-flex justify-content-between align-items-center mb-4'>
                    <Typography variant="h5" sx={{
                        fontWeight: '700',
                        fontSize: '15px',
                        color: '#2c4964',
                    }} component="div">
                        {cardData.name}
                    </Typography>
                    {/* {
                        favouriteTrue ?
                            favItmes ?
                                <Button size="small" classes='p-0 bg-transparent remove' onClick={() => removeToFavourite(cardData.id)}>
                                    <FavoriteIconFilled sx={{ color: '#FF6337' }} />
                                </Button>
                                :
                                <Button size="small" classes='p-0 bg-transparent add' onClick={() => addToFavourite(cardData.id)}>
                                    <FavoriteIcon sx={{ color: '#FF6337' }} />
                                </Button>
                            : null
                    } */}

                </div>
                <Typography sx={{ my: 1.5 }} variant="body2" style={{ fontWeight: 'bold', textAlign: 'start' }}>
                    {cardData.desc}
                </Typography>
                <Typography color="text.secondary" style={{ fontWeight: 'bold', textAlign: 'start' }}>
                    <b color="text.primary">Price:</b> <CurrencyRupeeIcon fontSize="16px" />
                    {cardData.price}
                </Typography>

                {/* <CardActions className="more_about_medi py-2">
                    {
                        btnText ?
                            <Button size="small" classes='rounded px-3' onClick={() => onclick(cardData.id)}>{<i className="fa-solid fa-cart-shopping cart" />}</Button>
                            : null
                    }
                </CardActions> */}
            </CardContent>
        </Card >
    );
}

export default CustomCard;