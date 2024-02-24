import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../redux/action/auth.action';
import Badge from '@mui/material/Badge';
import CartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getClothSubCat } from '../../redux/slice/Clothsub.slice';
import { getClothCat } from '../../redux/slice/clothcat.slice';
import './header.css';

function Header(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clothsubcat = useSelector(state => state.clothsubcat);
    const clothcat = useSelector(state => state.clothcat);
    const auth = useSelector(state => state.auth)

    React.useEffect(() => {
        dispatch(getClothSubCat())
        dispatch(getClothCat())
    }, [])

    const handleLogout = () => {
        dispatch(logoutRequest())
        navigate('/auth');
    };

    const cartState = useSelector(state => state.cart);
    let addedCartData = 0;
    if (cartState.items) {
        addedCartData = cartState.items.reduce((acc, val) => acc + val.quantity, 0);
    }

    return (

        <header className="header">
            <div className="full-layer-outer-header">
                <div className="container122 clearfix">
                    <nav>
                        <ul className="primary-nav g-nav">
                            <li>
                                <a href="tel:+111444989">
                                    <i className="fas fa-phone u-c-brand u-s-m-r-9" />
                                    &nbsp; Telephone:+111-444-989
                                </a>
                            </li>
                            <li>
                                <a href="mailto:italianstitch77@gmail.com">
                                    <i className="fas fa-envelope u-c-brand u-s-m-r-9" />
                                    &nbsp; E-mail: italianstitch77@gmail.com

                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <ul className="secondary-nav g-nav">
                            <li>
                                <a>
                                    My Account &nbsp;
                                    <i className="fas fa-chevron-down u-s-m-l-9" />
                                </a>
                                <ul className="g-dropdown" style={{ width: 200 }}>
                                    <li>
                                        <NavLink to={"/Cart"}>
                                            <i className="fas fa-cog u-s-m-r-9" />
                                            &nbsp; My Cart
                                        </NavLink>

                                        {/* <NavLink className="fas fa-cog u-s-m-r-9" to={"/Cart"}>My Cart</NavLink> */}
                                    </li>
                                    <li>
                                        <NavLink to={"/wishlist"}>
                                            <i className="far fa-heart u-s-m-r-9" />
                                            &nbsp; My Wishlist
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/checkout"}>
                                            <i className="far fa-check-circle u-s-m-r-9" />
                                            &nbsp; Checkout
                                        </NavLink>
                                    </li>

                                    {auth.auth

                                        ? <li>
                                            <NavLink to={"/"} onClick={handleLogout}>
                                                <i className="fas fa-sign-in-alt u-s-m-r-9" />
                                                &nbsp;  Logout
                                            </NavLink>
                                        </li>
                                        : <li>
                                            <NavLink to={"/auth"}>
                                                <i className="fas fa-sign-in-alt u-s-m-r-9" />
                                                &nbsp;  Login/Signup
                                            </NavLink>
                                        </li>}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="container1">
                <div className="row v-center">
                    <div className="header-item item-left">
                        <div className="logo">
                            {/* <img src="../assets/img/shopify_logo.png" alt="" /> */}
                        </div>
                    </div>

                    <div className="header-item item-center">
                        <div className="menu-overlay" />
                        <nav className="menu">
                            <div className="mobile-menu-head">
                                <div className="go-back"><i className="fa fa-angle-left" /></div>
                                <div className="current-menu-title" />
                                <div className="mobile-menu-close">×</div>
                            </div>
                            <ul className="menu-main">
                                <li>
                                    <NavLink to={"/"}>Home</NavLink>
                                </li>
                                <li className="menu-item-has-children">
                                    <NavLink to={"/shop"}>Shop  <i className="fa fa-angle-down" /></NavLink>
                                    <div className="sub-menu mega-menu mega-menu-column-4">
                                        {
                                            clothcat.clothcat.map((value) => {
                                                return (
                                                    <div className="list-item" key={value.id}>
                                                        <NavLink to={"/product/" + value.category_name + '/' + value.id}><h4 className="title">{value.category_name}</h4></NavLink>
                                                        <ul>
                                                            {
                                                                clothsubcat.clothsubcat.map((subCategory) => {
                                                                    if (value.id === subCategory.category_id) {
                                                                        return (
                                                                            <li key={subCategory.id}><Link to={'/shop/' + subCategory.id}>{subCategory.sub_name}</Link></li>
                                                                        )
                                                                    } else {
                                                                        return null
                                                                    }
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </li>
                                <li className="menu-item-has-children">
                                    <NavLink to={"/blog"}>Blog</NavLink>
                                </li>
                                <li className="menu-item-has-children">
                                    <NavLink to={"/about"}>About</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/contact"}>Contact</NavLink>
                                </li>
                            </ul>


                        </nav>

                    </div>

                    {/* <div className='header-item'>
                        <form>
                            <div className='searchbar-view'>
                                <button type="submit" className='rilrtl-button' aria-label="search"></button>
                                <div className='react-autosuggest__container react-autosuggest__container--open'>
                                    <input autoComplete='off' aria-label='Search Italian Search' className='react-autosuggest__input react-autosuggest__input--open' placeholder='Search Italian Search' />
                                </div>

                            </div>
                        </form>
                    </div> */}

                    <div className="header-item item-right">
                        {/* <form> */}
                            <div className='searchbar-view'>
                                {/* <button type="submit" className='rilrtl-button' aria-label="search"></button> */}
                                <div className='react-autosuggest__container react-autosuggest__container--open'>
                                    <input autoComplete='off' aria-label='Search Italian Stitch' className='react-autosuggest__input react-autosuggest__input--open' placeholder='Search Italian Stitch' />
                                </div>

                            </div>
                        {/* </form> */}
                        <Link to='/cart'>
                            <Badge className='ms-3' id="cartCSS" badgeContent={addedCartData} color="success">
                                <CartIcon />
                            </Badge>
                        </Link>
                        <Link to='/favourite'>
                            <Badge className='ms-3' id="cartCSS" badgeContent={0} color="success">
                                <FavoriteBorderIcon />
                            </Badge>
                        </Link>

                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;