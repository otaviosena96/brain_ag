import { inject, injectable } from 'tsyringe'
import { IDashboardRepository } from '../domain/repositories/dashboard.repositories'

@injectable()
export class DashboardService {
  constructor(
    @inject('DashboardRepository')
    private dashboardRepository: IDashboardRepository,
  ) {}

  async getDashboardData(): Promise<{}> {
    const totalProducers = await this.dashboardRepository.getTotalProducers()
    const totalArea = await this.dashboardRepository.getTotalArea()
    const stateDistribution =
      await this.dashboardRepository.getStateDistribution()
    const cropDistribution =
      await this.dashboardRepository.getCropDistribution()
    const landUseDistribution =
      await this.dashboardRepository.getLandUseDistribution()

    return {
      totalProducers,
      totalArea,
      stateDistribution,
      cropDistribution,
      landUseDistribution,
    }
  }
}
