/**
 * <ArrowRightIcon>
 * @author Kritarth <kritarth@parcel.money>
 * @description Makes a customisable ArrowRightIcon
 * @param   {<string>} size <Sets the size of the icon, width & height>
 * @param   {<string>} color <Sets the fill color of the icon>
 * @return  {<JSX.Element>}        <Icon will be retured according to the props provided>
 * @link https://www.figma.com/file/Kk9EmwuLGtT73BmEfGfnX8/SketchBook?node-id=402%3A13643
 */

import { memo } from "react";
interface Props {
    size?: string;
    color?: string;
}

const Icon = ({ size = "16", color = "black" }: Props): JSX.Element => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="arrow-right">
                <path
                    id="Vector"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.52862 2.86189C7.78896 2.60154 8.21108 2.60154 8.47142 2.86189L13.1381 7.52855C13.3984 7.7889 13.3984 8.21101 13.1381 8.47136L8.47142 13.138C8.21108 13.3984 7.78896 13.3984 7.52862 13.138C7.26827 12.8777 7.26827 12.4556 7.52862 12.1952L11.0572 8.66663H3.33335C2.96516 8.66663 2.66669 8.36815 2.66669 7.99996C2.66669 7.63177 2.96516 7.33329 3.33335 7.33329H11.0572L7.52862 3.8047C7.26827 3.54435 7.26827 3.12224 7.52862 2.86189Z"
                    fill={color}
                />
            </g>
        </svg>
    );
};

export const ArrowRightIcon = memo(Icon);
