import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Item } from './ContactItem.styled';
import { useDeleteContactMutation } from 'redux/contacts/contactAPI';
import { date } from 'utils/date';

export const ContactItem = ({ contact }) => {
  const [isHovered, setIsHovered] = useState(false);
  const del = useRef();
  const [deleteContact, { isError, error }] = useDeleteContactMutation();

  useEffect(() => {
    if (isError) {
      const { status } = error;
      toast.error(`Sorry, but we cant delete. STATUS: ${status} `);
      return;
    }
  }, [error, isError]);

  const deleteItem = id => {
    deleteContact(id);
    del.current.className += ' delete';
  };

  const { id, name, phone, createdAt } = contact;

  const formattedDate = date(createdAt);

  return (
    <Item
      ref={del}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="date" style={{ display: isHovered ? 'block' : 'none' }}>
        contact created: {formattedDate}
      </span>
      <span className="circle"></span>
      <p className="name">{name}:</p>
      <p> {phone}</p>
      <button
        onClick={() => {
          deleteItem(id);
        }}
      >
        Delete
      </button>
    </Item>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
