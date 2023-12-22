import React, { useState } from 'react';
import { format } from 'date-fns';
import RoleTag from '@components/RoleTag/RoleTag';
import { ApplicationRowProps } from '@modules/members/components/ApplicationRow/types';
import SmallCheckbox from '@components/ui/SmallCheckbox/SmallCheckbox';
import { useAppDispatch, useAppSelector } from '@shared/hooks/redux';
import { setSelectedApplications } from '@modules/members/redux/applications/slice';
import { deleteApplication } from '@modules/members/redux/applications/thunks';
import { membersErrorManager } from '@modules/members/helper/membersErrorManager';
import Modal from '@components/Modal/Modal';
import DeleteModal from '@components/DeleteModal/DeleteModal';
import Loader from '@components/Loader/Loader';
import styles from './ApplicationRow.module.scss';

const ApplicationRow: React.FC<ApplicationRowProps> = ({ application }) => {
  const [isLoading, setLoading] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const isSelected = useAppSelector((state) => state.applications.selected.includes(application.id));
  const dispatch = useAppDispatch();
  
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };
  
  const handleSelect = () => {
    dispatch(setSelectedApplications(application.id));
  };
  
  const handleDelete = () => {
    setLoading(true);
    dispatch(deleteApplication(application.id))
      .unwrap()
      .catch((e) => {
        membersErrorManager(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  return (
    <tr className={styles.Row}>
      {isDeleteModalOpen && (
        <Modal
          closeFunc={toggleDeleteModal}
          outsideHandler={toggleDeleteModal}
          withCloseIcon
        >
          <DeleteModal
            text="Удалить заявки"
            title="Вы уверены, что хотите удалить заявку?"
            onClose={toggleDeleteModal}
            onDelete={handleDelete}
          />
        </Modal>
      )}
      <td aria-label='checkbox application'>
        <SmallCheckbox checked={isSelected} onChange={handleSelect}/>
        {isLoading && (
          <div className={styles.RowLoader}>
            <Loader size={20}/>
          </div>
        )}
      </td>
      <td>{application.id}</td>
      <td>
        <p>
          {application.first_name}
        </p>
      </td>
      <td>
        <p>
          {application.last_name}
        </p>
      </td>
      <td>
        <p>
          {application.login}
        </p>
      </td>
      <td aria-label='role'>
        <RoleTag role={application.role}/>
      </td>
      <td>{`${format(new Date(application.created_at), 'dd/MM/yyyy hh:mm')}`}</td>
      <td className={styles.ActionRow} aria-label='action row'>
        <span className='icon-check'/>
        <span className='icon-delete' onClick={toggleDeleteModal}/>
      </td>
    </tr>
  );
};

export default ApplicationRow;
