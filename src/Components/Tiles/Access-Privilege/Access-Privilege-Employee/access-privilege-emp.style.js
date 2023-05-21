import styled from "styled-components";

export const FormInputArea = styled.textarea`
    background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
    border: none;
    border-bottom: 2px solid #6D6E71;
    margin-bottom: 0.1rem;
    height: 5rem;
    padding-left: 0.4rem;
    width: 97%;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    background: transparent;

    &:focus{
        outline: none;
    }
    &::-webkit-scrollbar {
    /* visibility: hidden; */
    background: transparent;
    width: 10px;
    };

    &::-webkit-scrollbar-thumb {
    background: rgba(109, 110, 113, 0.7);
    border-radius: 5px;
    }
`;