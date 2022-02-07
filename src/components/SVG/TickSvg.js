import React from 'react'
import Svg, { G, Path, Rect ,Circle } from 'react-native-svg'

const TickSvg = () => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={"#dd9390"}>
            <G id="Group_152" data-name="Group 152" transform="translate(-28 -448)">
                <Circle id="Ellipse_43" data-name="Ellipse 43" cx="12" cy="12" r="12" transform="translate(28 448)" fill="#ee8c8b" />
                <G id="Layer_2" data-name="Layer 2" transform="translate(30.75 451.75)">
                    <G id="checkmark">
                        <Rect id="Rectangle_72" data-name="Rectangle 72" width="18" height="18" transform="translate(0.25 0.25)" fill="#fff" stroke="#fff" stroke-width="1" opacity="0" />
                        <Path id="Path_58" data-name="Path 58" d="M8.517,15.24a.771.771,0,0,1-.563-.247L4.208,11.008A.772.772,0,1,1,5.333,9.952l3.176,3.384,6.483-7.092a.771.771,0,1,1,1.141,1.033L9.087,14.986a.771.771,0,0,1-.563.254Z" transform="translate(-0.916 -1.365)" fill="#fff" stroke="#fff" stroke-width="1" />
                    </G>
                </G>
            </G>
        </Svg>

    )
}

export default TickSvg
