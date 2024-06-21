interface Trip {
  id: string
  name: string
  createdOn: Date
  tripCost: number
  studentCount: number
  students: []
  expenses: []
}
export type TripResponse = Trip[]
