import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TitleBox from '../../UI/titlePart/TitleBox';
import CardActions from '@mui/material/CardActions';
import { addToCart } from '../../redux/action/cart.action';
import { setAlert } from '../../redux/slice/Alert.slice';
import Button from '../../UI/button/Button';
import CustomCard from '../../UI/CustomCard';

function Favourite() {
    const dispatch = useDispatch();
    const medicineState = useSelector((state) => state.shop);
    const favouriteState = useSelector(state => state.favourites);

    let mediToFavData = favouriteState.favItmes.map((item) => {
        let filterData = medicineState.shop.find((medicine) => medicine.id === item.fid);

        return { ...filterData, ...item }
    })

    const handleCart = (id) => {
        let addedCartItem = medicineState.shop.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.name + ' cloth is successfully added in cart', color: 'success' }))
        dispatch(addToCart(id))
    }
    return (
        <section id="favourite" className="favourite">
            <div className="container">
                <TitleBox
                    titleText='Your Favourites'
                    subTitleText={[
                        'Welcome to favourite. You can see here your favourite product. Thank you !!!'
                    ]} />

            </div>
            {
                mediToFavData.length > 0 ?
                    <section id="product2" className="section-p2">
                        {
                            mediToFavData.map((val) => {
                                return (
                                    <div className="col-md-3" key={val.id}>
                                        <CustomCard cardData={val} onclick={handleCart} btnText={'Add to Cart'} />
                                    </div>
                                )
                            })
                        }
                    </section> :
                    null
            }
        </section>
    );
}

export default Favourite;