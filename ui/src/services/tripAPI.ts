import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BasicTripResponse, Trip } from '../types/types';

// Define a service using a base URL and expected endpoints
export const tripCalculatorAPI = createApi({
  reducerPath: 'tripCalculatorAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5036/api/' }),
  endpoints: (builder) => ({
    getAllTrips: builder.query<BasicTripResponse, void>({
      query: () => 'all-trips',
    }),
    getTripById: builder.query<Trip, string>({
      query: (string) => `trip/${string}`,
    }),
    addTrip: builder.mutation({
      query: (name) => ({
        url: `trip?TripName=${name}`,
        method: 'POST',
      })
    })
  }),
});
export const { useGetAllTripsQuery, useGetTripByIdQuery, useAddTripMutation } = tripCalculatorAPI