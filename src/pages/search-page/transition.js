import React from 'react';
import {VideoSearchPage} from "./index";
import {PageTransition} from "@steveeeie/react-page-transition";
import {Route, Switch} from "react-router";
import {SearchPageWithResults} from "../search-page-with-results";
import {useIsOnMobileDevice} from "../../hooks";

const transitionTypes = {
  '/': 'moveToTopScaleUp',
  '/search': 'moveToBottomScaleUp'
}

export const Transition = () => {

  const isOnMobileDevice = useIsOnMobileDevice()

  return (
    <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0}}>
      <Route
        render={({ location }) => {
          return (
            <PageTransition
              preset={transitionTypes[location.pathname] ?? 'moveToTopScaleUp'}
              enterAnimation={(transitionTypes[location.pathname] ?? 'moveToTopScaleUp') === 'moveToTopScaleUp' ? 'moveFromTop' : 'moveFromBottom'}
              // disable animations on mobile - they stutter too much
              transitionKey={isOnMobileDevice ? '' : location.pathname}
            >
              <Switch location={location}>
                <Route exact path={'/'}>
                  <VideoSearchPage />
                </Route>

                <Route exact path={'/search'}>
                  <SearchPageWithResults />
                </Route>
              </Switch>
            </PageTransition>
          )
        }}
      />
    </div>
  )
}
