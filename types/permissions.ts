export enum Permission {
  DASHBOARD_VIEW = 'dashboard.view',
  BIRTHDAYS_VIEW = 'birthdays.view',
  EVENTS_VIEW = 'events.view',
  EVENTS_MANAGE = 'events.manage',
  EVENTS_VIEW_TODAY = 'events.view_today',
  ATTENDANCE_SCAN = 'attendance.scan',
  ATTENDANCE_VIEW_RECORDS = 'attendance.view_records',
  ATTENDANCE_VIEW_CALENDAR = 'attendance.view_calendar',
  ATTENDANCE_MANAGE_RECORDS = 'attendance.manage_records',
  CATECHISTS_VIEW = 'catechists.view',
  CATECHISTS_EDIT_PROGRAM = 'catechists.edit_program',
  CATECHISTS_VIEW_PASTORAL_ID = 'catechists.view_pastoral_id',
  CATECHISTS_ASSIGN_ROLE = 'catechists.assign_role',
  MASSES_MANAGE = 'masses.manage',
}

export const PERMISSIONS = Object.freeze(Object.values(Permission))
