import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
}

const callback = action("Title was changed");

export const EditableSpanBaseExample = () => {
    return <>
            <EditableSpan  taskTitle={"Double Click on me!! :-)"} changeTitle={callback}/>
    </>
}


