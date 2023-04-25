import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Form } from './ContactForm.styled';
import {
  useAddContactsMutation,
  useFetchContactsQuery,
} from 'redux/contacts/contactAPI';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addContact] = useAddContactsMutation();

  const { data: contacts } = useFetchContactsQuery();
  const { isError } = useFetchContactsQuery();

  const addNewUser = e => {
    e.preventDefault();
    if (contacts.find(option => option.name === name)) {
      toast.error(`${name} already in contact`);
    } else {
      toast.success('contact is added');
      const newUser = {
        name,
        phone,
      };
      addContact(newUser);
      setName('');
      setPhone('');
    }
  };

  const changeHandler = ({ target: { value, name } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form onSubmit={addNewUser}>
      <Toaster />
      <label>
        Name
        <input
          disabled={isError}
          onChange={changeHandler}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          disabled={isError}
          onChange={changeHandler}
          value={phone}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button disabled={isError} type="submit">
        Add User
      </button>
    </Form>
  );
};
