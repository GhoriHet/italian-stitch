import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './shop.css'
import { NavLink } from 'react-router-dom';
import { getProduct } from '../../redux/slice/Product.slice';

function ShopParams(props) {
    const { id } = useParams();
    const product = useSelector((state => state.product.product))
    const dispatch = useDispatch();
    const [filteredData, setFilteredData] = React.useState([]);

    React.useEffect(() => {
        dispatch(getProduct());
        const filtered = product.filter(item => item.sub_id === id);
        setFilteredData(filtered);
    }, [id]);

    return (
        <div>
            {filteredData.map((item, index) => {
                return (
                    <NavLink to={'/shopdetails/' + item.id} target="_blank">
                        <div class="product-card1">
                            <div class="badge">Sale</div>
                            <div class="product-tumb">
                                <img src={item.prec} alt="" />
                            </div>
                            <div class="product-details">
                                <span class="product-catagory">{item.name}</span>
                                <h4><a href="">{item.title}</a></h4>
                                <p>{item.desc}</p>
                                <div class="product-bottom-details">
                                    <div class="product-price">₹ {item.price}</div>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    );
}

export default ShopParams;