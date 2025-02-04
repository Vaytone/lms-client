import React from 'react';
import {
  ArrowsOutLineVertical,
  ChatCenteredText,
  CursorText,
  Quotes,
  TextH,
  TextT,
  Image,
  File,
  FilePdf, FileDoc, FilePpt, FileXls, FileTxt, FileZip,
} from '@phosphor-icons/react';
import { BuilderTemplateIDSEnum } from '@modules/courses/types/builder.types';

export const BUILDER_ICONS = {
  [BuilderTemplateIDSEnum.Heading]: <TextH/>,
  [BuilderTemplateIDSEnum.Text]: <TextT/>,
  [BuilderTemplateIDSEnum.Comment]: <ChatCenteredText />,
  [BuilderTemplateIDSEnum.Image]: <Image/>,
  [BuilderTemplateIDSEnum.Divider]: <ArrowsOutLineVertical />,
  [BuilderTemplateIDSEnum.File]: <File/>,
  quote: <Quotes />,
  definition: <CursorText />,
};

export const FILE_ICONS = {
  pdf: <FilePdf/>,
  doc: <FileDoc/>,
  docx: <FileDoc/>,
  ppt: <FilePpt/>,
  pptx: <FilePpt/>,
  xls: <FileXls/>,
  xlsx: <FileXls/>,
  txt: <FileTxt/>,
  zip: <FileZip/>,
  rar: <FileZip/>,
};
