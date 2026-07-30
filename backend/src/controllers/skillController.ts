import type { Request, Response, NextFunction } from 'express'
import { getAllSkills } from '../services/skillService'

export async function getSkills(_req: Request, res: Response, next: NextFunction) {
  try {
    const skills = await getAllSkills()
    res.json(skills)
  } catch (err) {
    next(err)
  }
}
