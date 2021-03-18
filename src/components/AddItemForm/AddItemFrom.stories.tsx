import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import {AddItemForm} from "./AddItemFrom";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemFormComponent',
    component: AddItemForm,
}

const callback = action("Button 'add' was pressed inside the form");

export const AddItemFormBaseEx = (props: any) => {
    return <AddItemForm addItem={callback}/>
}

export const AddItemFormDisabledEx = (props: any) => {
    return <AddItemForm addItem={callback} disabled={true}/>
}


