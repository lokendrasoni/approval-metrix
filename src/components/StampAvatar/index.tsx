import { createIcon } from "@download/blockies";
import { isHexString } from "ethers/lib/utils";
import { memo, useEffect, useMemo, useState } from "react";

type Props = {
    size: number;
    seed: string;
    containerStyles?: any;
    personBlockie?: boolean;
    blockieRadius?: string;
    reRenderOnChange?: boolean;
};

const StampAvatar = ({
    seed,
    size,
    containerStyles = {},
    personBlockie = false,
    blockieRadius = "50%",
    reRenderOnChange = false,
}: Props) => {
    const placeholderSrc = "/svg/blockieFallback.svg";
    const userPlaceholderSrc = "/svg/Circleusericon.svg";

    const iconURL = useMemo(() => {
        if (!seed) return personBlockie ? userPlaceholderSrc : placeholderSrc;

        if (!isHexString(seed)) return `https://cdn.stamp.fyi/avatar/${seed.toLowerCase()}`;

        return createIcon({ seed: seed.toLowerCase(), size: 8, scale: size / 8 }).toDataURL();
    }, [seed, size]);

    const [imageSrc, setImageSrc] = useState<string | null>(iconURL);

    const handleImageError = () => {
        setImageSrc(placeholderSrc);
    };

    useEffect(() => {
        if (reRenderOnChange) {
            setImageSrc(iconURL);
        }
    }, [iconURL]);

    return (
        <>
            <div style={{ ...containerStyles }}>
                <div
                    style={{
                        width: size,
                        height: size,
                        borderRadius: blockieRadius,
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={imageSrc}
                        alt=""
                        onError={handleImageError}
                        // onLoad={handleImageLoad}
                        height={size}
                        width={size}
                        // loading="lazy"
                        style={{
                            display: "block",
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default memo(StampAvatar);
