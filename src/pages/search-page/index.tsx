import React, {RefObject} from 'react';
import {Button, Divider, Icon, InputGroup} from "@blueprintjs/core";
import {IconNames} from "@blueprintjs/icons";
import {useHistory} from "react-router";
import {RandomFanDrawing} from "./RandomFanDrawing";
import {MadeWithLove} from "./MadeWithLove";
import {useIsOnMobileDevice} from "../../hooks";
import {UnstyledAnchor} from "../search-page-with-results/VideoSearchResult";
import {ImFeelingLuckyButton} from "./ImFeelingLuckyButton";

export const VideoSearchPage = () => {

  const [value, setValue] = React.useState('');

  const updateValue = (newValue: string) => {
    setValue(newValue)
  }

  const history = useHistory()

  function submitSearch() {
    if (value) {
      history.push({pathname: '/search', search: `?q=${value.trim()}`})
    }
  }

  return (
    <div style={{width: '100%', height: 'calc(100% - 70px)', overflow: 'auto'}}>
      <div
        style={{
          height: '100%', width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >

        <div style={{height: '5%'}} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >

          <div style={{width: '100%', maxWidth: '475px'}}>

            <SearchBar
              showSearchIconOnRight={false}
              onChange={updateValue}
              onSearchSubmitted={submitSearch}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px'
              }}
            >
              <Button
                style={{outline: 'none'}}
                onClick={submitSearch}
              >
                Ethopedia Search
              </Button>

              <div style={{width: '40px'}} />

              <ImFeelingLuckyButton text={value} />
            </div>

          </div>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          height: '50px',
          bottom: 0, left: 0, right: 0,
          zIndex: 4000
        }}
      >
        <Footer />
      </div>
    </div>
  )
}

function Footer() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#EBF1F5',
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <MadeWithLove />

      <div>
        <UnstyledAnchor
          href={'https://github.com/ethopedia'}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          <img
            src={'https://img.shields.io/badge/SOURCE%20CODE-GITHUB-green?style=for-the-badge'}
            alt={'View source code on github'}
          />
        </UnstyledAnchor>
      </div>
    </div>

  )
}


function SearchBar(props: BasicSearchBarProps) {

  const inputRef = React.useRef<HTMLInputElement>(null)

  const searchBarProps = {
    ...props,
    ...{
      inputRef,
      onSearchSubmitted: () => {
        if (inputRef?.current) {
          inputRef?.current?.blur()
        }
        props.onSearchSubmitted()
      }
    }
  }

  const isMobileDevice = useIsOnMobileDevice()

  React.useEffect(() => {
    if (!isMobileDevice) {
      if (inputRef?.current) {
        inputRef?.current?.focus()
      }
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div style={{maxWidth: '475px'}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <RandomFanDrawing />
      </div>

      <EthopediaLogo />
      <BasicSearchBar {...searchBarProps} />
    </div>
  )
}

function EthopediaLogo() {
  return (
    <h1 style={{
      fontWeight: 'lighter',
      textAlign: 'center',
      fontSize: '3rem',
      margin: 0,
      padding: 0,
      userSelect: 'none'
    }}>
      Ethopedia
    </h1>
  )
}

export type BasicSearchBarProps = {
  defaultValue?: string,
  onChange(newValue: string): void,
  showSearchIconOnRight?: boolean,
  inputRef?: RefObject<HTMLInputElement>,
  onSearchSubmitted(): void
}

type GenericWindowEventListener = (this: Window, ev: WindowEventMap[keyof WindowEventMap]) => void

export const BasicSearchBar = (props: BasicSearchBarProps) => {

  const {
    defaultValue = '',
    onChange,
    showSearchIconOnRight = true,
    inputRef,
    onSearchSubmitted
  } = props

  const [currentSearchText, setCurrentSearchText] = React.useState(defaultValue);

  React.useEffect(() => {
    setCurrentSearchText(defaultValue)
    onChange(defaultValue)
    // eslint-disable-next-line
  }, [defaultValue])

  React.useEffect(() => {
    const cb: GenericWindowEventListener = (ev: any) => {
      if (ev.key === 'Enter') {
        onSearchSubmitted()
      }
    }

    window.addEventListener('keypress', cb)

    return () => window.removeEventListener('keypress', cb)
  }, [onSearchSubmitted])


  return (
    <div style={{margin: '0 10px'}}>
      <InputGroup
        inputRef={inputRef}

        value={currentSearchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value)
          setCurrentSearchText(e.target.value)
        }}

        type={'text'}
        style={{outline: 'none', display: 'block'}}
        round
        large

        leftElement={<SearchBarIcon inputRef={inputRef} />}
        rightElement={
          <SearchBarRightElement
            onChange={(newValue: string) => {
              onChange(newValue)
              setCurrentSearchText(newValue)
            }}
            showSearchIconOnRight={showSearchIconOnRight}
            inputRef={inputRef}
            onSearchSubmitted={onSearchSubmitted}
          />
        }
      />
    </div>
  )
}

function SearchBarIcon({ inputRef } : { inputRef?: RefObject<HTMLInputElement> }) {
  return (
    <Icon
      icon={IconNames.SEARCH}
      onClick={() => {
        if (inputRef?.current) {
          inputRef?.current?.focus()
        }
      }}
    />
  )
}

type SearchBarRightElementProps = Pick<BasicSearchBarProps, 'onChange' | 'showSearchIconOnRight' | 'inputRef' | 'onSearchSubmitted'>

function SearchBarRightElement(props: SearchBarRightElementProps) {

  const {
    showSearchIconOnRight,
    onChange,
    inputRef,
    onSearchSubmitted
  } = props

  function onClearButtonClicked() {
    onChange('')

    if (inputRef?.current) {
      inputRef?.current?.focus()
    }
  }

  return (
    <div style={{display: 'flex'}}>
      <Button
        icon={IconNames.CROSS}
        onClick={onClearButtonClicked}
        style={{outline: 'none', marginRight: showSearchIconOnRight ? 0 : undefined}}
        minimal
      />

      {showSearchIconOnRight &&
      <>
        <Divider/>
        <Button
          icon={<Icon icon={IconNames.SEARCH} color={'#48AFF0'} />}
          onClick={onSearchSubmitted}
          style={{outline: 'none', marginLeft: 0}}
          minimal
        />
      </>
      }
    </div>
  )
}
