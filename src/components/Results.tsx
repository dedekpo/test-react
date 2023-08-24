import { University } from "../types";

export default function Results({
	universities,
}: {
	universities: University[];
}) {
	return (
		<div className="flex flex-col gap-4 max-w-[80vw] md:max-w-[700px] max-h-[70vh] overflow-y-scroll mx-auto mb-2 px-4">
			{universities &&
				universities.map((university, index) => (
					<UniversityRow key={index} university={university} />
				))}
		</div>
	);
}

function UniversityRow({ university }: { university: University }) {
	return (
		<a
			href={university.web_pages[0]}
			target="_blank"
			rel="noreferrer"
			className="border-2 p-2 rounded-md flex items-center justify-between"
		>
			<span className="">{university.name}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-4 h-4"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
				/>
			</svg>
		</a>
	);
}
