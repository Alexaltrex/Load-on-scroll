import styled from "styled-components";
import {headerHeight} from "../helpers/const";
import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getCharactersSelector,
    getCurrentPage,
    getIsLoading,
    getTotalPagesCount
} from "../store/selectors/characters-selectors";
import {charactersAC, getCharacters} from "../store/reducers/characters-reducer";
import CircularPreloader from "./CircularPreloader";
import Item from "./Item";
import throttle from "lodash/throttle";


//=============== STYLED =================
const Div = styled.div`
    height: calc(100vh - ${headerHeight}px);    
    flex-grow: 1;
    overflow: auto;    
`;

//=============== CUSTOM HOOK ==============
const useList = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(getCurrentPage);
    const characters = useSelector(getCharactersSelector);
    const totalPagesCount = useSelector(getTotalPagesCount);
    const isLoading = useSelector(getIsLoading);

    useEffect(() => {
        dispatch(getCharacters(currentPage))
    }, [currentPage, dispatch]);

    const charactersElements = characters.map(
        el => <Item key={el.id} character={el}/>
    );

    const onScrollHandler = () => {
        if (ref && ref.current) {
            const scrollTop = ref.current.scrollTop;
            const scrollHeight = ref.current.scrollHeight;
            const clientHeight = ref.current.clientHeight;
            const delta = scrollHeight - scrollTop - clientHeight;
            const isEnd = delta <= 50;

            if (isEnd && !isLoading && currentPage < totalPagesCount) {
                dispatch(charactersAC.setCurrentPage(currentPage + 1))
            }

        }
    };

    const onScrollHandlerThrottle = throttle(onScrollHandler, 1000);

    const ref = useRef<HTMLDivElement>(null);

    return {
        charactersElements, onScrollHandlerThrottle, ref, isLoading
    }

};

//=============== COMPONENT ================
const List: React.FC<{}> = () => {
    const {
        charactersElements, onScrollHandlerThrottle, ref, isLoading
    } = useList();
    //usePreloader();


    return (
        <Div onScroll={onScrollHandlerThrottle}
             ref={ref}
        >
            {charactersElements}
            {isLoading && <CircularPreloader styleType='absolute'/>}
        </Div>
    )
}
export default List