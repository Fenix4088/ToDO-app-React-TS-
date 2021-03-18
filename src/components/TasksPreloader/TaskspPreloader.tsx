import {BallTriangle, Circles} from '@agney/react-loading';
import React, {CSSProperties} from "react";

type TaskPreloaderPropsT = {
    size?: string;
    type?: "circle" | "triangle"
}

export function TasksPreloader({size = "100", type = "triangle", ...props}: TaskPreloaderPropsT) {
    const preloaderTriangleStyle: CSSProperties = {
        width: `${size}px`,
        color: "#dc004e",
        margin: "20px auto 0",
    };

    const preloaderCircleStyle: CSSProperties = {
        width: `${size}px`,
        color: "#dc004e",
        position: "absolute",
        left: "11px",
        top: "11px",
    };

    return (
        <div style={type === "circle" ? preloaderCircleStyle : preloaderTriangleStyle}>
            {type === "circle" ? <Circles/> : <BallTriangle/>}
        </div>
    );
}