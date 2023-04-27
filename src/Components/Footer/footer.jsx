import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import { useRef } from "react";
import { useSelector } from "react-redux";
import{
    Para,
    TermsAndConditions,
    TermsAndConditionsText,
    Flex,
    DivTnC,
    DivNoE,
    Button,
    ButtonTnC,
    UL,
    Li,
    FooterA,
    ButtonCloseTnC,
    DivCloseButton,
    BottomDiv,
    ParaNoOfEmployee,
} from "./footer.style";

const Footer = () => {
    const [modalval, setmodalval] = useState(false);
    const showTnC = () => {
        modalval ? setmodalval(false) : setmodalval(true);
    };

    const employeeLength = useSelector((state) => state.employeeLength);


    // let loginRef = useRef();
    // var navigateToAboutUs = useNavigate();
    // const goAboutUs = (e)=>{
    //     // navigateToAboutUs('/login')
    //     e.preventDefault();
    // }
    return (
        <>
            <div>
                <Flex className="row">
                    <div className="col-md-3">
                        <UL>
                            {/* <Li>
                                <Button as="a" href="/login" onClick={goAboutUs}>
                                    Login
                                </Button>
                            </Li> */}
                            {/* <Li>
                            <Link to={location => ({ ...location, pathname: "/login" })} >Login</Link>

                            </Li> */}

                            <Li>
                                <FooterA>
                                    <Link to="/login">Login</Link>
                                </FooterA>
                            </Li>

                            <Li>
                                <FooterA>
                                    <Link to="/aboutus">About Us</Link>
                                </FooterA>
                            </Li>

                            <Li>
                                <FooterA>
                                    <Link
                                        to="/careers"
                                        style={{ textDecoration: "none" }}
                                    >
                                        Careers
                                    </Link>
                                </FooterA>
                            </Li>
                            {/* <Li>
                                <button  onClick={goAboutUs}>
                                    Login
                                </button>
                            </Li> */}
                            {/* <Li>
                                <Button as="a" href="/aboutus">
                                    About Us
                                </Button>
                            </Li> */}
                            {/* <Li>
                                <Button as="a" href="/careers">
                                    Careers
                                </Button>
                            </Li> */}
                        </UL>
                    </div>

                    <div className="col-md-9">
                            <div className="">
                        <BottomDiv>
                                <div className="">
                                    <DivTnC>
                                        <ButtonTnC onClick={showTnC}>
                                            Terms & Conditions
                                        </ButtonTnC>
                                        <Para>
                                            &copy; 2023 GlobalLogic Inc. All
                                            rights reserved
                                        </Para>
                                    </DivTnC>
                                </div>

                                <div className="">
                                    <DivNoE>Number of Employees:                                     
                                    <ParaNoOfEmployee>
                                        "{employeeLength}"
                                    </ParaNoOfEmployee>
                                    </DivNoE>
                                </div>
                        </BottomDiv>
                            </div>
                    </div>
                </Flex>
            </div>

            {modalval && (
                <div className="position-absolute top-50 start-50 translate-middle col-sm-5 footer-home">
                    <TermsAndConditions className="row">
                        <div className="card">
                            <DivCloseButton>
                                <CloseButton
                                    className="mt-3"
                                    onClick={showTnC}
                                />
                            </DivCloseButton>
                            <TermsAndConditionsText className="card-body p-2 ">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Voluptatibus mollitia, quidem
                                quae assumenda dolore omnis excepturi dicta?
                                Fugit voluptatem voluptate vero nemo. Suscipit
                                veritatis eos est, maiores, aliquam labore sequi
                                architecto quis adipisci esse itaque facilis
                                illum similique, ea expedita. Aliquam, maiores
                                molestias aperiam nesciunt laboriosam a qui,
                                quos dignissimos dolorum iusto quo saepe?
                                Molestiae odit itaque voluptates sed et
                                assumenda at voluptatibus, unde minus rem? Quae
                                quas temporibus rem non nesciunt quo
                                repellendus, nostrum laboriosam odit beatae
                                ipsum deserunt, consequatur quam nemo error
                                alias sint inventore iusto culpa voluptate eum
                                sunt eius. Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Saepe quasi eum
                                at? Magnam eius officiis a, molestias ducimus
                                repudiandae, dolore, odit perferendis voluptatum
                                fuga error pariatur at vel. Ad dolore,
                                voluptatibus similique id tempora dolores
                                blanditiis unde consequuntur inventore
                                consectetur animi voluptatum maiores dolorum
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Suscipit, magnam ratione.
                                Ducimus maxime nisi, minima doloremque cumque
                                quasi nostrum pariatur perspiciatis ipsa
                                voluptatum voluptas ullam repellendus tenetur!
                                Libero cumque nobis quis odio aut eveniet,
                                impedit eos dolor, ipsa alias laudantium beatae
                                voluptatem quae aliquid ipsum illo a cupiditate
                                assumenda? Alias!\ Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Suscipit, magnam
                                ratione. Ducimus maxime nisi, minima doloremque
                                cumque quasi nostrum pariatur perspiciatis ipsa
                                voluptatum voluptas ullam repellendus tenetur!
                                Libero cumque nobis quis odio aut eveniet,
                                impedit eos dolor, ipsa alias laudantium beatae
                                voluptatem quae aliquid ipsum illo a cupiditate
                                assumenda? Alias! Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Suscipit, magnam
                                ratione. Ducimus maxime nisi, minima doloremque
                                cumque quasi nostrum pariatur perspiciatis ipsa
                                voluptatum voluptas ullam repellendus tenetur!
                                Libero cumque nobis quis odio aut eveniet,
                                impedit eos dolor, ipsa alias laudantium beatae
                                voluptatem quae aliquid ipsum illo a cupiditate
                                assumenda? Alias!
                            </TermsAndConditionsText>
                            <div className="mt-5">
                                <ButtonCloseTnC
                                    onClick={showTnC}
                                    className="position-absolute bottom-0 start-50 translate-middle mt-5 me-5"
                                >
                                    OK
                                </ButtonCloseTnC>
                            </div>
                        </div>
                    </TermsAndConditions>
                </div>
            )}
        </>
    );
};

export default Footer;
