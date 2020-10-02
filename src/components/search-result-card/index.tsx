import React from 'react';
import styled from 'styled-components';

export type SearchResultData = {
  episodeNumber: number,
  videoUrl: string,
  videoName: string,
  matchedText: string
}

const StyledSearchResultItem = styled.li`
  display: grid;
  width: 100%;
  height: 206px;
  
  grid-template-columns: 350px auto;
  grid-template-areas: 'video info';
  
  border: 1px solid lightgrey; 
`

const InfoCard = styled.div`
  display: grid;
  width: 100%;
  
  grid-area: info;
  
  grid-template-rows: 75px auto;
`

export const SearchResultCard = (item: SearchResultData) => {

  const {
    episodeNumber,
    videoUrl,
    matchedText,
    videoName
  } = item

  console.debug(videoUrl)


  return (
    <StyledSearchResultItem>
      {/*<iframe
        style={{display: 'block', margin: 0, padding: 0, border: 'none', gridArea: 'video'}}
        title={videoName}
        src={videoUrl}
        width={350}
        height={206}
      >nothing</iframe>*/}

      <img
        width={350}
        height={206}
        src={'http://img.youtube.com/vi/jN_CoSa2K7c/0.jpg'}
      />

      <InfoCard>
        <h2>{videoName}</h2>
        <p dangerouslySetInnerHTML={{ __html: `...${matchedText}...` }} />
      </InfoCard>
    </StyledSearchResultItem>
  )
}
