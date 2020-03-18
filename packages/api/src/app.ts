import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as fs from 'fs-extra'
import * as path from 'path'
import * as process from 'process'
import * as passport from 'passport'

import { JwtPassportStrategy } from './config/passport'

import { errorsMiddleware } from '@owliehq/http-errors'

export class App {
  /**
   *
   */
  private controllers: any[] = []

  /**
   *
   */
  private get commonMiddlewares() {
    return [bodyParser.json(), bodyParser.urlencoded({ extended: false }), passport.initialize()]
  }

  /**
   *
   * @param controller
   */
  public registerController(controller: any) {
    this.controllers.push(controller)
  }

  /**
   *
   */
  public get native() {
    const app = express()

    app.use(this.commonMiddlewares)

    this.controllers.forEach((controller: any) => {
      app.use(controller.path, controller.router)
    })

    app.use(errorsMiddleware({ debugServer: false }))
    return app
  }

  /**
   *
   */
  public async loadControllers(subPath?: string) {
    if (this.controllers.length) throw new Error('Controllers are already set')

    /* istanbul ignore next */
    const srcPath = subPath || 'src'

    const promises = fs
      .readdirSync(path.resolve(process.cwd(), srcPath, 'controllers'))
      .map((file: string) => import(path.resolve(process.cwd(), srcPath, 'controllers', file)))

    return Promise.all(promises)
  }

  /**
   *
   * @param options
   */
  public async initNativeApp(options?: any): Promise<express.Application> {
    this.reset()
    passport.use(JwtPassportStrategy(options.passport))
    await this.loadControllers(options?.subPath)
    return this.native
  }

  /**
   *
   */
  public reset() {
    this.controllers = []
  }

  /**
   *
   */
  /* istanbul ignore next */
  public async start(options?: any) {
    const app = await this.initNativeApp(options)

    app.listen(3000, () => {
      console.log('server is up')
    })
  }
}
