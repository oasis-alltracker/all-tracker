import * as React from "react";

const _navigator = React.createRef();

// navigateDeprecated keeps v6 navigate semantics (go back to an existing screen
// in the stack, reach screens in rendered child navigators). The legacy screens
// depend on both; remove when they are replaced in the relaunch rebuild.
function navigate(routeName, params) {
  if (!!_navigator) _navigator.current.navigateDeprecated(routeName, params);
  else {
    console.warn("_navigator not found in NavigationService");
  }
}

function reset(routeName, index, params) {
  if (!!_navigator)
    _navigator.current.reset({
      index,
      routes: [
        {
          name: routeName,
          params,
        },
      ],
    });
  else {
    console.warn("_navigator not found in NavigationService");
  }
}

function goBack(arg) {
  if (!!_navigator) _navigator.current.goBack(arg);
  else {
    console.warn("_navigator not found in NavigationService");
  }
}

function setParams(obj) {
  if (!!_navigator) _navigator.current.setParams(obj);
  else {
    console.warn("_navigator not found in NavigationService");
  }
}

export default {
  navigate,
  goBack,
  _navigator,
  reset,
  setParams,
};
