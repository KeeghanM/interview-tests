import { app } from './app.js'
import { seedDatabase } from './database.js'

const port = Number(process.env.PORT ?? 3000)

seedDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`API listening on port ${port}`)
    })
  })
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
