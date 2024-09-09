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
    } catch (error: any) {
      const statusCode = error.statusCode || 500
      res.status(statusCode).json({
        error: 'Falha ao cadastrar produtor',
        message: `${error}`,
      })
    }
  }
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const data: CreateProducerDto = req.body
      const producer = await container.resolve(ProducerService).update(id, data)
      res.status(200).json(producer)
    } catch (error: any) {
      const statusCode = error.statusCode || 500
      res.status(statusCode).json({
        error: 'Falha ao atualizar produtor',
        message: `${error}`,
      })
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      await container.resolve(ProducerService).delete(id)
      res.status(204).send()
    } catch (error: any) {
      const statusCode = error.statusCode || 500
      res.status(statusCode).json({
        error: 'Falha ao deletar produtor',
        message: `${error}`,
      })
    }
  }
}
