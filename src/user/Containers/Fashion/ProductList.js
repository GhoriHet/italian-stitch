import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

function ProductList(props) {

    const [finalcategory, setFinalcategory] = useState([]);
    const { category_name, id } = useParams();
    const product = useSelector(state => state.product);

    useEffect(() => {
        const data = product.product.filter((v) => v.category_id == id || v.sub_id == id);
        setFinalcategory(data);
    }, [id, product.product]);

    return (
        <div>
            {
                finalcategory.map((item) => {
                    console.log(item);
                    return (
                        <NavLink to={'/product/' + item.category_name + item.id}>
                            <div class="product-card1">
                                <div class="badge">Sale</div>
                                <div class="product-tumb">
                                    <img src={item.prec} alt="" />
                                </div>
                                <div class="product-details">
                                    <span class="product-catagory">{item.name}</span>
                                    {/* <h4><a href="">{item.title}</a></h4> */}
                                    <p>{item.desc}</p>
                                    <div class="product-bottom-details">
                                        <div class="product-price">₹ {item.price}</div>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    )
                })
            }

        </div>
    );
}

export default ProductList;