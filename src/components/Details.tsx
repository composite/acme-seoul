import { createPortal } from "react-dom"
import { $haengjung, $id, type HaengjungRow } from "../store/haengjung";
import { useStore } from "@nanostores/react";
import { MouseEventHandler, useEffect, useState } from "react";

export default function NorajoDetail() {
	const { data, loading } = useStore($haengjung)
	const id = useStore($id)
	const [row, setRow] = useState<HaengjungRow>()

	useEffect(() => {
		if (id !== undefined && !isNaN(+id) && data && data[+id]) {
			setRow(data[+id])
		}
	}, [id, data])

	const handleClick = () => {
		setRow(undefined)
		$id.set(undefined)
	}
	const handleOutsideClick: MouseEventHandler = e => {
		if (e.target === e.currentTarget) handleClick()
	}

	return (<>
		{row && createPortal(
			<section className="absolute inset-0 z-[10000] bg-black/50 p-4" onClick={handleOutsideClick}>
				<article className="rounded-md bg-white/90 w-full h-full max-w-3xl mx-auto flex flex-col">
					<nav className="">
						<a href="#" onClick={handleClick}>
							<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path fill="#000000" d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6Z"></path></svg>
						</a>
					</nav>
					<div className="flex-1 overflow-auto">
						<figure className="h-64 bg-gray-300 relative before:block before:absolute before:inset-0 before:opacity-50 before:bg-no-repeat before:bg-cover before:bg-[url:var(--bgurl)]" style={{ '--bgurl': `url('https://picsum.photos/seed/${id}/640/480')` } as any}>
						</figure>
						<div className="p-4">
							<h1 className="text-4xl">{ row.gg === '시청' ? row.c + '청' : `${row.c} ${row.gg}` }</h1>
							<p>{ row.c }{ row.gg === '시청' ? '의 시청' : ' 구내 행정복지센터' }</p>
							<ul className="p-2 flex flex-col gap-2">
								<li>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="inline-block mr-4"><path fill="#000000" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5z"></path></svg>
									{ row.js }
								</li>
								<li>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" className="inline-block mr-4"><path fill="#000000" d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608a17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42a18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"></path></svg>
									<a href={`tel:${row.tel}`} className="hover:underline">{ row.tel }</a>
								</li>
								<li>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="inline-block mr-4"><path fill="#000000" d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"></path></svg>
									<a href={row.url} className="hover:underline">{ row.url }</a>
								</li>
							</ul>
						</div>
					</div>
				</article>
			</section>
		, document.body)}
	</>)
}
