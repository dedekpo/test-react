import { useEffect, useState } from "react";
import { Country, University } from "../types";
import { countries } from "../countries";

export default function Search({
	search,
	setSearch,
	universitiesLenght,
	setUniversities,
}: {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	universitiesLenght: number;
	setUniversities: React.Dispatch<React.SetStateAction<University[]>>;
}) {
	const [isSearching, setIsSearching] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [isError, setIsError] = useState(false);

	async function handleFetch(countryName?: string) {
		setIsSearching(true);
		handleBlur();
		try {
			const searchFilter = countryName || search;
			const response = await fetch(
				`https://test-api-production-3be5.up.railway.app/universities/${searchFilter}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			setUniversities(data);
			console.log("setting universities ", searchFilter, data.length);
			setIsError(false);
			setIsSearching(false);
		} catch (error) {
			setIsSearching(false);
			setIsError(true);
			setUniversities([]);
		}
	}

	async function handleSubmit(e: any) {
		e.preventDefault();
		await handleFetch();
	}

	function handleFocus() {
		setIsTyping(true);
	}

	function handleBlur() {
		setTimeout(() => {
			setIsTyping(false);
		}, 100);
	}

	return (
		<div
			className={`w-screen flex flex-col gap-4 items-center ${
				universitiesLenght > 0 ? "py-[50px]" : "pt-[40vh]"
			}`}
		>
			<h1 className="font-bold text-xl">Universities Search</h1>
			{isError && <p className="text-red-500">{"No country found :("}</p>}
			<form onSubmit={handleSubmit}>
				<div className="flex items-center gap-1">
					<div className="w-[20px]">
						{isSearching && (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4 animate-spin"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
								/>
							</svg>
						)}
					</div>
					<div className="relative">
						<input
							id="search"
							type="text"
							name="search"
							value={search}
							autoComplete="off"
							className="border-2 rounded-md px-2 py-1"
							placeholder="Insert country"
							disabled={isSearching}
							onChange={(e) => setSearch(e.target.value)}
							onFocus={handleFocus}
							onBlur={handleBlur}
						/>
						{isTyping && (
							<SearchField
								search={search}
								setSearch={setSearch}
								handleFetch={handleFetch}
							/>
						)}
					</div>
					<button type="submit" disabled={isSearching}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</button>
				</div>
			</form>
		</div>
	);
}

function SearchField({
	search,
	setSearch,
	handleFetch,
}: {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	handleFetch: (countryName: string) => void;
}) {
	const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

	useEffect(() => {
		setFilteredCountries(
			countries.filter((country) =>
				country.name.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [search]);

	return (
		<div className="absolute flex flex-col gap-2 border-2 w-full max-h-[300px] overflow-y-scroll bg-white">
			{filteredCountries.map((country, index) => (
				<div
					key={index}
					className="hover:bg-gray-100 p-2 cursor-pointer"
					onClick={() => {
						setSearch(country.name);
						handleFetch(country.name);
					}}
				>
					{country.name}
				</div>
			))}
		</div>
	);
}
