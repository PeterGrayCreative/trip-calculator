export interface Trip {
  id: string
  name: string
  createdOn: Date
  tripCost: number
  studentCount: number
  students: object[]
  expenses: object[]
}

interface BasicTrip {
  id: string
  name: string
  createdOn: Date
  tripCost: number
  studentCount: number
}
export type BasicTripResponse = BasicTrip[];
