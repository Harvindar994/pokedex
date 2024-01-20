import React from 'react';
import Image from 'next/image';

interface Props{
    size: number,
    url: string,
    showName?: boolean,
}

const Logo = (props: Props) => {
  return (
    <div className="flex items-center gap-4 md:gap-2">
        <Image className="mix-blend-difference md:w-8 md:h-8" src={props.url} height={props.size} width={props.size} alt='logo'/ >
        {
          props.showName && <h1 className="text-xl md:text-base">Pokedex</h1>
        }
  </div>
  )
}

export default Logo