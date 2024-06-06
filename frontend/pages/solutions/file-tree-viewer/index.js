import { useState } from 'react'

import { Collapsible } from './components';

const data = [
  {
    name: 'Folder 1',
    children: [
      { name: 'File 1', children: [
        {
          name: 'File 1.1',
          children: [
            { name: 'File 1.1.1' },
            { name: 'File 1.1.2' }
          ]
        }
      ] },
      { name: 'File 2' }
    ]
  },
  {
    name: 'Folder 2',
    children: [
      { name: 'File 3' },
      { name: 'File 4' }
    ]
  }  
]  


export default function FileTreeSolution() {

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', margin: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2>File Tree Solution</h2>
      <div id='file-tree' style={{ fontFamily: 'sans-serif'}}>
        <ul>
          {data.map(({ name, children }) => (
            <li key={name}>
              <Collapsible name={name}>
                {children}
              </Collapsible>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}