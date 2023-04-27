import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../Footer/footer";
import glLogo from "../Utils/Images/GL-logo.jpg";
import corousel1 from '../Utils/Images/Corousel-1.jpg'
import corousel2 from '../Utils/Images/Corousel-2.jpg'
import corousel3 from '../Utils/Images/Corousel-3.jpg'
import InitialName from "../GK/InitialName";
import BackToTop from "./back-to-top";
import {
    DivMainNavbarHome,
    HomeNavLogo,
    DivHomeNavbarButtons,
    DivBrandName,
    DivHomeNavbarLogin,
    DivHomeNavbarRegister,
    ImgLogo,
    ButtonNavbarHome,
    DivMainHome,
    DivMainHomeCarousel,
    ImgCarousel,
    DivBodyHome,
    PHomeTaglineGL1,
    PHomeTaglineGL2,
    PHomeTagDescription,
    PHomeTaglineGL2Letters,
} from "./home.style";

const Home = () => {
    const isloggedin = useSelector((state) => state.isloggedin);

    const loggedOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <div>
            <DivMainNavbarHome className="row">
                <HomeNavLogo className="col-3">
                    <NavLink to="/">
                        <ImgLogo
                            src={glLogo}
                            alt="Image Not available"
                            style={{ width: "4rem" }}
                        />
                    </NavLink>
                </HomeNavLogo>
                <DivBrandName className="col-6">GLIP</DivBrandName>
                <DivHomeNavbarButtons className="col-3 row">
                    {isloggedin ? (
                        <>
                            <div className="col-md-4"></div>
                            <div className="col-md-4"></div>

                            <DivHomeNavbarLogin className="col-md-4">
                                <ButtonNavbarHome
                                    style={{ backgroundColor: "red" }}
                                    onClick={loggedOut}>
                                    Logout
                                </ButtonNavbarHome>
                            </DivHomeNavbarLogin>
                        </>


                    ) : (
                        <>
                            <div className="col-md-4"></div>

                            <DivHomeNavbarLogin className="col-md-4">
                                <NavLink to="/login">
                                    <ButtonNavbarHome>Login</ButtonNavbarHome>
                                </NavLink>
                            </DivHomeNavbarLogin>

                            <DivHomeNavbarRegister className="col-md-4">
                                <NavLink to="/register">
                                    <ButtonNavbarHome>
                                        Register
                                    </ButtonNavbarHome>
                                </NavLink>
                            </DivHomeNavbarRegister>

                            {/* <DivHomeNavbarRegister className="col-md-4">
                                <NavLink to="/deactivate">
                                    <ButtonNavbarHome>
                                        Deactivate
                                    </ButtonNavbarHome>
                                </NavLink>
                            </DivHomeNavbarRegister> */}
                        </>
                    )}
                </DivHomeNavbarButtons>
            </DivMainNavbarHome>

            <DivMainHome>
                <DivMainHomeCarousel>
                    <div
                        id="carouselExampleCaptions"
                        class="carousel slide"
                        data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="0"
                                class="active"
                                aria-current="true"
                                aria-label="Slide 1"></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                            <button
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div
                                class="carousel-item active"
                                data-bs-interval="5000">
                                <ImgCarousel
                                    src={corousel1}
                                    class="d-block w-100"
                                    alt="Image not Available"
                                />
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <ImgCarousel
                                    src={corousel2}
                                    class="d-block w-100"
                                    alt="Image not Available"
                                />
                            </div>
                            <div class="carousel-item" data-bs-interval="5000">
                                <ImgCarousel
                                    src={corousel3}
                                    class="d-block w-100"
                                    alt="Image not Available"
                                />
                            </div>
                        </div>
                        {/* <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev">
                        <span
                            class="carousel-control-prev-icon"
                            aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next">
                        <span
                            class="carousel-control-next-icon"
                            aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button> */}
                    </div>
                </DivMainHomeCarousel>
                <DivBodyHome>
                    <PHomeTaglineGL1>

                        We are &nbsp;
                    </PHomeTaglineGL1>
                    <PHomeTaglineGL2>
                        <PHomeTaglineGL2Letters>G</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>l</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>o</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>b</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>a</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>l</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>L</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>o</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>g</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>i</PHomeTaglineGL2Letters>
                        <PHomeTaglineGL2Letters>c</PHomeTaglineGL2Letters>
                    </PHomeTaglineGL2>
                    <PHomeTagDescription>
                        For over 20 years, GlobalLogic has partnered with
                        businesses across every major industry to make amazing
                        products and connect the dots between people, products,
                        and business opportunities. In 2021, GlobalLogic was
                        acquired by Hitachi Ltd. GlobalLogic’s capabilities,
                        combined with Hitachi’s Lumada, enables us to deploy
                        Hitachi’s extensive library of digital solutions to the
                        global market and to help customers and societies solve
                        their issues through Agile application development in
                        the cloud.
                    </PHomeTagDescription>
                </DivBodyHome>
            </DivMainHome>
            <InitialName />
            <Footer />
            <BackToTop />
        </div>
    );
};

export default Home;
