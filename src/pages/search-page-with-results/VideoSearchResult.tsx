import React from 'react';
import {Button, Card, Icon, Overlay} from "@blueprintjs/core";
import {YoutubeVideo} from "../../components/youtube-video";
import {IconNames} from "@blueprintjs/icons";
import styled from "styled-components";

export type VideoSearchResultProps = {
  videoId: string,
  videoName: string,
  episodeNumber: number,
  start?: number,
  matchedText: string
}

export const VideoSearchResult = (props: VideoSearchResultProps) => {

  const {
    videoId,
    videoName,
    episodeNumber,
    start,
    matchedText
  } = props

  const [showingVideo, setShowingVideo] = React.useState(false);


  return (
    <Card
      interactive={true}
      onClick={() => setShowingVideo(true)}
      style={{padding: '4px', margin: '10px', flex: '1 1 300px', maxWidth: '400px'}}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%',
          borderRadius: '4px',
          overflow: 'hidden',
          background: `url("http://img.youtube.com/vi/${videoId}/0.jpg") no-repeat center center`,
          backgroundSize: 'cover'
        }}
      >
        <div
          style={{
            position: 'absolute',
            color: 'white',
            padding: '5px',
            borderRadius: '4px',
            backgroundColor: 'rgba(48, 64, 77, 0.9)'
          }}
        >
          <p style={{margin: 0, padding: 0}}>
            <b>{videoName}</b>
          </p>

          <p style={{margin: 0, padding: 0}}>
            <b>Episode {episodeNumber}</b>
          </p>
        </div>


        <div
          style={{
            position: 'absolute',
            right: 0,
            color: 'white',
            padding: '5px',
            borderRadius: '4px',
            backgroundColor: 'rgba(48, 64, 77, 0.9)'
          }}
        >
          <p style={{margin: 0, padding: 0}}>
            <b>{formatStartTime(start ?? 0)}</b>
          </p>

        </div>
      </div>

      <div
        style={{
          position: 'relative',
          height: '75px',
          padding: '4px',
          userSelect: 'none',
          boxSizing: 'border-box'
        }}
      >
        <div
          style={{
            borderTop: '1px solid #e0e0e0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <p
            style={{textAlign: 'center', margin: 0, padding: 0}}
            dangerouslySetInnerHTML={{ __html: `<i>"...${matchedText}..."</i>` }}
          />

        </div>
      </div>

      <Overlay
        isOpen={showingVideo}
        transitionDuration={50}
        onClose={() => setShowingVideo(false)}
      >
        <YoutubeVideoPopup videoId={videoId} start={start} videoName={videoName} />
      </Overlay>

    </Card>
  )
}

type YoutubeVideoPopupProps = {
  videoId: string,
  start?: number,
  videoName: string
}

export function YoutubeVideoPopup(props: YoutubeVideoPopupProps) {

  const {
    videoId,
    start,
    videoName
  } = props

  const [playerRef, setPlayerRef] = React.useState(null);

  return (
    <>
      <Card
        style={{
          position: 'fixed',
          zIndex: 1000,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '85%',
          maxWidth: '750px',
          padding: '8px'
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <YoutubeVideo
            videoId={videoId}
            startTime={start}
            videoName={videoName}
            onPlayerReady={event => setPlayerRef(event.target)}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            zIndex: 1000,
            left: '50%',
            transform: 'translate(-50%, -50%)',
            top: '-50%',
            width: '200px', height: '75px',
          }}
        >
          <Card style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}
            onClick={() => {
              if (playerRef) {
                // @ts-ignore
                playerRef.pauseVideo()
              }
            }}
          >
            <OpenInYoutubeIcon videoId={videoId} start={start} />
          </Card>
        </div>
      </Card>

    </>
  )
}


function OpenInYoutubeIcon({ videoId, start } : { videoId: string, start?: number }) {

  let videoUrl = `https://www.youtube.com/watch?v=${videoId}`
  if (start) {
    videoUrl += `&t=${start}`
  }

  return (
    <Button>
      <UnstyledAnchor href={videoUrl} target={'_blank'} rel={'noopener noreferrer'}>
        <div
          style={{display: 'flex', cursor: 'pointer'}}
        >
          <p style={{margin: 0, padding: 0}}>Open in YouTube</p>
          <div style={{width: '7px'}} />
          <Icon
            icon={IconNames.SHARE}
          />
        </div>
      </UnstyledAnchor>
    </Button>
  )
}

export const UnstyledAnchor = styled.a`
  cursor: pointer;
  user-select: none;

  text-decoration: none !important;
  color: black;
  
  :hover {
    text-decoration: inherit;
    color: inherit;
  }
  
  :link {
    text-decoration: inherit;
    color: inherit;
  }

  :visited {
    text-decoration: inherit;
    color: inherit;
  }
`

function formatStartTime(time: number) {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor(time / 60) % 60
  const seconds = time % 60

  const formatNumber = (num: number) => ("0" + num).slice(-2);

  let result = `${formatNumber(minutes)}:${formatNumber(seconds)}`

  if (hours) {
    result = `${formatNumber(hours)}:` + result
  }

  return result
}
