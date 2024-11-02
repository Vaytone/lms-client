import React from 'react';
import { ArrowsOutLineVertical, ChatCenteredText, CursorText, Quotes, TextH, TextT, Image } from '@phosphor-icons/react';
import { BuilderTemplateIDSEnum } from '@modules/courses/types/builder.types';

export const BUILDER_ICONS = {
  [BuilderTemplateIDSEnum.Heading]: <TextH/>,
  text: <TextT/>,
  quote: <Quotes />,
  definition: <CursorText />,
  comment: <ChatCenteredText />,
  divider: <ArrowsOutLineVertical />,
  image: <Image/>,
};
