import { Router } from 'express'
import DashboardController from './dashboard.controller'

const dashboardRouter = Router()
const dashboardController = new DashboardController()

dashboardRouter.get('/dashboard', dashboardController.getDashboardData)

export default dashboardRouter
