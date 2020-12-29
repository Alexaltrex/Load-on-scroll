import {StateType} from "../store";

export const getIsLoading = (state: StateType) => state.characters.isLoading;
export const getCharactersSelector = (state: StateType) => state.characters.characters;
export const getCurrentPage = (state: StateType) => state.characters.currentPage;
export const getTotalPagesCount = (state: StateType) => state.characters.totalPagesCount;
