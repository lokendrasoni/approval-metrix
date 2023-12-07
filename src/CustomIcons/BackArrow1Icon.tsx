/**
 * <BackArrow1Icon>
 * @author Kritarth <kritarth@parcel.money>
 * @description Makes a customisable BackArrow1Icon
 * @param   {<string>} size <Sets the size of the icon, width & height>
 * @param   {<string>} color <Sets the fill color of the icon>
 * @return  {<JSX.Element>}        <Icon will be retured according to the props provided>
 * @link https://www.figma.com/file/Kk9EmwuLGtT73BmEfGfnX8/SketchBook?node-id=402%3A13646
 */

import { memo } from "react";
import { v4 } from "uuid";
interface Props {
    size?: string;
    color?: string;
}

const Icon = ({ size = "24", color = "#25274F" }: Props): JSX.Element => {
    let clipPathId = v4();
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath={`url(#${clipPathId})`}>
                <path
                    d="M7.828 10.9999H20V12.9999H7.828L13.192 18.3639L11.778 19.7779L4 11.9999L11.778 4.22192L13.192 5.63592L7.828 10.9999Z"
                    fill={color}
                />
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
export const BackArrow1Icon = memo(Icon);
