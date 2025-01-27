/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

const IS_DEBUG_MODE: boolean = false

type AnyFunction = (...args: any[]) => any
type EmitFunction = (...args: any[]) => any

type LogSetup = {
  debugEnabled: boolean
  emit: EmitFunction
  log: AnyFunction
  info: AnyFunction
  warn: AnyFunction
  error: AnyFunction
  table: AnyFunction
  trace: AnyFunction
  group: AnyFunction
  groupCollapsed: AnyFunction
  groupEnd: AnyFunction
}

export const logger: LogSetup = {
  debugEnabled: IS_DEBUG_MODE,
  emit(method, ...logArguments) {
    if (this.debugEnabled) {
      // @ts-ignore
      !!console[method] && console[method](...logArguments)
      // @ts-check
    }
  },
  log(...args) {
    this.emit("log", ...args)
  },
  info(...args) {
    this.emit("info", ...args)
  },
  warn(...args) {
    this.emit("warn", ...args)
  },
  error(...args) {
    this.emit("error", ...args)
  },
  table(...args) {
    this.emit("table", ...args)
  },
  trace(...args) {
    this.emit("trace", ...args)
  },
  group(...args) {
    this.emit("group", ...args)
  },
  groupCollapsed(...args) {
    this.emit("groupCollapsed", ...args)
  },
  groupEnd(...args) {
    this.emit("groupEnd", ...args)
  },
}

export default logger
