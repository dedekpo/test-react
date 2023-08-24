import { useState } from "react";
import { University } from "./types";
import Search from "./components/Search";
import Results from "./components/Results";

export default function App() {
	const [search, setSearch] = useState("");
	const [universities, setUniversities] = useState<University[]>([]);

	return (
		<>
			<Search
				search={search}
				setSearch={setSearch}
				universitiesLenght={universities.length}
				setUniversities={setUniversities}
			/>
			<Results universities={universities} />
		</>
	);
}
