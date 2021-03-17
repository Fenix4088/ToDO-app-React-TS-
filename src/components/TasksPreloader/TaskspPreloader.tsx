import {useLoading, BallTriangle} from '@agney/react-loading';
import React, {CSSProperties} from "react";

export function TasksPreloader() {
    const preloaderStyle: CSSProperties = {
        "width":"100px",
        "color":"#dc004e",
        "margin": "20px auto 0"
    }

    return (
    <section style={preloaderStyle}>
        <BallTriangle/>
    </section>
);
}