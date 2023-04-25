import { Container } from './Filter.styled';
import { setFilter } from 'redux/filterSlice';
import { useDispatch } from 'react-redux';
import { useFetchContactsQuery } from 'redux/contacts/contactAPI';

export const Filter = () => {
  const dispatch = useDispatch();
  const { isError } = useFetchContactsQuery();
  const handleFilter = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };
  return (
    <Container>
      <h3>Find contacts by name</h3>
      <input
        disabled={isError}
        onChange={handleFilter}
        type="text"
        name="filter"
      />
    </Container>
  );
};
