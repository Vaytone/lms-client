import {
  BUILDER_IMAGES_INDEXED_DB_KEY,
  BUILDER_IMAGES_KEY,
  BUILDER_SAVE_DATA_KEY,
} from '@modules/courses/constants/builder';
import { CourseBuilderState } from '@modules/courses/redux/types';
import {
  commentContentSchema,
  courseBaseSchema, courseBlockSchema, fileContentSchema,
  headingContentSchema, imageContentSchema, textContentSchema,
} from '@modules/courses/validation/course.validation';
import {
  BuilderBlockTypeEnum,
  CommentCourseItem,
  CourseItem, FileCourseItem,
  HeadingCourseItem, ImageCourseItem, TextCourseItem,
} from '@modules/courses/types/builder.types';
import { convert } from 'html-to-text';

export function openBuilderDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open(BUILDER_IMAGES_INDEXED_DB_KEY, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(BUILDER_IMAGES_KEY)) {
        const store = db.createObjectStore(BUILDER_IMAGES_KEY, { keyPath: 'id' });
        store.createIndex('itemId', 'itemId', { unique: false });
      }
    };

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export const deleteFilesByItemIds = async (
  itemIds: string[],
  iDb: IDBDatabase | null,
): Promise<void> => {
  if (!iDb) {
    return;
  }
  
  const transaction: IDBTransaction = iDb.transaction(BUILDER_IMAGES_KEY, 'readwrite');
  const store: IDBObjectStore = transaction.objectStore(BUILDER_IMAGES_KEY);
  const index = store.index('itemId');
  
  const deletePromises = itemIds.map((itemId) => {
    return new Promise<void>((resolve) => {
      const deleteRequest: IDBRequest<IDBCursorWithValue | null> = index.openCursor(IDBKeyRange.only(itemId));
      
      deleteRequest.onsuccess = (event: Event) => {
        const cursor: IDBCursorWithValue | null = (event.target as IDBRequest).result;
        if (cursor) {
          store.delete(cursor.primaryKey);
          cursor.continue();
        } else {
          resolve();
        }
      };
      
      deleteRequest.onerror = () => {
        return null;
      };
    });
  });
  
  try {
    await Promise.all(deletePromises);
  } catch (error) {
    return error;
  }
};

export const saveCourseBuilderData = (courseData: CourseBuilderState) => {
  const dataToSave = {
    form: {
      title: courseData.main.title,
      description: courseData.main.description,
    },
    items: courseData.items,
    blocks: courseData.blocks,
    blocksInfo: courseData.blocksInfo,
  };

  const prevSavedData = localStorage.getItem(BUILDER_SAVE_DATA_KEY);
  if (prevSavedData !== JSON.stringify(dataToSave)) {
    localStorage.setItem(BUILDER_SAVE_DATA_KEY, JSON.stringify(dataToSave));
  }
};

const validateMainInfo = async (data: CourseBuilderState['main']) => {
  try {
    await courseBaseSchema.validate(data);
    return true;
  } catch {
    return false;
  }
};

const validateHeadingBlock = async (data: HeadingCourseItem) => {
  try {
    await headingContentSchema.validate(data.data);
    return true;
  } catch {
    return false;
  }
};

const validateCommentBlock = async (data: CommentCourseItem) => {
  try {
    await commentContentSchema.validate(data.data);
    return true;
  } catch {
    return false;
  }
};

const validateFileBlock = async (data: FileCourseItem) => {
  try {
    await fileContentSchema.validate(data.data);
    return true;
  } catch {
    return false;
  }
};

const validateImageBlock = async (data: ImageCourseItem) => {
  try {
    await imageContentSchema.validate(data.data);
    return true;
  } catch {
    return false;
  }
};

const validateTextBlock = async (data: TextCourseItem) => {
  try {
    await textContentSchema.validate({
      ...data.data,
      clearText: convert(data.data.text).replace(/[\n\r\t]/gm, '').trim(),
    });
    return true;
  } catch (e) {
    return false;
  }
};

const validateCourseItem = async (data: CourseItem) => {
  switch (data.data.type) {
  case BuilderBlockTypeEnum.Heading:
    return validateHeadingBlock(data as HeadingCourseItem);
  case BuilderBlockTypeEnum.Comment:
    return validateCommentBlock(data as CommentCourseItem);
  case BuilderBlockTypeEnum.File:
    return validateFileBlock(data as FileCourseItem);
  case BuilderBlockTypeEnum.Image:
    return validateImageBlock(data as ImageCourseItem);
  case BuilderBlockTypeEnum.Text:
    return validateTextBlock(data as TextCourseItem);
  default:
    return true;
  }
};

const validateCourseBlock = async (data: {title: string}) => {
  try {
    await courseBlockSchema.validate(data);
    return true;
  } catch {
    return false;
  }
};

export const validateCourseForm = async (data: CourseBuilderState) => {
  const isMainVaid = await validateMainInfo(data.main);
  const itemValidationResults = await Promise.all(
    Object.values(data.items).map(async (item) => {
      return validateCourseItem(item);
    }),
  );
  
  const blockValidationResults = await Promise.all(
    Object.values(data.blocksInfo).map(async (item) => {
      return validateCourseBlock(item);
    }),
  );
  
  return isMainVaid && !blockValidationResults.includes(false) && !itemValidationResults.includes(false);
};

export const getCourseFiles = async (data: CourseBuilderState) => {
  // const itemValidationResults = Object.values(data.items).map(async (item) => {
  //   return validateCourseItem(item);
  // });
};
