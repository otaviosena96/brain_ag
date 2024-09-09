// src/routes/producer.routes.ts
import { Router } from 'express'
import ProducerController from './producers.controller'

const router = Router()
const producerController = new ProducerController()

router.post('/producers', producerController.create)

export default router
