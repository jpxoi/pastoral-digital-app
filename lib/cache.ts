export const cacheTags = {
  usersList: () => 'user:list',
  eventsList: () => 'event:list',
  event: (eventId: string) => `event:${eventId}`,
  locationsList: () => 'location:list',
  assignmentCatalog: () => 'assignment:catalog',
  assignments: () => 'assignment:list',
  userAssignments: (userId: string) => `user:${userId}:assignments`,
  // Group tags support explicit full refreshes and cascading user deletion.
  attendance: () => 'attendance',
  attendanceList: () => 'attendance:list',
  userAttendance: (userId: string) => `user:${userId}:attendance`,
  eventAttendance: (eventId: string) => `event:${eventId}:attendance`,
  masses: () => 'mass',
  massesList: () => 'mass:list',
  userMasses: (userId: string) => `user:${userId}:masses`,
} as const

export type RefreshResource =
  'users' | 'records' | 'calendar' | 'masses' | 'communities' | 'events'
