import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../../Navbar/navbar'
import Footer from '../../../Footer/footer'
import {
    DashboardTiles,
    TileItem,
    DashboardMainDiv
} from './feedback-home.style'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const FeedbackHome = () => {
    const {id} = useParams();
    const [currUser, setCurrUser] = useState({});

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await axios.get(`http://localhost:3003/users/${id}`)
            .then((res) => {
                setCurrUser(res.data)
            })
    }

    const { user_type } = currUser;
    var tilesRow1 = [
        {
            label: "Feedback",
            link: (user_type === 'HR Admin') ? 
                `/dashboard/feedback-chart/${id}` : 
                `/dashboard/feedback-form/${id}`

        },
        {
            label: "Company Survey",
            link: (user_type === 'HR Admin') ?  
                `/dashboard/company-survey-chart/${id}` : 
                `/dashboard/company-survey/${id}`
        },
        {
            label: "Technology Survey",
            link: (user_type === 'HR Admin') ?  
                `/dashboard/tech-survey-chart/${id}` :
                `/dashboard/tech-survey/${id}`
        }
    ];
    
    return (
        <>
            <Navbar />
            <DashboardMainDiv>
                <div className="col">
                    <DashboardTiles className="pt-3 ps-4 pb-3 pe-4 row">
                        {tilesRow1.map((props) => (
                            <Link
                                style={{ maxWidth: '10vw' }}
                                to={props.link} >
                                <TileItem className="dashboard-item1 col-lg-3 mb-2">
                                    {props.label}
                                </TileItem>
                            </Link>
                        ))}
                    </DashboardTiles>
                </div>
            </DashboardMainDiv>
            <Footer />
        </>
    )
}

export default FeedbackHome