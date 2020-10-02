import React from 'react';
import {YoutubeVideoPopup} from "../search-page-with-results/VideoSearchResult";
import {Button, Overlay} from "@blueprintjs/core";
import {gql, useLazyQuery} from "@apollo/client";

const IM_FEELING_LUCKY_QUERY = gql`
  query($searchText: String!) {
      getRandomVideoMatchingSearch(searchText: $searchText) {
          videoId
          videoName
          startTime
      }
  }
`

export const ImFeelingLuckyButton = ({ text } : { text: string }) => {

  const [showingVideo, setShowingVideo] = React.useState(false);

  const [doSearchQuery, { data }] = useLazyQuery(IM_FEELING_LUCKY_QUERY, {
    fetchPolicy: 'no-cache'
  })

  React.useEffect(() => {
    if (data) {
      setShowingVideo(true)
    } else {
      setShowingVideo(false)
    }
  }, [data])

  function doSearch() {
    doSearchQuery({
      variables: {
        searchText: text
      }
    })
  }

  return (
    <>
      <Button
        style={{outline: 'none'}}
        onClick={doSearch}
      >
        I'm Feeling Lucky
      </Button>

      <Overlay
        isOpen={showingVideo}
        transitionDuration={50}
        onClose={() => setShowingVideo(false)}
      >
        {data?.getRandomVideoMatchingSearch &&
          <YoutubeVideoPopup
            videoId={data.getRandomVideoMatchingSearch.videoId}
            start={data.getRandomVideoMatchingSearch.startTime}
            videoName={data.getRandomVideoMatchingSearch.videoName}
          />
        }
      </Overlay>
    </>
  )
}
