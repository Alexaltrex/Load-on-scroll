import {ThunkAction} from "redux-thunk";
import {GetActionsType, StateType} from "../store";
import {charactersAPI} from "../../axios/api";
import {CharactersDataType, CharacterType} from "../../types/types";

const initialState = {
    isLoading: false,
    characters: [] as Array<CharacterType>, // массив данных characters
    totalPagesCount: 0, // общее число страниц
    currentPage: 1, // текущая страница
    itemsInPage: 0, // число элементов на странице (<=20)
    countOfLoadedImages: 0, // число загруженных изображений из одной страницы 0...itemsInPage

};

export type InitialStateType = typeof initialState;

const charactersReducer = (state = initialState, action: CharactersActionsType): InitialStateType => {
    switch (action.type) {
        case 'CHARACTERS/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'CHARACTERS/SET_CHARACTERS': {
            return {
                ...state,
                characters: [...state.characters, ...action.charactersData.results],
                totalPagesCount: action.charactersData.info.pages,
            }
        }
        case 'CHARACTERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'CHARACTERS/ADD_COUNT_OF_LOADED_IMAGES': {
            const itemsInPage = state.itemsInPage;
            return {
                ...state,
                countOfLoadedImages: state.countOfLoadedImages === itemsInPage - 1 ? 0 : state.countOfLoadedImages + 1,
                isLoading: state.countOfLoadedImages === itemsInPage - 1 ? false : state.isLoading
            }
        }
        case 'CHARACTERS/SET_ITEMS_IN_PAGE': {
            return {...state, itemsInPage: action.itemsInPage}
        }
        default:
            return state;
    }
};

export const charactersAC = {
    setCharacters: (charactersData: CharactersDataType) => ({
        type: 'CHARACTERS/SET_CHARACTERS',
        charactersData
    } as const),
    setCurrentPage: (currentPage: number) => ({type: 'CHARACTERS/SET_CURRENT_PAGE', currentPage} as const),
    addCountOfLoadedImages: () => ({type: 'CHARACTERS/ADD_COUNT_OF_LOADED_IMAGES'} as const),
    toggleLoading: (isLoading: boolean) => ({type: 'CHARACTERS/TOGGLE_LOADING', isLoading} as const),
    setItemsInPage: (itemsInPage: number) => ({type: 'CHARACTERS/SET_ITEMS_IN_PAGE', itemsInPage} as const)
};

type CharactersActionsType = GetActionsType<typeof charactersAC>
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, CharactersActionsType>

export const getCharacters = (currentPage: number): ThunkType => async (dispatch) => {
    try {
        dispatch(charactersAC.toggleLoading(true));
        let data = await charactersAPI.getCharacters(currentPage);
        dispatch(charactersAC.setCharacters(data));
        dispatch(charactersAC.setItemsInPage(data.results.length));
    } catch (e) {
        console.log(e)
    } finally {
        //dispatch(appAC.toggleLoading(false));
    }
};

export default charactersReducer;