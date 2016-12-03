export * from './Nav';
export * from './Menu';
export * from "./Box";
export * from "./Button";

import {useRouterHistory} from "react-router";
import {createHistory, useBasename} from "history";

export const browserHistory = useBasename(useRouterHistory(createHistory))({basename: '/'});