import styled from "styled-components";
import {headerHeight} from "../helpers/const";
import React from "react";
import {useSelector} from "react-redux";
import {getCurrentPage, getTotalPagesCount} from "../store/selectors/characters-selectors";

const HeaderDiv = styled.div`
    flex-basis: ${headerHeight}px;
    flex-shrink: 0;
    background-color: #444;
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: white;
`;
const Logo = styled.h1`
  color: white;
  margin-right: 20px;
`;

//============== CUSTOM HOOK ================
const useHeader = () => {
    const totalPagesCount = useSelector(getTotalPagesCount);
    const currentPage = useSelector(getCurrentPage);
    return {
        totalPagesCount, currentPage
    }
};

//============== COMPONENT ==================
const Header: React.FC<{}> = () => {
    const {
        totalPagesCount, currentPage
    } = useHeader();

    return (
        <HeaderDiv>
            <Logo>
                Load-on-scroll
            </Logo>
            <div>
                <div>Total Pages Count: {totalPagesCount}</div>
                <div>Current Page: {currentPage}</div>
            </div>

        </HeaderDiv>
    )
};
export default Header;