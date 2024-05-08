import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import './Favoriteicon.css';

export default function Favoriteicon() {
    useEffect(() => {
        const t1 = gsap.timeline({ defaults: { ease: "power4.out", duration: 0.7 } });
    
        t1.set(".sparkle-container", { visibility: "hidden" });
    
        const favoriteItem = document.querySelector(".favorite-item");
        if (!favoriteItem) {
            console.error("Favorite item not found in the DOM");
            return;
        }
    
        favoriteItem.addEventListener("click", function () {
            t1.set(".sparkle-container", { visibility: "visible" });
            const favoriteContainer = document.querySelector('.favorite-container path');
            if (!favoriteContainer) {
                console.error("Favorite container path not found in the DOM");
                return;
            }
            
            const sparkleContainers = document.querySelectorAll('.sparkle-container');
            const containerWidth = favoriteContainer.getBoundingClientRect().width / 100;
            const containerHeight = favoriteContainer.getBoundingClientRect().height / -100;
            const positions = [
                { x: 18, y: containerHeight / 4 + 20 }, // Top left 
                { x: containerWidth / 2, y: containerHeight / 2 + 28 }, // Top center
                { x: containerWidth - 18, y: containerHeight / 4 + 20 }, // Top right 
                { x: 10, y: containerHeight - 4 }, // Middle left
                { x: containerWidth - 8, y: containerHeight - 8 }, // Middle right
                { x: -18, y: containerHeight * 2 - 10 }, // Bottom left
                { x: containerWidth / 50, y: containerHeight * 1.5 - 35 }, // Bottom center
                { x: containerWidth - 102, y: containerHeight * 1.5 - 80 } // Bottom right
            ];
    
            sparkleContainers.forEach((sparkleContainer, index) => {
                gsap.to(sparkleContainer, {
                    x: positions[index]?.x || 0, // Access x property safely
                    y: positions[index]?.y || 0, // Access y property safely
                    duration: 1.2,
                    scale: 1.2,
                    yoyo: true,
                    repeat: 1,
                    onComplete: () => {
                        gsap.set(sparkleContainer, { visibility: "hidden" });
                    }
                });
            });
        });
    }, []);

  return (
    <div class="favorite-item">
    Add Favorite
<div class="favorite-container">
    <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style={{ color: "gray" }}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00001 0.433594L8.65845 1.64093L10.5908 5.18412L14.5577 5.92698L15.9094 6.18011L14.9646 7.17942L12.192 10.1121L12.7113 14.1144L12.8883 15.4782L11.6459 14.8884L8.00001 13.1577L4.35408 14.8884L3.11173 15.4782L3.28869 14.1144L3.80802 10.1121L1.03538 7.17942L0.0906067 6.18011L1.44233 5.92698L5.40922 5.18412L7.34156 1.64093L8.00001 0.433594ZM8.00001 3.56646L6.55565 6.21487L6.38519 6.52743L6.03525 6.59296L3.07014 7.14822L5.14259 9.34029L5.38718 9.59899L5.34137 9.95205L4.95318 12.9436L7.67838 11.65L8.00001 11.4973L8.32163 11.65L11.0468 12.9436L10.6586 9.95205L10.6128 9.59899L10.8574 9.34029L12.9299 7.14822L9.96476 6.59296L9.61482 6.52743L9.44436 6.21487L8.00001 3.56646Z" fill="gray"></path>
    </svg>
    <div class="sparkles-container">
        <div class="sparkle-container" ><svg fill="none" height="6" viewBox="0 0 6 6" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z" fill="#ff4cff"></path>
            </svg></div>
        <div class="sparkle-container" ><svg fill="none" height="6" viewBox="0 0 6 6" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z" fill="#ff8b8b"></path>
            </svg></div>
        <div class="sparkle-container"><svg fill="none" height="6" viewBox="0 0 6 6" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z" fill="#f4ff21"></path>
            </svg></div>
        <div class="sparkle-container"><svg fill="none" height="6" viewBox="0 0 6 6" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z" fill="#46e5e5"></path>
            </svg></div>
            <div class="sparkle-container"><svg fill="none" height="6" viewBox="0 0 6 6" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z" fill="#46e5e5"></path>
            </svg></div>
        <div class="sparkle-container"><svg fill="none" height="6" viewBox="0 0 6 6" width="6" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 0.5V0H3.5V0.5C3.5 1.60457 4.39543 2.5 5.5 2.5H6V3V3.5H5.5C4.39543 3.5 3.5 4.39543 3.5 5.5V6H3H2.5V5.5C2.5 4.39543 1.60457 3.5 0.5 3.5H0V3V2.5H0.5C1.60457 2.5 2.5 1.60457 2.5 0.5Z" fill="#6f6fff"></path>
            </svg></div>
    </div>
</div>
</div>
  )
}
