import { Router } from 'express'
import ProducerController from './producers.controller'

const producersRouter = Router()
const producerController = new ProducerController()

producersRouter.post('/producers/create', producerController.create)
producersRouter.post('/producers/update/:id', producerController.update)
producersRouter.delete('/producers/:id', producerController.delete)

export default producersRouter
