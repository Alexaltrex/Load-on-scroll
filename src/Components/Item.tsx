import {CharacterType} from "../types/types";
import styled from "styled-components";
import React, {useState} from "react";
import {CircularProgress} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {charactersAC} from "../store/reducers/characters-reducer";

//=============== STYLED ==================
const ItemDiv = styled.div`
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    &:nth-child(2n+1) {
    background-color: #eee;
    }
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
`;

const PreloaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
`


const Image = styled.img`
    height: 45px;
    border-radius: 5px;    
`;
const P = styled.p`
  color: darkblue;
  font-weight: bold;
  margin-left: 10px;
`;

//=============== CUSTOM HOOK ==============
const useItem = () => {
    const [localIsLoading, setLocalIsLoading] = useState(true);
    const dispatch = useDispatch();

    const onLoadHandler = () => {
       dispatch(charactersAC.addCountOfLoadedImages());
       setLocalIsLoading(false)
    };
    return {
        onLoadHandler,
        localIsLoading
    }
};


//============== COMPONENT =====================
const Item: React.FC<PropsType> = ({character}) => {
    const {
        onLoadHandler,
        localIsLoading
    } = useItem();
    return (
        <ItemDiv>
            <ImageWrapper>
                <Image src={character.image}
                       onLoad={onLoadHandler}
                />
                {
                    localIsLoading &&
                    <PreloaderWrapper>
                        <CircularProgress size={45}
                                          color={'secondary'}
                        />
                    </PreloaderWrapper>

                }

            </ImageWrapper>


            <P>{character.name}</P>

        </ItemDiv>
    )
};
export default Item;

//============== TYPE ================
type PropsType = {
    character: CharacterType
}