/**
 * <TokenLogo>
 * @description Renders token image component from supplied URL. In case of an error, backup token image is displayed
 * @link https://www.figma.com/file/pCDc3mdQ3yQRmptQN415Zf/Parcel-V2-Components?node-id=1036%3A24019

 * @param   {<Number | String>} size <Size in number or string (px)>
 * @param   {<String>} imageUrl <URL for the token logo>
 * @param   {<String>} altText <Alternate text for image component>
 * @return  {<JSX.Element>} <Token logo image from the supplied url or backup image will be rendered>
 */

import { Box } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { TokenLogoProps } from "./types";
const TokenLogo = ({
    size,
    imageUrl,
    altText = "Token",
    wrapperStyle = {},
    brokenLogo = false,
    brokenLogoUrl = "/svg/Undiscovered-Coin.svg",
}: TokenLogoProps): JSX.Element => {
    const defaultBrokenLogoUrl = "/svg/Undiscovered-Coin.svg";
    const [src, setSrc] = React.useState(
        brokenLogo ? brokenLogoUrl || defaultBrokenLogoUrl : imageUrl,
    );

    useEffect(() => {
        if (imageUrl) setSrc(imageUrl);
    }, [imageUrl]);

    if (src) {
        return (
            <Box sx={{ " span": { verticalAlign: "middle" }, ...wrapperStyle }} height="100%">
                <Image
                    alt={altText}
                    src={brokenLogo ? brokenLogoUrl || defaultBrokenLogoUrl : src}
                    width={size}
                    height={size}
                    onError={() => {
                        if (!brokenLogo) setSrc(brokenLogoUrl || defaultBrokenLogoUrl);
                    }}
                    className="imageClass"
                />
            </Box>
        );
    } else {
        return <></>;
    }
};

export default React.memo(TokenLogo);
