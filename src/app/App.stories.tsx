import React from 'react';
import App from "./App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";


export default {
  title: 'App Component',
  component: App,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

export const AppBaseExample = () => {
      return <BrowserRouterDecorator>
          <App demo={true}/>
      </BrowserRouterDecorator>;
}


