import React from 'react'
import { useEffect } from 'react';

export default function Video() {
    useEffect(() => {
        var video = document.getElementById('myVideo');
        if (video) {
          video.autoplay = true; 
          video.muted = true; 
          video.loop = true; 
        }
      }, []);
  return (
    <div>
    <div className='videoco'>
    <video id="myVideo" autoPlay muted loop>
        <source src="https://media.ray-ban.com/cms/resource/blob/981888/3bb57dbcfad0a66ace3360761c6924cc/rb-hp-hero-icons-d-data.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>  
    </div>
    </div>
  )
}
