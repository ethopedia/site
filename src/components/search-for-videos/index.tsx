import React from 'react';
import {gql, useQuery} from '@apollo/client'
import {InputGroup} from "@blueprintjs/core";
import {SearchResultCard, SearchResultData} from "../search-result-card";

const SEARCH_QUERY = gql`
    query($searchText: String) {
        searchVideos(searchText: $searchText) {
            episodeNumber
            videoName
            videoUrl
            matchedText
        }
    }
`

export const SearchForVideos = () => {

  const [searchText, setSearchText] = React.useState('');

  return (
    <div>

      <img
        width={150}
        height={150}
        src={'https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/15/Invicon_Fire.gif/revision/latest/scale-to-width-down/64?cb=20200410030312'}
      />

      <InputGroup
        placeholder={'Search...'}
        style={{borderRadius: '20px'}}
        value={searchText}
        onChange={(e: any) => setSearchText(e.target.value)}
      />

      <div style={{height: '50px'}}/>

      {searchText === 'dual blaze farm' &&
        <VideoSearcher searchText={searchText} />
      }
    </div>
  )
}

const VideoSearcher = ({ searchText }: {searchText: string}) => {
  const { data } = useQuery(SEARCH_QUERY, {
    variables: {
      searchText
    }
  })

  if (!data) return <p>loading...</p>

  return (
    <ul>
      {data.searchVideos.map((result: SearchResultData) => {
        return (
          <SearchResultCard key={result.videoUrl} {...result} />
        )
      })}
    </ul>
  )
}
