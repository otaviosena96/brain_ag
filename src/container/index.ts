import { container } from 'tsyringe'
import { IProducerRepository } from '../modules/producers/domain/producer.repository'
import ProducerRepository from '../modules/producers/infra/prisma/producerPrisma.repository'
import { IDashboardRepository } from '../modules/dashboard/domain/repositories/dashboard.repositories'
import { DashboardRepository } from '../modules/dashboard/infra/prisma/dashboardPrismaRepository'

container.registerSingleton<IProducerRepository>(
  'ProducerRepository',
  ProducerRepository,
)
container.registerSingleton<IDashboardRepository>(
  'DashboardRepository',
  DashboardRepository,
)
