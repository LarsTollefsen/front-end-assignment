import React, { useState, useRef } from 'react';
import AccordionArrow from '../assets/down-arrow.svg';

function TableContent({ res }: any) {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState('0px');
  const [visibility, setVisibility] = useState('text-white');
  const [rotate, setRotate] = useState(
    'transform duration-300 ease rotate-180'
  );

  const newBody = res?.body
    ?.substring(res?.body?.indexOf('>') + 1, res?.body?.indexOf('</'))
    .replace(/^(.*)<.*?>/, '$1');

  const contentSpace = useRef<HTMLTableRowElement>(null);

  function toggleAccordion() {
    setActive(active === false ? true : false);
    // @ts-ignore
    setHeight(active ? '0px' : `${contentSpace.current.scrollHeight + 15}px`);
    setVisibility(active ? 'text-white' : 'text-black');
    setRotate(
      active
        ? 'transform duration-700 ease rotate-180'
        : 'transform duration-700 ease'
    );
  }

  return (
    <>
      <tr
        onClick={toggleAccordion}
        className="text-center cursor-pointer relative"
      >
        <td className="py-4">{res?.shipId}</td>
        <td className="py-4">{res?.heading}</td>
        <td className="py-4">{res?.length}</td>
        <img
          src={AccordionArrow}
          alt="Arrow"
          className={`${rotate} absolute top-0 left-0 mt-5 ml-1 xl:ml-8`}
        />
      </tr>
      <tr
        ref={contentSpace}
        style={{ lineHeight: `${height}` }}
        className={`${visibility} transition-max-height duration-300 ease-in-out  border-b-1`}
      >
        <td colSpan={3} className="px-4 w-full lg:px-24">
          {newBody}
        </td>
      </tr>
    </>
  );
}

export default TableContent;
