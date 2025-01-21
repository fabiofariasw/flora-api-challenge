// import { PrismaService } from '../prisma/prisma.service'
// import * as fs from 'fs'
// import * as path from 'path'

// const prismaService = new PrismaService()

// async function main() {
//   const filePath = path.join(__dirname, '../../words_dictionary.json')
//   const fileContent = fs.readFileSync(filePath, 'utf-8')
//   const wordsJson = JSON.parse(fileContent)

//   const chunkSize = 1000

//   const count = await prismaService.word.count()

//   if (count === 0) {
//     const keys = Object.keys(wordsJson)
//     for (let i = 0; i < keys.length; i += chunkSize) {
//       const chunk = keys.slice(i, i + chunkSize).map((name) => ({ name }))
//       await prismaService.word.createMany({
//         data: chunk,
//       })
//     }
//     console.log('Database has been seeded.')
//   } else {
//     console.log('Database already contains data.')
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prismaService.$disconnect()
//   })
