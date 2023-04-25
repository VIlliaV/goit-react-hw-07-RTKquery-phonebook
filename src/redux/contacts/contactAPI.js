import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactAPI = createApi({
  reducerPath: 'contactsRTK',
  tagTypes: ['contacts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64456476914c816083cdc3ae.mockapi.io/',
  }),
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => 'contacts',
      providesTags: ['contacts'],
    }),
    addContacts: builder.mutation({
      query: ({ name, phone }) => ({
        url: 'contacts',
        method: 'POST',
        body: { name, phone },
      }),
      invalidatesTags: ['contacts'],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useAddContactsMutation,
  useDeleteContactMutation,
} = contactAPI;
