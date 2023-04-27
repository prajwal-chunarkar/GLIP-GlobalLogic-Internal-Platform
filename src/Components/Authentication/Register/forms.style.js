import styled from "styled-components";

export const FormContainer = styled.div`
    background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
    position: fixed;
    width: 35vw;
    max-height: 80vh;
    border: 1px solid rgb(227, 224, 229);
    margin-top: 10vh;
    margin-left: 60vw;
    padding: 0.8rem;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: auto;
    background-color: rgba(255, 255, 255, 0.7);

    &::-webkit-scrollbar {
    /* visibility: hidden; */
    background: transparent;
    width: 10px;
    };

    &::-webkit-scrollbar-thumb {
    background: rgba(109, 110, 113,0.4);
    border-radius: 5px;
    }
`;

export const FormHeading = styled.p`
    margin-bottom: 1.3rem;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
`;
export const FormLabel = styled.label`
    color: #333;
`;

export const FormAstric = styled.span`
    color: red;
`;

export const FormInput = styled.input`
    border: none;
    border-bottom: 2px solid rgb(188, 190, 192);
    margin-bottom: 0.1rem;
    height: 3rem;
    padding-left: 0.4rem;
    width: 94%;
    border-radius: 5px;
    margin-bottom: 1.5rem;

    &:focus{
        outline: none;
    }
`;

export const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
`;

export const SubmitButton = styled.button`
    background-color: #F37037;
    border: 1px solid #F37037;
    border-radius: 10px;
    box-shadow: 0 0 10px #F37037;
    color: #fff;

    &:hover{
    background-color: #efa586;
    background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
    box-shadow: rgb(53, 3, 99);
    }
`;

export const ErrorMessage = styled.span`
    color: rgb(95, 3, 3);
    background-color: rgba(246, 86, 86, 0.6);
    padding: 0.2rem 0.7rem;
    border-radius: 5px;
    width: 20vw;
`;

export const LinksDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -0.7rem ;
`;

export const FormLinks = styled.p`
    color: #333;

    &:hover {
    color: #F37037;
  }
`;




