// The extensions stand on the React the page already has (the bundle is a classic script that expects
// window.React). Importing from "react" in the source resolves here, through the build's alias.
const React = window.React;

export const h = React.createElement;
export const Fragment = React.Fragment;
export const useState = React.useState;
export const useEffect = React.useEffect;
export const useRef = React.useRef;
export const useMemo = React.useMemo;
export const useCallback = React.useCallback;
export const useId = React.useId;

export default React;
