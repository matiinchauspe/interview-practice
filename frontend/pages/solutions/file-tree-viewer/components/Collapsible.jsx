import React, { useState } from 'react'
import { IconFolder, IconFolderOpen } from '@tabler/icons-react'

const CollapsibleIcon = ({ opened }) => opened ? (
  <IconFolderOpen size={22} strokeWidth={1} color='black' />
) : (
  <IconFolder size={22} strokeWidth={1} color='black' />
);


const Collapsible = ({ name, children }) => {
  const [opened, setOpened] = useState(false)
  
  const toggle = () => setOpened(!opened);

  return (
    <>
      <div style={{ display: 'flex', width: '150px',  gap: children ? '5px' : '0', alignItems: 'center', cursor: 'pointer' }} role='button' onClick={toggle}>
        {children ? <CollapsibleIcon opened={opened} /> : null}
        <span style={{ display: 'inline-flex'}}>{name}</span>
      </div>
      {opened && (
        <ul>
          {children.map((child, index) => (
            <li key={index}>
              {child.children ? (
                <Collapsible name={child.name} children={child.children} />
              ) : (
                <span style={{ cursor: 'pointer' }}>{child.name}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default Collapsible;