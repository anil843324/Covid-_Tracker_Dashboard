import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const InfoBox = ({ title, cases, total }) => {
    return (
        <div>

            <Card  className='infoBox'>
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