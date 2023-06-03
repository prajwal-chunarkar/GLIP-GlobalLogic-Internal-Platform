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

    const [compSurStat, setCompSurStat] = useState(false);
    const [techSurStat, setTechSurStat] = useState(false);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        await axios.get(`http://localhost:3003/users/${id}`)
            .then((res) => {
                setCurrUser(res.data);

                axios.get(`http://localhost:3003/company-survey`)
                .then((res1)=> {
                    res1.data.forEach((obj)=> {
                        if(obj.empID === res.data.empID){
                            setCompSurStat(true);
                            return;
                        }
                    })
                })

                axios.get(`http://localhost:3003/tech-survey`)
                .then((res2)=> {
                    res2.data.forEach((obj)=> {
                        if(obj.empID === res.data.empID){
                            setTechSurStat(true);
                            return;
                        }
                    })
                })
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
                (!compSurStat ? `/dashboard/company-survey/${id}` :
                    `/dashboard/already-filled/${id}`
                )
                
        },
        {
            label: "Technology Survey",
            link: (user_type === 'HR Admin') ?  
                `/dashboard/tech-survey-chart/${id}` :
                (!techSurStat ? `/dashboard/tech-survey/${id}` :
                    `/dashboard/already-filled/${id}`
                )
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