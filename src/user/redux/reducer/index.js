import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import AlertSlice from "../slice/Alert.slice";
import clothcatSlice from "../slice/clothcat.slice";
import ClothsubSlice from "../slice/Clothsub.slice";
import { cartReducer } from "./cart.reducer";
import { favouriteReducer } from "./favourite.reducer";
import ClothCategoryReducer from "../slice/ClothCategorySlice";
import OrderSlice from "../slice/OrderSlice";
import userInfoSlice from "../slice/UserInfoSlice";

export const rootReducer = combineReducers({
    auth: authReducer,
    alert: AlertSlice,
    clothcat: clothcatSlice,
    clothsubcat: ClothsubSlice,
    cart: cartReducer,
    favourites: favouriteReducer,
    clothcategory: ClothCategoryReducer,
    order: OrderSlice,
    userInfo: userInfoSlice
})  