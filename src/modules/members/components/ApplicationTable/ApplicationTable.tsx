import React from 'react';
import { useAppSelector } from '@shared/hooks/redux';
import ApplicationRow from '@modules/members/components/ApplicationRow/ApplicationRow';
import ApplicationHead from '@modules/members/components/ApplicationHead/ApplicationHead';
import styles from './ApplicationTable.module.scss';

const ApplicationTable: React.FC = () => {
  const data = useAppSelector((state) => state.applications.data);
  
  return (
    <div className={styles.TableWrapper}>
      <div className={styles.TableContent}>
        <table className={styles.Table}>
          <ApplicationHead/>
          <tbody>
            {data.map((item) => {
              return (
                <ApplicationRow key={item.id} application={item}/>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTable;
