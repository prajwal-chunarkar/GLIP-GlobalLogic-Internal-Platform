import styled from "styled-components";

export const FormLabel = styled.label`
  /* padding: 15px; */
  display: block;
  padding: 1%;
  /* margin-top: 2%; */
  color: #333;
  font-weight: 600;
`;

export const FormBackground = styled.div`
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
`;
export const FormLogo = styled.img`
  width: 8rem;
  height: 8rem;
  margin-top: 2rem;
  margin-left: 2rem;
  border-radius: 2rem;

  :hover {
    /* width: 9rem;
        height: 9rem; */
    box-shadow: rgba(0, 0, 0, 0.8) 0px 5px 15px;
  }
`;
export const FormHeading = styled.p`
  margin-bottom: 1.3rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bolder;
  color: #f37037;
`;
export const APEContainer = styled.div`
  background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
  /* position: fixed; */
  width: 65vw;
  max-height: 80vh;
  border: 1px solid rgb(227, 224, 229);
  margin-top: 10vh;
  margin: auto;
  padding: 0.8rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: auto;

  &::-webkit-scrollbar {
    /* visibility: hidden; */
    background: transparent;
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(109, 110, 113, 0.7);
    border-radius: 5px;
  }
`;

export const FormInput = styled.select`
  background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
  border: none;
  border-bottom: 2px solid #6d6e71;
  height: 3rem;
  padding-left: 0.4rem;
  width: 94%;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  width: 90%;
  /* background: transparent; */

  &:focus {
    outline: none;
  }
`;
export const ButtonColab = styled.button`
  background-color: #f37037;
  border: 1px solid #f37037;
  border-radius: 10px;
  box-shadow: 0 0 10px #f37037;
  color: #fff;
  height: 2rem;
  min-width: 5rem;
  font-size: large;

  &:hover {
    background-color: #efa586;
    background-image: url("https://www.transparenttextures.com/patterns/cubes.png");
    box-shadow: rgb(53, 3, 99);
  }
`;
export const FlexDiv = styled.div`
  width: 30vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 1.5rem;
`;
export const FormInputt = styled.textarea`
  background-image: url("https://www.transparenttextures.com/patterns/brushed-alum.png");
  border: none;
  border-bottom: 2px solid #6d6e71;
  margin-bottom: 0.1rem;
  height: 5rem;
  padding-left: 0.4rem;
  width: 94%;
  border-radius: 5px;
  /* margin-bottom: 1.5rem; */
  width: 90%;
  /* background: transparent; */

  &:focus {
    outline: none;
  }
`;
export const FormAstric = styled.span`
  color: red;
`;
