import {applyMiddleware, combineReducers, createStore, Middleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import charactersReducer from "./reducers/characters-reducer";

const rootReducer = combineReducers({
    characters: charactersReducer,
});

const middleware: Array<Middleware> = [thunkMiddleware];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;

//================ TYPE =======================
export type StateType = ReturnType<typeof rootReducer>
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type GetActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>;
