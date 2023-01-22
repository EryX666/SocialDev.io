const units = {
	year: 24 * 60 * 60 * 1000 * 365,
	month: (24 * 60 * 60 * 1000 * 365) / 12,
	day: 24 * 60 * 60 * 1000,
	hour: 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000,
};

const rtf = new Intl.RelativeTimeFormat("en", {
	style: "long",
	numeric: "auto",
});

export function getRelativeTime(d1, d2 = new Date()) {
	if (typeof d1 === "string") d1 = new Date(d1);
	const elapsed = d1 - d2;

	// "Math.abs" accounts for both "past" & "future" scenarios
	for (const u in units) {
		if (Math.abs(elapsed) >= units[u] || u === "second") {
			const elapsedUnits = Math.round(elapsed / units[u]);
			const relativeTimeFormat = rtf.format(elapsedUnits, u);
			const tooltipDate = d1.toLocaleString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			});
			console.log(Math.abs(elapsedUnits), u, relativeTimeFormat);

			if (Math.abs(elapsedUnits) >= 7 && u === "day") {
				const visible = d1.toLocaleString("en-US", {
					month: "short",
					day: "numeric",
				});
				return { visible, tooltip: `${tooltipDate}` };
			} else if (Math.abs(elapsedUnits) >= 1 && u === "month") {
				const visible = d1.toLocaleString("en-US", {
					month: "short",
					day: "numeric",
				});
				return { visible, tooltip: `${tooltipDate}` };
			} else if (Math.abs(elapsedUnits) >= 1 && u === "year") {
				const visible = d1.toLocaleString("en-US", {
					year: "numeric",
					month: "short",
					day: "numeric",
				});
				return { visible, tooltip: `${tooltipDate}` };
			} else {
				return { visible: relativeTimeFormat, tooltip: `${tooltipDate}` };
			}
		}
	}
}

const dates = [
	"2022-12-25T17:34:38.918Z",
	"2022-12-25T17:30:58.918Z",
	"2022-12-25T16:00:58.918Z",
	"2022-12-23T16:00:58.918Z",
	"2022-12-18T16:12:58.918Z",
	"2022-11-01T19:25:49.514Z",
	"2021-12-01T19:25:49.514Z",
	"2021-12-01T19:25:49.514Z",
];

dates.forEach((d) => console.log(getRelativeTime(d)));
