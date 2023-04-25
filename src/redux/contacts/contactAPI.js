import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactAPI = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseURL: 'https://64456476914c816083cdc3ae.mockapi.io/',
  }),
  endpoints: builder => ({
    fetchContacts: builder.query({ query: () => 'contacts' }),
    addContacts: builder.mutation,
  }),
});
