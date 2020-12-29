import axios from "axios";
import {CharactersDataType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/'
});

export const charactersAPI = {
    async getCharacters(currentPage = 1) {
        let response = await instance.get<CharactersDataType>(`character/?page=${currentPage}`);
        return response.data
    },
}




