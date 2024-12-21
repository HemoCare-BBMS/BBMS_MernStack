import React from 'react'
import Header from './Header'



const AboutusLayout = ({children}) => {
  return (
    <>
      <div className='header'>
        <Header/>
      </div>
      <div>
        {children}
      </div>
      
    </>
  )
}

export default AboutusLayout;
