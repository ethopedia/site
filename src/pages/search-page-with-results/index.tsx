import React from 'react';
import {BasicSearchBar} from "../search-page";
import {useQueryParam} from "../../routerHooks";
import {Link, useHistory, useLocation} from "react-router-dom";
import styled from "styled-components";
import {VideoSearchResult, VideoSearchResultProps} from "./VideoSearchResult";
import {gql, useLazyQuery} from "@apollo/client";
import {useWindowDimensions} from "../../hooks";
import {NonIdealState, Spinner} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";

const queryString = require('query-string')


const SEARCH_QUERY = gql`
    query($searchText: String!, $offset: Int!, $limit: Int!) {
        searchVideos(searchText: $searchText, offset: $offset, limit: $limit) {
            id
            videoId
            videoName
            episodeNumber
            matchedText
            startTime
        }
    }
`

export const SearchPageWithResults = () => {
  const [searchText] = useQueryParam('q', '')
  const [value, setValue] = React.useState(searchText);

  const inputRef = React.useRef<HTMLInputElement>(null)
  const history = useHistory()

  const [doSearch, { data, fetchMore }] = useLazyQuery(SEARCH_QUERY)

  const { search } = useLocation()

  const memoizedSetSearch = React.useCallback(() => {
    if (value) {
      history.push({pathname: '/search', search: `?q=${value.trim()}`})
      if (inputRef?.current) {
        inputRef?.current.blur()
      }
    }
  }, [history, value])


  React.useEffect(() => {
    const searchText = queryString.parse(search)['q']
    if (value !== searchText) {
      setValue(searchText)
    }

    doSearch({
      variables: {
        searchText: searchText,
        offset: 0,
        limit: 25
      }
    })
    // eslint-disable-next-line
  }, [doSearch, search])

  const { width } = useWindowDimensions()

  const isLargerScreen = width > 600

  return (
    <div style={{position: 'relative', width: '100%', height: '100%'}}>

      <header
        style={{
          position: 'relative',
          height: isLargerScreen ? '70px' : '110px',
          boxShadow: '0 4px 2px -2px lightgrey',
          zIndex: 20
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isLargerScreen ? 'row' : 'column',
            height: '100%',
            alignItems: isLargerScreen ? undefined : 'center'
          }}
        >
          <div style={{width: '30px'}} />
          <div
            style={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <StyledLink to={'/'}>
              <h1 style={{fontWeight: 'normal', margin: 0, padding: 0}}>
                Ethopedia
              </h1>
            </StyledLink>
          </div>

          <div style={{width: '30px'}}/>

          <div
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              maxWidth: '475px',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <BasicSearchBar
              inputRef={inputRef}
              defaultValue={value}
              onChange={setValue}
              onSearchSubmitted={memoizedSetSearch}
            />
          </div>
        </div>
      </header>

      <Feed
        hasMore={true}
        entries={data}
        onLoadMore={() => {
          if (!fetchMore) return

          return fetchMore({
            variables: {
              searchText: value,
              offset: Math.max(...data.searchVideos.map((d: any) => parseInt(d.id)))
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              return Object.assign({}, prev, {
                searchVideos: [...prev.searchVideos, ...fetchMoreResult.searchVideos]
              })
            }
          })
        }}
      />

    </div>
  )
}

const Feed = ({ entries, onLoadMore, hasMore } : { entries: any, onLoadMore: any, hasMore: boolean }) => {

  const [canLoadMore, setCanLoadMore] = React.useState(true);

  const handleScroll = (e: any) => {
    const bottom = (e.target.scrollHeight - e.target.scrollTop) <= (e.target.clientHeight + 50);
    if (bottom && e.target.scrollTop > 200 && canLoadMore) {
      setCanLoadMore(false)
      onLoadMore().then(() => setCanLoadMore(true))
    }
  }

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: 'calc(100% - 70px)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
        alignItems: 'center',
        alignContent: 'flex-start'
      }}
    >
      {entries &&
        entries.searchVideos.map((result: any) => {
          const parts = result.videoName.split('-')
          const data: VideoSearchResultProps = {
            videoId: result.videoId,
            videoName: parts[parts.length - 1],
            matchedText: result.matchedText,
            start: result.startTime,
            episodeNumber: result.episodeNumber
          }

          return <VideoSearchResult {...data} />
        })
      }

      {entries === undefined &&
        <Spinner />
      }

      {entries?.searchVideos.length === 0 &&
        <NonIdealState
          icon={IconNames.SEARCH}
          title={'No search results'}
          description={<p>Your search didn't match any videos<br />Try searching for something else</p>}
        />
      }
    </div>
  )
}


const StyledLink = styled(Link)`
  cursor: pointer;
  user-select: none;
  
  :link {
      text-decoration: inherit;
      color: inherit;
  }

  :visited {
    text-decoration: inherit;
    color: inherit;
  }
`
