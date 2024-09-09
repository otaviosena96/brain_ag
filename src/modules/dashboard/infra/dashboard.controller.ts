import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DashboardService } from '../services/dashboard.service'

export default class DashboardController {
  async getDashboardData(req: Request, res: Response): Promise<void> {
    try {
      const dashboardData = await container
        .resolve(DashboardService)
        .getDashboardData()
      res.status(200).json(dashboardData)
    } catch (error: any) {
      const statusCode = error.statusCode || 500
      res.status(statusCode).json({
        error: 'Falha ao obter dados do dashboard',
        message: `${error}`,
      })
    }
  }
}
