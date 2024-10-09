import { BUILDER_IMAGES_INDEXED_DB_KEY, BUILDER_IMAGES_KEY } from '@modules/courses/constants/builder';

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
  }
};
