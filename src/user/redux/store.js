import { applyMiddleware, createStore } from "redux"
import { rootReducer } from "./reducer"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from "redux-thunk"
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./saga/rootSaga"

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth', 'cart', 'favourites']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const allMiddleware = [thunk, sagaMiddleware]

export const configureStore = () => {
    const store = createStore(persistedReducer, applyMiddleware(...allMiddleware));

    sagaMiddleware.run(rootSaga)
    return store;
};

export let store = configureStore()
export let persistor = persistStore(store)