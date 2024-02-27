import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../redux/action/cart.action';
import { setAlert } from '../../redux/slice/Alert.slice';
import { getProduct } from '../../redux/slice/Product.slice';

function ShopDetail(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state => state.product))

    React.useEffect(() => {
        dispatch(getProduct())
    }, [id]);

    const handleCart = (id) => {
        let addedCartItem = product.product.find((val) => val.id === id)
        dispatch(setAlert({ text: addedCartItem.name + ' cloth is successfully added in cart', color: 'success' }))
        dispatch(addToCart(id));
    }

    return (
        <div>
            {product.product.map((item, index) => {
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
                                    <div className='prod-sp1'>₹ {item.price}</div>
                                    <div className='prod-price-sec'>
                                        <span className="prod-mrp">MRP</span>
                                        <span className="prod-cp">₹ {item.mrp}</span>
                                        <span className="prod-discnt">&nbsp; ({Math.round((item.mrp - item.price) * 100 / item.mrp)}% off)</span>

                                    </div>
                                    <div className='section-4-sku-information u-s-p-y-14'>
                                        <h6 className='information-heading u-s-m-b-8' style={{ marginBottom: '0px', marginTop: '15px' }}>SKU Information:</h6>
                                        <div className='availability'>
                                            {
                                                item.sizesAndStocks.some(sizeOption => sizeOption.stock > 0) ? <span>In Stock</span> : <span>Out of Stock</span>
                                            }

                                        </div>
                                    </div>
                                </div>
                                {/* <div className='prod-gst'>Price inclusive of all taxes</div> */}




                                {/* <div className='pdp-promotion'>
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
                                </div> */}

                                <div className='size-variant-block'>
                                    <div className='size-selection' aria-label='Available Size'>Available Size</div>
                                    <div className='size-swatch'>
                                        <select className="select-box product-size">
                                            {
                                                item.sizesAndStocks.map((size, index) => (
                                                    // console.log(size.size)
                                                    <option key={index} value={size}>{size.size}</option>
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
                                    <div className='pdp-prod-tips' aria-label="HANDPICKED STYLES | ASSURED QUALITY ">&nbsp; HANDPICKED STYLES | ASSURED QUALITY </div>
                                </div>

                                <div>
                                    <div className='pdp-addtocart-button1' tabIndex={-1}>
                                        <div className='btn-gold-gray' id="goldenBtn" role='button' tabIndex={0} onClick={() => handleCart(id)}>
                                            <span className="pdp-wishlist-desktop-icon" style={{ fontSize: '19px ' }}><i class="fa-sharp fa-regular fa-heart"></i>  </span>
                                            <span aria-label='SAVE TO WISHLIST'>   SAVE TO WISHLIST</span>
                                        </div>
                                    </div>
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