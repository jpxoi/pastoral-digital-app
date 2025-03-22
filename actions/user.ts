'use server'

import { createUser } from '@/queries/insert'
import userData from './userData.json'

// export const migrateUsers = async () => {
//   let usersLength = userData.length
//   let usersCreated = 0

//   for (const user of userData) {
//     // Create a new user in the database
//     await createUser({
//         id: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         nickname: user.nickname,
//         username: user.username,
//         email: user.email,
//         phoneNumber: user.phoneNumber.toString(),
//         dateOfBirth: user.dateOfBirth,
//         category: user.category as 'alumni' | 'student' | undefined,
//         studentCode: user.studentCode,
//         role: user.role as 'member' | 'admin',
//     })
//       .then(() => {
//         console.log(
//           `User ${user.firstName} ${user.lastName} created successfully`
//         )
//         usersCreated++
//       })
//       .catch((error) => {
//         console.error(
//           `Error creating user ${user.firstName} ${user.lastName}: ${error}`
//         )
//       })
//   }

//   if (usersCreated < usersLength) {
//     console.error(
//       `Migration failed. ${usersLength - usersCreated} users were not created.`
//     )
//   }

//   console.log(
//     `Total users processed: ${usersLength}, Users created: ${usersCreated}`
//   )
// }

