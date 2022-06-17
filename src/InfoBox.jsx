import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import "./InfoBox.css"

const InfoBox = ({ title, cases, total,...props }) => {
    return (
        <div>

            <Card  className='infoBox'
             onClick={props.onClick}
            
            >
                <CardContent>
                    {/* Title  i.e Coronavirous cases*/}

                    <Typography
                     color="textSecondary"
                     className='infoBox_title'
                    > {title} 
                    </Typography>
                    {/* +120k Number of cases */}
                    <h2 className='infoBox_cases'>{cases}</h2>
                    {/* 1.2M Total */}
                    <Typography
                     color="textSecondary"
                     className='infoBox_total'
                    >
                    
                    {total} Total</Typography>

                </CardContent>
            </Card>

        </div>
    )
}

export default InfoBox