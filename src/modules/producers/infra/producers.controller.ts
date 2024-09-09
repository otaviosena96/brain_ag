import { Request, Response } from 'express'
import { CreateProducerDto } from '../../../dtos/create-producer.dto'
import { container } from 'tsyringe'
import { ProducerService } from '../services/producers.service'

export default class ProducerController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateProducerDto = req.body
      const producer = await container.resolve(ProducerService).create(data)
      res.status(201).json(producer)
    } catch (error) {
      res.status(400).json({ error: 'Failed to create producer' })
    }
  }
}
