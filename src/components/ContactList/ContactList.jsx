import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectFilter } from 'redux/filterSlice';

import { Loader } from 'components/Loader/Loader';
import { ContactItem } from '../ContactItem/ContactItem';
import { useFetchContactsQuery } from 'redux/contacts/contactAPI';

export const ContactList = () => {
  const filter = useSelector(selectFilter);

  const { data, isError, isLoading, error } = useFetchContactsQuery();

  useEffect(() => {
    if (isError) {
      const { status, originalStatus } = error;
      toast.error(`Sorry, but ${status}. STATUS: ${originalStatus} `);
      return;
    }
  }, [error, isError]);

  if (isLoading) {
    return <Loader />;
  }

  const filterContacts = data?.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {filterContacts?.length !== 0 ? (
        <ul>
          {filterContacts?.map(({ id, name, phone, createdAt }) => (
            <ContactItem key={id} contact={{ id, name, phone, createdAt }} />
          ))}
        </ul>
      ) : (
        <p>Please add contact</p>
      )}
    </>
  );
};
