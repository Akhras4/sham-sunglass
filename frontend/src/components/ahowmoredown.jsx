import React from 'react'
import "./showmore.css"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleDown} from '@fortawesome/free-solid-svg-icons';

export default function ShowmoreDown({state,handleShowMore}) {
  return (
      <div className='show-more-flex'>
          <div class="contact-fp-wrap">
              <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                      <linearGradient id="logo-gradient" x1="50%" y1="0%" x2="75%" y2="100%" >

                          <stop offset="0%" stop-color="#F79533">
                              <animate attributeName="stop-color" values="#F79533; #F37055; #EF4E7B; #A166AB; #5073B8; #1098AD; #07B39B; #6DBA82; #F79533" dur="4s" repeatCount="indefinite"></animate>
                          </stop>

                          <stop offset="100%" stop-color="#F79533">
                              <animate attributeName="stop-color" values="#F37055; #EF4E7B; #A166AB; #5073B8; #1098AD; #07B39B; #6DBA82; #F79533; #F37055" dur="4s" repeatCount="indefinite"></animate>
                          </stop>

                      </linearGradient>
                  </defs>
                  
                  <rect class="booton" height="60" width="320"  />
              </svg>
              <div class="booton-text"onClick={handleShowMore} >
              {state === 'Show More' ? (
                        <>
                        {state} <FontAwesomeIcon icon={faAngleDoubleDown} />
                        </>
                    ) : (
                        <>
                        {state} <FontAwesomeIcon icon={faAngleDoubleUp} />
                        </>
                    )}
              </div>
          </div>
      </div>
  )
}