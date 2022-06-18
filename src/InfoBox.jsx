import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import "./InfoBox.css"

const InfoBox = ({ title, cases, active, isRed,total,...props }) => {
    return (
        <div>

    <Card  className={`infoBox ${active && 'infoBox--selected'}  ${isRed && 'infoBox--red'}`}
              onClick={ props.onClick}
            
            >
                <CardContent
               
                
                >
                    {/* Title  i.e Coronavirous cases*/}

                    <Typography
                     color="textSecondary"
                     className='infoBox__title'
                    > {title} 
                    </Typography>
                    {/* +120k Number of cases */}
                    <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}` }>{cases}</h2>
                    {/* 1.2M Total */}
                    <Typography
                     color="textSecondary"
                     className='infoBox__total'
                    >
                    
                    {total} Total</Typography>

                </CardContent>
            </Card>

        </div>
    )
}

export default InfoBox