import React from 'react';
import Emoji from "react-emoji-render";

export const MadeWithLove = () => {
  return (
    <div>
      <Emoji text={"Built with️ :heart: by "} /><a href={'https://github.com/jbeck18'} target={'_blank'} rel={'noopener noreferrer'}>jbeck18</a>
    </div>
  )
}
