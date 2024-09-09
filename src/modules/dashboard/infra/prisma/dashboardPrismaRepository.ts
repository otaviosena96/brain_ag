import { PrismaClient } from '@prisma/client'
import { IDashboardRepository } from '../../domain/repositories/dashboard.repositories'

const prisma = new PrismaClient()

export class DashboardRepository implements IDashboardRepository {
  async getTotalProducers(): Promise<number> {
    return prisma.producer.count()
  }

  async getTotalArea(): Promise<number> {
    const result = await prisma.producer.aggregate({
      _sum: {
        total_area: true,
      },
    })
    return result._sum.total_area || 0
  }

  async getStateDistribution(): Promise<{ state: string; count: number }[]> {
    const stateDistribution = await prisma.producer.groupBy({
      by: ['state'],
      _count: {
        id: true,
      },
    })

    return stateDistribution.map((item) => ({
      state: item.state,
      count: item._count.id,
    }))
  }

  async getCropDistribution(): Promise<{ name: string; count: number }[]> {
    const cropDistribution = await prisma.crop.groupBy({
      by: ['name'],
      _count: {
        id: true,
      },
    })

    return cropDistribution.map((item) => ({
      name: item.name,
      count: item._count.id,
    }))
  }

  async getLandUseDistribution(): Promise<{
    cultivable_area: number
    vegetation_area: number
  }> {
    const result = await prisma.producer.aggregate({
      _sum: {
        cultivable_area: true,
        vegetation_area: true,
      },
    })

    return {
      cultivable_area: result._sum.cultivable_area || 0,
      vegetation_area: result._sum.vegetation_area || 0,
    }
  }
}
