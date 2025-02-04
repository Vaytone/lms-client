import React, { createContext, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BuilderFile } from '@modules/courses/types/builder.types';
import { openBuilderDatabase } from '@modules/courses/helper/builder.helper';
import { BUILDER_IMAGES_KEY, BUILDER_SAVE_DATA_KEY } from '@modules/courses/constants/builder';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { setSavedCourseData, triggerCourseSaveComplete } from '@modules/courses/redux/slice';

interface BuilderContextType {
  setFiles: Dispatch<SetStateAction<BuilderFile[]>>
  files: BuilderFile[],
  iDb: IDBDatabase,
}

export const BuilderContext = createContext<BuilderContextType | null>(null);

// interface BuilderContextProviderProps {
//   children: React.ReactNode;
// }

export const BuilderContextProvider: React.FC = () => {
  const [files, setFiles] = useState<BuilderFile[]>([]);
  const [isSavedComplete, setSavedComplete] = useState(false);
  const iDbRef = useRef(null);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (!iDbRef.current) {
      openBuilderDatabase()
        .then((db) => {
          const transaction = db.transaction(BUILDER_IMAGES_KEY, 'readonly');
          const store = transaction.objectStore(BUILDER_IMAGES_KEY);
          const request = store.getAll();

          request.onsuccess = () => {
            setFiles(request.result as BuilderFile[]);
          };

          iDbRef.current = db;
        }).catch(() => {
        // console.error('IndexedDB error:', error);
        })
        .finally(() => {
          const saveData = localStorage.getItem(BUILDER_SAVE_DATA_KEY);
          if (saveData) {
            const data = JSON.parse(saveData);
            dispatch(setSavedCourseData({
              main: {
                title: data.form.title,
                description: data.form.description,
              },
              blocksInfo: data.blocksInfo,
              items: data.items,
              blocks: data.blocks,
            }));
          }

          setTimeout(() => {
            dispatch(triggerCourseSaveComplete());
            setSavedComplete(true);
          }, 300);
        });
    }
  }, []);
  
  const contextValue: BuilderContextType = {
    files,
    setFiles,
    iDb: iDbRef.current,
  };
  
  return (
    <BuilderContext.Provider value={contextValue}>
      {/*{children}*/}
      {isSavedComplete ? <Outlet/> : null}
    </BuilderContext.Provider>
  );
};
