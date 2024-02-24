import React from 'react';
import CustomCard from '../../UI/CustomCard';
import Loader from '../../UI/loader/Loader';
import Error from '../../UI/errorMsg/ErrorMsg'
import { NavLink } from 'react-router-dom';

function ShopList({ shopData, handleCart, loading, error, addToFavourite, removeToFavourite, favItmes }) {
    return (
        <>
            {
                loading ?
                    <Loader /> :
                    error ?
                        <Error className='py-5' text={error} /> :
                        shopData.map((v, i) => {
                            return (
                                <div className="col-3 medicineLS" key={v.id}>
                                <NavLink to={'/shopdetails/' + v.id} target="_blank">
                                    <CustomCard
                                        btnText='Add to Cart'
                                        cardData={v}
                                        onclick={handleCart}
                                        addToFavourite={addToFavourite}
                                        removeToFavourite={removeToFavourite}
                                        favItmes={favItmes ? favItmes.some((item) => item.fid === v.id) : null}
                                        favouriteTrue={true}
                                    />
                                </NavLink>
                                </div>
                            )
                        })
            }
        </>
    );
}

export default ShopList;