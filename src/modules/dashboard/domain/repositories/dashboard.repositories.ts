export interface IDashboardRepository {
  getTotalProducers(): Promise<number>
  getTotalArea(): Promise<number>
  getStateDistribution(): Promise<{ state: string; count: number }[]>
  getCropDistribution(): Promise<{ name: string; count: number }[]>
  getLandUseDistribution(): Promise<{
    cultivable_area: number
    vegetation_area: number
  }>
}
