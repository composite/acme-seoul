import { atom } from "nanostores";
import { nanoquery } from "@nanostores/query";
import type haengjung from "../../public/haengjung.json"

export type HaengjungRow = typeof haengjung[0]
export type HaengjungList = HaengjungRow[]

const [createFetcherStore] = nanoquery({
	fetcher: () => fetch('/haengjung.json').then(r => r.json())
})

export const $haengjung = createFetcherStore<HaengjungList>([])

export const $mapzoom = atom(13)
export const $mapcood = atom<[number, number]>([37.5412, 127.0063])
export const $id = atom<number | undefined>()
