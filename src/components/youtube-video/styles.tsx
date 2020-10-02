import styled from 'styled-components';
import {Icon} from "@blueprintjs/core";

export const YoutubeVideoContainer = styled.div`
  width: 100%;
  height: 100%;
  
  user-select: none;
  
  cursor: pointer;
  
  :hover {
    .bp3-icon {
      opacity: 0.6;
    }
  }
`

export const StyledPlayButton = styled(Icon)`
  opacity: 0.8;
`

export const ThumbnailContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
`
