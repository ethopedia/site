import React from 'react';
import _ from 'lodash';

const choices = [
  (
    <a
      href={'https://www.reddit.com/r/ethoslab/comments/fb4zqq/2_million_subs/'}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      <img
        title={'Fan Art by /u/tanya3140'}
        src={'https://www.ethopedia.org/resources/ethopedia-search-image-min.png'}
        width={300}
        height={300}
      />
    </a>
  ),
  (
    <a
      href={'https://www.reddit.com/r/ethoslab/comments/gt8ic4/some_etho_fan_art_i_posted_this_on_the/'}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      <img
        style={{borderRadius: '35px', marginBottom: '25px'}}
        title={'Fan Art by /u/1AndOnlyRuthy'}
        src={'https://imgur.com/w0Hldqc.png'}
        width={450}
        height={275}
      />
    </a>
  )
]

// Just use the first choice for now... It's too good!!
export const RandomFanDrawing = () => {
  return choices[0] // React.useMemo(() => _.sample(choices), []) ?? choices[0]
}
