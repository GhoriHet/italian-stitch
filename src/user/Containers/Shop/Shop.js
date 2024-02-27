import React, { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import ShopList from './ShopList';
import { addToCart } from '../../redux/action/cart.action';
import { setAlert } from '../../redux/slice/Alert.slice';
import { addOnStoreAndAPI, removeOnStoreAndAPI } from '../../redux/action/favourite.action';
import { getProduct } from '../../redux/slice/Product.slice';

function Shop({ categoryId }) {
    const dispatch = useDispatch();
    const [filteredData, setFilteredData] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const product = useSelector(state => state.product)
    const favouriteState = useSelector(state => state.favourites);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const handleSearching = (value) => {
        setSearchValue(value);
        const f_dataBySearch = product.product.filter(
            (v) =>
                v.name.toLowerCase().includes(value.toLowerCase()) ||
                v.price.toString().includes(value) ||
                v.desc.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(f_dataBySearch);
    };

    const handleCart = (id) => {
        let addedCartItem = product.product.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.name + ' cloth is successfully added in cart', color: 'success' }))
        dispatch(addToCart(id));
    }
    const addToFavourite = (id) => {
        let addedFavouriteItem = product.product.find((val) => val.id === id)
        dispatch(setAlert({ text: addedFavouriteItem.name + ' is successfully added in Favourite', color: 'success' }))
        dispatch(addOnStoreAndAPI(id))
    }

    const removeToFavourite = (id) => {
        let removeFavouriteItem = product.product.find((val) => val.id === id)
        dispatch(setAlert({ text: removeFavouriteItem.name + ' is successfully removed from Favourite', color: 'success' }))
        dispatch(removeOnStoreAndAPI(id))
    }

    return (
        <div>
            <section id="page-header">
                <h2>#shopfromhome</h2>
                <p>Save more with coupons &amp; up to 70% off!</p>
            </section>

            <div className='row justify-content-center'>
                <div className='col-6'>
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            type='search'
                            fullWidth
                            id="input-with-sx"
                            value={searchValue}
                            onChange={(e) => handleSearching(e.target.value)}
                            label="Search Here....."
                            variant="standard"
                        />
                    </Box>
                </div>
            </div>
            <section id="product1" className="section-p1">
                <div className="row py-5 g-4">
                    <ShopList
                        shopData={searchValue !== '' ? filteredData : product.product}
                        handleCart={handleCart}
                        addToFavourite={addToFavourite}
                        removeToFavourite={removeToFavourite}
                        loading={product.loading}
                        error={product.error}
                        favItmes={favouriteState.favItmes}
                    />
                </div>
            </section>
        </div>
    );
}

export default Shop;