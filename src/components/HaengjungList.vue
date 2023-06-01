<script lang="ts" setup>
import { useStore } from '@nanostores/vue';
import HaengjungCard from './HaengjungCard.vue';
import { $haengjung, $mapzoom, $mapcood, $id, type HaengjungRow } from '../store/haengjung';
import { provide, ref, onMounted, onBeforeUnmount } from 'vue';

const haengjung = useStore($haengjung)
const ul = ref<HTMLUListElement>()
const io = ref<IntersectionObserver>()
provide('HaengjungIO', io)

onMounted(() => {
	let timeout: ReturnType<typeof setTimeout>
	io.value = new IntersectionObserver(entries => {
		const entry = entries.find(entry => entry.isIntersecting)
		if (entry) {
			if (timeout) clearTimeout(timeout)
			timeout = setTimeout(() => {
				timeout = 0
				const id = (entry.target as HTMLElement).dataset.id
				if (haengjung.value && haengjung.value.data && id) {
					const row = haengjung.value.data[+id]
					if (row) {
						$mapzoom.set(15)
						$mapcood.set([row.la, row.lo])
					}
				}
			}, 500)
		}
	}, {
		root: ul.value,
		threshold: 1.0,
	})
})
onBeforeUnmount(() => {
	io.value?.disconnect()
})

const handleClick = (i: number, row: HaengjungRow) => {
	$mapzoom.set(15)
	$mapcood.set([row.la, row.lo])
	$id.set(i)
}
</script>
<template>
	<ul class="flex gap-4 p-4 overflow-auto snap-x snap-mandatory" ref="ul">
		<HaengjungCard v-if="haengjung.data" v-for="(row, i) in haengjung.data" :loc-id="i" :loc-title="row.gg" :loc-juso="row.js" :loc-tel="row.tel" @click="() => handleClick(i, row)" />
	</ul>
</template>
