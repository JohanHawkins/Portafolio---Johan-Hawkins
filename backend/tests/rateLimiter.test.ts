import { describe, expect, it } from 'vitest'
import type { NextFunction, Request, Response } from 'express'
import { rateLimiter } from '../src/middleware/rateLimiter'

function makeReqRes(ip: string) {
  const req = { ip } as Request
  const res = {
    statusCode: 0,
    status(code: number) {
      ;(this as unknown as Response).statusCode = code
      return this
    },
    json() {
      return this
    },
  } as unknown as Response
  const next = (() => {}) as NextFunction
  return { req, res, next }
}

describe('rateLimiter', () => {
  it('permite hasta maxRequests solicitudes', () => {
    const { req, res, next } = makeReqRes('10.0.0.1')
    const limiter = rateLimiter(2, 60000)

    limiter(req, res, next)
    expect(res.statusCode).toBe(0)

    limiter(req, res, next)
    expect(res.statusCode).toBe(0)
  })

  it('devuelve 429 al superar maxRequests', () => {
    const { req, res, next } = makeReqRes('10.0.0.2')
    const limiter = rateLimiter(2, 60000)

    limiter(req, res, next)
    limiter(req, res, next)
    limiter(req, res, next)

    expect(res.statusCode).toBe(429)
  })

  it('reinicia el contador tras la ventana de tiempo', async () => {
    const limiter = rateLimiter(1, 50)
    const first = makeReqRes('10.0.0.3')

    limiter(first.req, first.res, first.next)
    limiter(first.req, first.res, first.next)
    expect(first.res.statusCode).toBe(429)

    await new Promise((resolve) => setTimeout(resolve, 90))

    const second = makeReqRes('10.0.0.3')
    limiter(second.req, second.res, second.next)
    expect(second.res.statusCode).toBe(0)
  })
})
