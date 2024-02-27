import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import AlertSlice from "../slice/Alert.slice";
import subcategorySlice from "../slice/Subcategory.slice";
import { cartReducer } from "./cart.reducer";
import { favouriteReducer } from "./favourite.reducer";
import OrderSlice from "../slice/OrderSlice";
import userInfoSlice from "../slice/UserInfoSlice";
import categorySlice from "../slice/category.slice";
import productSlice from "../slice/Product.slice";

export const rootReducer = combineReducers({
    auth: authReducer,
    alert: AlertSlice,
    category: categorySlice,
    subcategory: subcategorySlice,
    product: productSlice,
    cart: cartReducer,
    favourites: favouriteReducer,
    order: OrderSlice,
    userInfo: userInfoSlice
})  