import type { Request, Response, NextFunction } from 'express'
import { getAllProjects } from '../services/projectService'

export async function getProjects(_req: Request, res: Response, next: NextFunction) {
  try {
    const projects = await getAllProjects()
    res.json(projects)
  } catch (err) {
    next(err)
  }
}
