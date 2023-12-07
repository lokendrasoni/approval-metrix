/**
 * <EthereumIcon>
 * @author Sumit <sumit@parcel.money>
 * @description Makes a customisable EthereumIcon
 * @param   {<string>} size <Sets the size of the icon, width & height>
 * @param   {<string>} color <Sets the fill color of the icon>
 * @return  {<JSX.Element>}        <Icon will be retured according to the props provided>
 * @link https://www.figma.com/file/pCDc3mdQ3yQRmptQN415Zf/Parcel-V2-Components?node-id=1036%3A39285&t=X2sq6lDfGrVVvOhD-0
 */

import { memo } from "react";

interface Props {
    size?: string;
    color?: string;
}

const Icon = ({ size = "24", color = "#25274F" }: Props): JSX.Element => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M7 11.5L12 3L17 11.5L12 14.5L7 11.5Z" fill={color} />
        <path d="M12 16L7 13L12 21L17 13L12 16Z" fill={color} />
    </svg>
);

export const EthereumButtonIcon = memo(Icon);

{
    /* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 11.5L12 3L17 11.5L12 14.5L7 11.5Z" fill="black" />
    <path d="M12 16L7 13L12 21L17 13L12 16Z" fill="black" />
</svg>; */
}
