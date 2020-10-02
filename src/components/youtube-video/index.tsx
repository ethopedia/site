import React from 'react';
import {StyledPlayButton, ThumbnailContainer, YoutubeVideoContainer} from "./styles";
import {AutoSizer} from 'react-virtualized';
import {IconNames} from "@blueprintjs/icons";
import YouTube from "react-youtube";

export type YoutubeVideoProps = {
  videoId: string,
  startTime?: number,
  videoName: string,
  onPlayerReady?(event: { target: any }): void
}

export const YoutubeVideo = (props: YoutubeVideoProps) => {

  const {
    videoId,
    startTime,
    onPlayerReady
  } = props

  const [isVideoRendered, setIsVideoRendered] = React.useState(true);

  let videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
  if (startTime) {
    videoUrl += `&start=${startTime}`
  }

  return (
    <YoutubeVideoContainer>
      <AutoSizer>
        {({ width }) => {

          const height = (width * 9) / 16

          return (
            <VideoThumbnail
              width={width}
              height={height}
              videoId={videoId}
            >

              {!isVideoRendered &&
                <ThumbnailContainer
                  onClick={() => setIsVideoRendered(true)}
                >
                  <div style={{display: 'flex', justifyContent: 'center'}}>
                    <PlayVideoButton />
                  </div>
                </ThumbnailContainer>
              }

              {isVideoRendered &&
                <YouTube
                  videoId={videoId}
                  onReady={onPlayerReady}
                  opts={{
                    width: `${width}`,
                    height: `${height}`,
                    playerVars: {
                      start: startTime,
                      autoplay: 1
                    }
                  }}
                />
              }

            </VideoThumbnail>
          )
        }}
      </AutoSizer>
    </YoutubeVideoContainer>
  )
}

export const YoutubeVideoThumbnail = ({ videoId }: {videoId: string}) => {

  return (
    <div>
      <AutoSizer>
        {({ width }) => {
          const height = (width * 9) / 16

          return (
            <VideoThumbnail
              width={width}
              height={height}
              videoId={videoId}
            />
          )
        }}
      </AutoSizer>
    </div>
  )
}


type VideoThumbnailProps = {
  width: number,
  height: number,
  videoId: string,
  children?: React.ReactNode
}

function VideoThumbnail(props: VideoThumbnailProps) {
  const {
    width,
    height,
    videoId,
    children
  } = props

  return (
    <div
      style={{
        position: 'relative',
        width: `${width}px`, height: `${height}px`,
        background: `url("http://img.youtube.com/vi/${videoId}/0.jpg") no-repeat center center`,
        backgroundSize: 'cover'
      }}
    >
      {children}
    </div>
  )
}

function PlayVideoButton() {
  return (
    <StyledPlayButton
      icon={IconNames.PLAY}
      iconSize={64}
      color={'#fff'}
    />
  )
}
