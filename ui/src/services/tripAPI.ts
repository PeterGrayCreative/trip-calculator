import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BasicTripResponse, Trip } from '../types/types';

// Define a service using a base URL and expected endpoints
export const tripCalculatorAPI = createApi({
  reducerPath: 'tripCalculatorAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5036/api/' }),
  tagTypes: ['trip', 'trips'],
  endpoints: (builder) => ({
    getAllTrips: builder.query<BasicTripResponse, void>({
      query: () => 'all-trips',
      providesTags: ['trips'],
    }),
    getTripById: builder.query<Trip, string>({
      query: (string) => `trip/${string}`,
      providesTags: ['trip'],
    }),
    addTrip: builder.mutation({
      invalidatesTags: ['trips'],
      query: (name) => ({
        url: `trip?tripName=${name}`,
        method: 'POST',
      }),
    }),
    addStudent: builder.mutation({
      invalidatesTags: ['trip', 'trips'],
      query: (query) => ({
        url: `student?${query}`,
        method: 'POST',
      }),
    }),
    addExpense: builder.mutation({
      invalidatesTags: ['trip', 'trips'],
      query: (data) => {
        const { tripId, ...body } = data;
        return {
          url: `trip/${tripId}/expense`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useGetAllTripsQuery,
  useGetTripByIdQuery,
  useAddTripMutation,
  useAddStudentMutation,
  useAddExpenseMutation,
} = tripCalculatorAPI;
