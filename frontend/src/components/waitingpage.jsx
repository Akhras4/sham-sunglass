import React from 'react'
import './waitingpage.css'
import { motion } from 'framer-motion'
export default function Waitingpage() {
    
  return (
    <div>
  <div class="mainwait">
  <motion.div
        initial={{ x: -1500 }}
        animate={{ x:  0 }}
        transition={{ duration: 0.5 }}
        className='text-leftcon'
      >
        <div className='text-left'>
            <span >SAM</span>
            {/* <span className='span2'><img src='https://i.postimg.cc/D03CmyDG/Untitled-1.png'/></span> */}
            <span >OPTIK</span>
            
        </div>
        </motion.div>
    <div class="mid">
      <svg width="250px" height="160px" viewBox="0 -10 200 160" version="1.1" xmlns="http://www.w3.org/2000/svg" >
        <g id="aj-head" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="aj-container" transform="translate(-360.000000, -269.000000)">
                <g id="aj" transform="translate(360.000000, 269.000000)">
                    <path d="M62.2783199,123.428026 C23.3391467,123.159103 2.6895851,116.342338 0.329635211,102.97773 C-3.21028963,82.9308181 22.8334431,74.1958316 27.1319233,62.3296104 C30.3221926,53.522674 27.6769697,44.198225 33.9589212,36.0724399 C41.3759066,26.4784738 50.8157061,22.1864363 62.2783199,23.1963275 C77.9551299,2.66187364 99.3632468,-4.23904936 126.502671,2.49355845 C153.642094,9.22616626 167.211806,29.1715169 167.211806,62.3296104 C190.137034,73.1017829 199.829685,86.6511561 196.28976,102.97773 C190.979873,127.467591 144,131 130.042595,129 C116.085191,127 107.354211,124.361636 96,123.428026 C88.4305261,122.80562 77.189966,122.80562 62.2783199,123.428026 Z" id="hairBack" class="winkAnim" fill="#EE8F90"></path>
                    <g id="head" transform="translate(41.000000, 19.000000)">
                        <path d="M54.5,122 C81.8380951,122 104,89.8087241 104,61.6422018 C104,33.4756796 81.8380951,19 54.5,19 C27.1619049,19 5,33.4756796 5,61.6422018 C5,89.8087241 27.1619049,122 54.5,122 Z" id="face" fill="#0C3448"></path>
                        <g id="bangs" transform="translate(1.000000, 0.000000)" fill="#EE8F90">
                            <path d="M7,52.5 C1,61.5 8.22268281,85.3585365 7,84 C5.77731719,82.6414635 -8,49.5 7,33.5 C12.7937062,27.3200467 22,28.5 26.5,33.5 C31,38.5 13,43.5 7,52.5 Z" id="bangsL"></path>
                            <path d="M24,39 C28.7942833,36.5 44,20.5 58.5,20.5 C73,20.5 78,36 78,48.5 C78,61 78.9106626,69.672622 83,78 C87.0893374,86.327378 112,109.5 107.5,102.5 C103,95.5 102,72.5 107.5,48.5 C113,24.5 99.5,10 87.5,4 C75.5,-2 38.5,-2 20,13.5 C1.5,29 19.2057167,41.5 24,39 Z" id="bangsR"></path>
                        </g>
                        <g id="glasses" transform="translate(5.000000, 64.000000)" fill="#F5D76A">
                            <path d="M20.5,33 C31.8218374,33 41,24.7172679 41,14.5 C41,4.28273213 31.8218374,0.5 20.5,0.5 C9.17816263,0.5 0,4.28273213 0,14.5 C0,24.7172679 9.17816263,33 20.5,33 Z" id="glassesL"></path>
                            <path d="M77.5,33.5 C88.8218374,33.5 98,25.2172679 98,15 C98,4.78273213 88.8218374,1 77.5,1 C66.1781626,1 57,4.78273213 57,15 C57,25.2172679 66.1781626,33.5 77.5,33.5 Z" id="glassesR" class="glassesR"></path>
                        </g>
                        <g id="earrings" transform="translate(0.000000, 98.000000)" fill="#F5D76A">
                            <ellipse id="earringsL" cx="3" cy="7" rx="3" ry="7"></ellipse>
                            <ellipse id="earringsR" cx="108" cy="7" rx="3" ry="7"></ellipse>
                        </g>
                    </g>
                </g>
            </g>
        </g>
      </svg>
   
    <div id="circleBeat"></div>
    <h1>check your email </h1>
  </div>
      </div>
      </div>
  )
}
