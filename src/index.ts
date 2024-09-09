import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import producersRouter from './modules/producers/infra/producers.routes'
import dashboardRouter from './modules/dashboard/infra/dashboard.routes'
import '../src/container/index'

const app = express()
const port = 3000
app.use(cors())

app.use(express.json())

app.use(producersRouter)
app.use(dashboardRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
