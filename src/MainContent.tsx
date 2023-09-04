import { useState } from 'react';
import ListBox from './ListBox';
import WatchedBox from './WatchedBox';


export default function MainContent() {
  return (
    <main className="main">
      <ListBox />
      <WatchedBox />
    </main>
  );
}
