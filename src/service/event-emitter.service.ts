import EventEmitter from 'eventemitter3'

const eventEmitter = new EventEmitter()

export enum EventEmitterEvents {
  COUNTRY_LOADED = 'COUNTRY_LOADED',
  STATE_LOADED = 'STATE_LOADED',
  CITY_LOADED = 'CITY_LOADED'
}

const EmitterService = {
  on: (eventName: EventEmitterEvents, fn: any) => eventEmitter.on(eventName, fn),
  once: (eventName: EventEmitterEvents, fn: any) => eventEmitter.once(eventName, fn),
  off: (eventName: EventEmitterEvents, fn: any) => eventEmitter.off(eventName, fn),
  emit: (eventName: EventEmitterEvents, payload: any) => eventEmitter.emit(eventName, payload)
}

Object.freeze(EmitterService)

export default EmitterService
