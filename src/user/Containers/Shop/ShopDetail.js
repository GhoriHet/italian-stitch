import React from 'react';
import { getClothCategory } from '../../redux/slice/ClothCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../redux/action/cart.action';
import { setAlert } from '../../redux/slice/Alert.slice';

function ShopDetail(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const clothcategory = useSelector((state => state.clothcategory))

    React.useEffect(() => {
        dispatch(getClothCategory())
    }, [id]);

    const handleCart = (id) => {
        let addedCartItem = clothcategory.clothcategory.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.name + ' cloth is successfully added in cart', color: 'success' }))
        dispatch(addToCart(id));
    }

    return (
        <div>
            {clothcategory.clothcategory.map((item, index) => {
                if (item.id === id) {
                    return (
                        <section id='prodetails' className='section-p1'>
                            <div className='single-pro-image'>
                                <img src={item.prec} alt="" />
                            </div>

                            <div className='single-pro-details'>
                                <h2 className='brand-name'>{item.name}</h2>
                                <h1 className='prod-name'>{item.desc}</h1>

                                <div className='prod-price-section'>
                                    <h2 className='prod-sp1'>₹ {item.price}</h2>
                                    <div className='prod-gst'>Price inclusive of all taxes</div>
                                </div>

                                <div className='pdp-promotion'>
                                    <div className='pdp-promo-block'>
                                        <div className="ic-offer-tag">
                                        </div>
                                        <div className="promo-blck">
                                            <div className="promo-title-blck">
                                                <div className="promo-title" aria-label="Use Code <br>TRENDS">
                                                    Use Code <br></br> TRENDS
                                                </div>
                                                <div className='promo-tnc-blck'>
                                                    <span className='promo-tnc'>
                                                        <a href='#' title='T&C' aria-label='T&C'>T&C</a>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='promo-desc-block'>
                                                <div className='promo-discounted-price'>
                                                    <div aria-label='Get it for'>
                                                        Get it for
                                                        <span>  ₹ 840</span>
                                                    </div>
                                                </div>
                                                <div className='promo-desc'>
                                                    Get upto Extra 40% Off on 1499 and Above. Max Discount Rs. 800.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='size-variant-block'>
                                    <div className='size-selection' aria-label='Available Size'>Available Size</div>
                                    <div className='size-swatch'>
                                        {/* <div className='circle size-variant-item size-instock' tabIndex={0}>{item.size}</div> */}
                                        <select className="select-box product-size">
                                            {
                                                item.size.map((size, index) => (
                                                    <option key={index} value={size}>{size}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <div className='pdp-addtocart-button' tabIndex={-1}>
                                        <div className='btn-gold' role='button' tabIndex={0} onClick={() => handleCart(id)}>
                                            <span className="ic-pdp-add-cart1"><i class="fa-solid fa-cart-shopping"></i>  </span>
                                            <span aria-label='ADD TO BAG'>   ADD TO BAG</span>
                                        </div>
                                    </div>
                                    <div className='pdp-prod-tips' aria-label="HANDPICKED STYLES | ASSURED QUALITY ">HANDPICKED STYLES | ASSURED QUALITY </div>
                                </div>

                            </div>

                        </section>
                    )
                }
            })}
        </div>
    );
}

export default ShopDetail;