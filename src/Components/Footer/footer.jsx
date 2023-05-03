import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import CloseButton from "react-bootstrap/CloseButton";

import {
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
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    // -------------------------------------------------------------- //
    const dispatch = useDispatch();
    const [totalReg, setTotalReg] = useState()

    useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        await axios.get(`http://localhost:3003/total-registrations`)
            .then((res) => {
                setTotalReg(res.data.total_registrations)
                dispatch({
                    type: "TOTAL_REGISTERED",
                    payload: res.data.total_registrations
                })
            })
    }
    return (
        <>
            <div>
                <Flex className="row">
                    <div className="col-md-3">
                        <UL>
                            <Li>
                                <Link to="/login" style={{ textDecoration: "none" }}><FooterA>Login</FooterA></Link>
                            </Li>

                            <Li>
                                <Link to="/aboutus" style={{ textDecoration: "none" }}><FooterA>About Us</FooterA></Link>
                            </Li>

                            <Li>
                                <Link to="/careers" style={{ textDecoration: "none" }}>
                                    <FooterA>Careers</FooterA>
                                </Link>
                            </Li>

                        </UL>
                    </div>

                    <div className="col-md-9">
                        <div>
                            <BottomDiv>
                                <div>
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

                                <div>
                                    <DivNoE>Total Registrations
                                        <ParaNoOfEmployee>
                                            {totalReg}
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
                    <TermsAndConditions>
                        <div>
                            <DivCloseButton>
                                <CloseButton
                                    onClick={showTnC}
                                />
                            </DivCloseButton>
                            <TermsAndConditionsText>
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
                        </div>
                    </TermsAndConditions>
                </div>
            )}
        </>
    );
};

export default Footer;
