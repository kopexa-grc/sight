import {
	ArrowRightIcon,
	EqualsIcon,
	InfoIcon,
	IntersectIcon,
	PartialIcon,
	SubsetIcon,
	SupersetIcon,
} from "@kopexa/icons";
import { Button, Chip, StandardRow, Tooltip } from "@kopexa/sight";
import type { Meta } from "@storybook/react";
import { useState } from "react";

const meta = {
	title: "Experiments/Mapped Control Card",
	parameters: {
		layout: "centered",
	},
	argTypes: {
		density: {
			control: {
				type: "radio",
			},
			options: ["regular", "compact"],
			defaultValue: "regular",
			description: "Density of the card layout",
		},
	},
} satisfies Meta;

export default meta;

type MappingType = "EQUAL" | "INTERSECT" | "PARTIAL" | "SUBSET" | "SUPERSET";

export interface ControlMapping {
	id: string; // stable id for the mapping
	from: Record<string, string[]>; // framework -> control ids (source)
	to: Record<string, string[]>; // framework -> control ids (targets)
	type: MappingType;
	confidence: number; // 0..1
	relation: string; // label for UI (e.g., "Related", "Aligned", "Broader", "Narrower")
	notes?: string;
}

const demoC5Mappings: ControlMapping[] = [
	{
		id: "C5:OIS-01",
		from: {
			"BSI C5:2020": ["OIS-01"], // ISMS requirement in C5
		},
		to: {
			"ISO/IEC 27001:2017": ["4.3", "6.1.3", "9.3"], // Scope, SoA, Management review (SN "0")
			"CSA CCM 3.0.1": ["GRM-03", "GRM-04"], // (no SN given → treat as PARTIAL)
			"AICPA TSC 2017": ["CC1.1", "CC1.2", "CC3.1", "CC3.2", "CC4.1"], // (no SN → PARTIAL)
			"BSI IT-Grundschutz 2019": ["ISMS.1.A1", "ISMS.1.A9"], // (SN "0")
		},
		type: "INTERSECT", // mehrere Referenzen decken OIS-01 ab, aber nicht 1:1 in einer Normstelle
		confidence: 0.9,
		relation: "Related",
		notes:
			'SN "0" zu ISO 27001 & IT-Grundschutz → gleichwertiges Niveau; übrige als PARTIAL interpretiert.',
	},
	{
		id: "C5:OIS-02",
		from: {
			"BSI C5:2020": ["OIS-02"], // Security policy (top management)
		},
		to: {
			"ISO/IEC 27001:2017": ["6.2", "A.5.1.1", "A.6.1.1"], // (SN "0")
			"CSA CCM 3.0.1": ["GRM-05", "GRM-06"], // (SN "0" im Auszug angegeben → EQUAL)
			"AICPA TSC 2017": ["CC2.2", "CC2.3"], // (no SN → PARTIAL)
			"ISO/IEC 27017:2015": ["5.1.1", "6.1.1"], // (SN "0")
			"ISO/IEC 27018:2014": ["5.1.1", "6.1.1"], // (SN "0")
			"BSI IT-Grundschutz 2019": ["ISMS.1.A3", "OPS.2.2.A2"], // (SN "0")
		},
		type: "EQUAL", // überwiegend SN "0" → gleichwertig; Rest partiell, aber Kernanforderung deckt sich
		confidence: 0.85,
		relation: "Equivalent",
		notes:
			'Leitlinie Informationssicherheit: umfangreiches SN "0" → praktisch gleichwertig.',
	},
	{
		id: "C5:OIS-03",
		from: {
			"BSI C5:2020": ["OIS-03"], // Interfaces & dependencies with third parties
		},
		to: {
			"ISO/IEC 27001:2017": ["6.1.1", "6.1.2", "CLD.6.3.1", "A.7.1"], // gemischt/ohne SN → PARTIAL
			"CSA CCM 3.0.1": [
				"HRS-07",
				"SEF-01",
				"SEF-03",
				"GRM-03",
				"GRM-05",
				"GRM-06",
				"STA-05",
				"BCR-10",
				"CC1.1",
				"CC1.2",
				"CC2.2",
				"CC2.3",
				"CC2.4",
				"CC2.5",
				"CC2.6", // SN "+" → CCM geht über C5 hinaus
			],
			"TCDP v1.0": ["#1.7"], // referenziert (ohne SN) → PARTIAL
			"ISO/IEC 27017:2015": ["6.1.1", "6.1.2", "CLD.6.3.1"], // (ohne SN) → PARTIAL
			"ISO/IEC 27018:2014": ["6.1.1", "6.1.2", "CLD.6.3.1", "A.7.1"], // (ohne SN) → PARTIAL
			"BSI IT-Grundschutz 2019": [
				"ORP.1.A1",
				"ORP.1.A2",
				"CON.6.A1",
				"OPS.2.2.A3",
			], // (ohne SN) → PARTIAL
		},
		// Da CCM teils mit SN "+" bewertet ist (geht über C5 hinaus),
		// ist C5 hier eine Teilmenge dessen → SUBSET (aus Perspektive C5 → Ziel)
		type: "SUBSET",
		confidence: 0.8,
		relation: "Narrower",
		notes:
			'SN "+" bei mehreren CCM-Referenzen → CCM ist strenger/umfassender; C5 ist hier Teilmenge.',
	},
];

type CardDensity = "regular" | "compact";

function MappedControlCard({
	data,
	density = "regular",
}: {
	data: ControlMapping;
	density?: CardDensity;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
}) {
	const shell =
		density === "regular"
			? "rounded-xl border bg-card shadow-sm"
			: "rounded-lg bg-transparent";

	const blockPad = density === "regular" ? "p-3" : "p-2";
	const gridGap = density === "regular" ? "gap-4" : "gap-2";

	return (
		<section className={shell} aria-labelledby={`mapping-${data.id}`}>
			{/* Header */}
			<header
				className={`flex items-center justify-between gap-3 border-b px-4 ${density === "regular" ? "py-3" : "py-2"}`}
			>
				<div className="flex min-w-0 items-center gap-3">
					<h3
						id={`mapping-${data.id}`}
						className="truncate font-semibold text-foreground"
					>
						Mapping: {data.id}
					</h3>
					<MappingMetaPill
						type={data.type}
						confidence={data.confidence}
						relation={data.relation}
					/>
				</div>
			</header>
			{/* Body */}
			<div
				className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] ${gridGap} p-4`}
			>
				{/* FROM */}
				<div className={`rounded-lg border ${blockPad}`}>
					<div className="mb-2 flex items-center justify-between">
						<span className="text-sm font-medium text-muted-foreground">
							From
						</span>
					</div>
					<div>
						{Object.entries(data.from).map(([fw, codes]) => (
							<StandardRow
								key={`from:${fw}`}
								standard={fw}
								codes={codes}
								mappingType={data.type}
								relation={data.relation}
							/>
						))}
					</div>
				</div>

				{/* Connector */}
				<div className="hidden md:flex items-center justify-center">
					<div className="flex flex-col items-center gap-2">
						<ArrowRightIcon className="size-5 text-muted-foreground" />
						<span className="text-xs text-muted-foreground">maps to</span>
					</div>
				</div>

				{/* TO */}
				<div className={`rounded-lg border ${blockPad}`}>
					<div className="mb-2 flex items-center justify-between">
						<span className="text-sm font-medium text-muted-foreground">
							To
						</span>
					</div>
					<div>
						{Object.entries(data.to).map(([fw, codes]) => (
							<StandardRow
								key={`to:${fw}`}
								standard={fw}
								codes={codes}
								mappingType={data.type}
								relation={data.relation}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Notes */}
			{data.notes ? (
				<div className="border-t px-4 py-3">
					<details className="group">
						<summary className="flex cursor-pointer list-none items-center gap-2 text-sm text-muted-foreground marker:hidden">
							<InfoIcon className="size-4 opacity-70" />
							<span className="font-medium">Notes</span>
							<span className="ml-auto text-xs group-open:hidden">Show</span>
							<span className="ml-auto text-xs hidden group-open:inline">
								Hide
							</span>
						</summary>
						<p className="mt-2 whitespace-pre-line text-sm leading-relaxed">
							{data.notes}
						</p>
					</details>
				</div>
			) : null}
		</section>
	);
}

function MappingLegend() {
	return (
		<div className="flex flex-wrap gap-2 text-xs">
			{Object.entries(mappingTypeMeta).map(([key, meta]) => (
				<span
					key={key}
					className="inline-flex items-center gap-1 rounded-full border px-2 py-1"
				>
					<meta.Icon className={`${meta.tone} size-3.5`} />
					<span className="text-muted-foreground">{meta.label}</span>
				</span>
			))}
		</div>
	);
}

export const MappedControlCardDemo = (args: {
	density: "regular" | "compact";
}) => {
	const [i, setI] = useState(0);
	const curr = demoC5Mappings[i];

	return (
		<div className="w-full max-w-5xl space-y-4">
			<div className="flex items-center justify-between">
				<div className="text-sm text-muted-foreground">
					Demo: <span className="font-medium">{curr.id}</span>
				</div>
				<div className="flex gap-2">
					<Button
						size="sm"
						variant="ghost"
						onClick={() => setI((p) => (p + 2) % 3)}
					>
						Prev
					</Button>
					<Button size="sm" onClick={() => setI((p) => (p + 1) % 3)}>
						Next
					</Button>
				</div>
			</div>
			<MappingLegend />
			<MappedControlCard data={curr} density={args.density} />
		</div>
	);
};

/** Mapping Type → icon, tone, label */
const mappingTypeMeta: Record<
	MappingType,
	// biome-ignore lint/suspicious/noExplicitAny: its a story
	{ label: string; Icon: React.ComponentType<any>; tone: string; ring: string }
> = {
	EQUAL: {
		label: "Equal",
		Icon: EqualsIcon,
		tone: "text-emerald-600",
		ring: "border-emerald-200",
	},
	INTERSECT: {
		label: "Intersect",
		Icon: IntersectIcon,
		tone: "text-indigo-600",
		ring: "border-indigo-200",
	},
	PARTIAL: {
		label: "Partial",
		Icon: PartialIcon,
		tone: "text-amber-600",
		ring: "border-amber-200",
	},
	SUBSET: {
		label: "Subset",
		Icon: SubsetIcon,
		tone: "text-blue-600",
		ring: "border-blue-200",
	},
	SUPERSET: {
		label: "Superset",
		Icon: SupersetIcon,
		tone: "text-fuchsia-600",
		ring: "border-fuchsia-200",
	},
};

/** Pill for mapping meta (type + confidence + relation) */
function MappingMetaPill({
	type,
	confidence,
	relation,
}: {
	type: MappingType;
	confidence: number;
	relation: string;
}) {
	const { Icon, label, tone, ring } = mappingTypeMeta[type];
	const value = Math.round(Math.max(0, Math.min(1, confidence)) * 100);

	return (
		<div className="flex items-center gap-3">
			<Chip
				variant="bordered"
				size="md"
				startContent={<Icon />}
				className={`${tone} ${ring}`}
			>
				{label}
			</Chip>

			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<div className="relative h-2 w-28 rounded-full bg-muted/60 overflow-hidden">
					<div
						className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width]"
						style={{ width: `${value}%` }}
						aria-hidden
					/>
				</div>
				<span className="tabular-nums">{value}%</span>
				<Tooltip content="Confidence of mapping (heuristic/curated)">
					<InfoIcon className="size-3.5 opacity-70" />
				</Tooltip>
			</div>

			<div
				className="text-xs text-muted-foreground truncate max-w-[10rem]"
				title={relation}
			>
				{relation}
			</div>
		</div>
	);
}
