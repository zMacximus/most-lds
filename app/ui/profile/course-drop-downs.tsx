"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import SmallCourse from "./course-small";

interface Props {
  key: string;
  title: string;
}

export default function CourseDropDown({
  props,
  children,
}: {
  props: Props;
  children: React.ReactNode;
}) {
  const [subtitle, setSubtitle] = useState("Press to expand");

  const handleKeyDown = () => {
    setSubtitle("Press to collapse");
  };

  const handleKeyUp = () => {
    setSubtitle("Press to expand");
  };

  return (
    <Accordion>
      <AccordionItem
        key={props.key}
        title={props.title}
        subtitle={subtitle}
        className='text-2xl'
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        {children}
      </AccordionItem>
    </Accordion>
  );
}
