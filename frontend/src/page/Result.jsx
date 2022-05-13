import * as React from 'react';
import PostView from "./PostView";

export default function Result() {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>Wiki content</div>
      <PostView></PostView>
    </div>
  )
}
