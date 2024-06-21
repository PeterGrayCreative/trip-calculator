interface Trip {
  id: number
  name: string
  createdOn: Date
  tripCost: number
  studentCount: number
}
export type TripResponse = Trip[]
