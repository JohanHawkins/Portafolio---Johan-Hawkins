import type { Request, Response, NextFunction } from 'express'

const requests = new Map<string, number>()

export function rateLimiter(maxRequests = 5, windowMs = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip ?? 'unknown'
    const now = Date.now()
    const count = requests.get(ip) ?? 0

    if (count >= maxRequests) {
      res.status(429).json({ error: 'Demasiadas solicitudes. Intenta de nuevo más tarde.' })
      return
    }

    requests.set(ip, count + 1)
    setTimeout(() => requests.delete(ip), windowMs)
    next()
  }
}
