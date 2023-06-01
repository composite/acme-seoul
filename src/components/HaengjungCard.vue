<script lang="ts" setup>
import { type Ref, inject, onMounted, ref, onBeforeUnmount } from 'vue';

const props = defineProps({
	locId: Number,
	locTitle: String,
	locJuso: String,
	locTel: String,
})
const emit = defineEmits(['click'])
const li = ref<HTMLLIElement>()
const io = inject<Ref<IntersectionObserver | undefined>>('HaengjungIO')
onMounted(() => {
	if (li.value) {
		li.value.dataset.id = String(props.locId)
		io?.value?.observe(li.value)
	}
})
onBeforeUnmount(() => {
	li.value && io?.value?.unobserve(li.value)
})
</script>
<template>
	<li class="rounded-lg bg-white border border-gray-500 flex-shrink-0 w-64 flex snap-center cursor-pointer opacity-90 hover:bg-slate-100" @click="e => emit('click', e)" ref="li">
		<figure class="m-2 p-1 rounded-md border border-gray-500">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 20 20"><path fill="#000000" d="M6 10V8h8v2H6Zm11-4.085A1.5 1.5 0 0 0 16.5 3h-13A1.5 1.5 0 0 0 3 5.915V16.5a.5.5 0 0 0 .5.5H5v-4.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .456.294A1.99 1.99 0 0 1 11 12h6V5.915ZM3.5 4h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1ZM5 7.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-3ZM9 13v4H6v-4h3Zm8.5 0a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5v-3a1.5 1.5 0 0 1 1.5-1.5h6Zm0 5a.5.5 0 0 1 .5-.5v-1a1.5 1.5 0 0 0-1.5 1.5h1Zm.5-3.5a.5.5 0 0 1-.5-.5h-1a1.5 1.5 0 0 0 1.5 1.5v-1Zm-6.5-.5a.5.5 0 0 1-.5.5v1a1.5 1.5 0 0 0 1.5-1.5h-1Zm-.5 3.5a.5.5 0 0 1 .5.5h1a1.5 1.5 0 0 0-1.5-1.5v1Zm3.5-3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3Z"></path></svg>
		</figure>
		<article class="flex-1 m-2">
			<h4 class="text-lg">{{ props.locTitle }}</h4>
			<p class="w-[calc(64%)] text-ellipsis overflow-hidden whitespace-nowrap text-sm" :title="props.locJuso">{{ props.locJuso }}</p>
			<a :data-href="`tel:${props.locTel}`">{{ props.locTel }}</a>
		</article>
	</li>
</template>
