import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrder } from '../../../user/redux/slice/OrderSlice';
import { NavLink } from 'react-router-dom';

function Order(props) {
    const dispatch = useDispatch();
    const order = useSelector((state) => state.order.order);
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    useEffect(() => {
        dispatch(getOrder());
    }, [dispatch])

    const handleViewPage = (orderItem) => {
        setSelectedOrder(orderItem);
    }
 
    return (
        <div>
            <section id="page-header">
                <h2>#orderfromhome</h2>
                <p>Your Order</p>
            </section>
            <section id="product1" className="section-p1">
                <div className="row py-5 g-4">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Index</th>
                                                <th scope="col">ProductID</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {order.map((orderItem, orderIndex) => {
                                                return orderItem.items.map((item, itemIndex) => {
                                                    return (
                                                        <tr key={`${orderIndex}-${itemIndex}`}>
                                                            <th scope="row">{orderIndex + 1}</th>

                                                            <td>{item.productID}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>₹ {orderItem.TotalAmount}</td>
                                                            <td>
                                                                <NavLink to={'/admin/order/orderdetails/' + orderItem.id}>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => handleViewPage(orderItem)}
                                                                >
                                                                    View
                                                                </button>
                                                                </NavLink>
                                                            </td>
                                                        </tr>
                                                    );
                                                });
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Order;