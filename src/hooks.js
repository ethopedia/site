import { useState, useEffect } from 'react';
import {useQueryParam} from "./routerHooks";
import {useHistory} from "react-router";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}


export function useBodyColor(color) {
  useEffect(() => {
    const curr = document.body.style.backgroundColor
    document.body.style.backgroundColor = color

    return () => document.body.style.backgroundColor = curr
  }, [color])
}

export function usePersistentQueryParam(paramName) {
  const history = useHistory()
  const [value, setValue] = useQueryParam(paramName)

  useEffect(() => {
    function onHashChange(e) {
      clearParams()
    }

    window.addEventListener("hashchange", onHashChange)

    if (window.localStorage.getItem(paramName)) {
      if (!value) {
        setValue(JSON.parse(window.localStorage.getItem(paramName)))
      }
    }

    return () => window.removeEventListener('hashchange', onHashChange)
    // eslint-disable-next-line
  }, [])

  function clearParams() {
    window.localStorage.removeItem(paramName)
    history.push({pathname: history.pathname})
  }

  function setParamValue(newValue) {
    window.localStorage.setItem(paramName, JSON.stringify(newValue))
    setValue(newValue)
  }

  return [value, setParamValue, clearParams]
}

export function useIsOnMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}
