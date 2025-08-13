import { tv, type VariantProps } from "tailwind-variants";
import { chip } from "./chip";

export const standardChip = tv({
	extend: chip,
	slots: {
		root: [
			"inline-flex",
			"gap-1",
			"items-center",
			"rounded-full",
			"border border-border text-xs font-semibold transition-colors focus:outline-hidden h-fit shrink-0",
		],
		hexagon: [
			"size-2.5 bg-[currentColor] [clip-path:polygon(50%_0%,95%_25%,95%_75%,50%_100%,5%_75%,5%_25%)]",
		],
	},
	variants: {
		standard: {
			"ISO 27001": {
				hexagon: "text-standard-iso27001",
			},
			"ISO/IEC 27001:2017": {
				hexagon: "text-standard-iso27001",
			},
			"ISO 9001": {
				hexagon: "text-standard-iso9001",
			},
			"ISO 14001": {
				hexagon: "text-standard-iso14001",
			},
			"NIS 2": {
				hexagon: "text-standard-nis2",
			},
			"NIST 800-53": {
				hexagon: "text-standard-nist80053",
			},
			"NIST CSF": {
				hexagon: "text-standard-nistcsf",
			},
			"SOC 2": {
				hexagon: "text-standard-soc2",
			},
			"NIST SSDF": {
				hexagon: "text-standard-nistssdf",
			},
			GDPR: {
				hexagon: "text-standard-gdpr",
			},
			"CIS Benchmarks": {
				hexagon: "text-standard-cis",
			},
			CCM: {
				hexagon: "text-standard-ccm",
			},
			HIPAA: { hexagon: "text-standard-hipaa" },
			HIPPA: { hexagon: "text-standard-hipaa" }, // alias for common misspelling
			SOX: {
				hexagon: "text-standard-sox",
			},
			/* EU & DE add-ons */
			DORA: { hexagon: "text-standard-dora" },
			"Cyber Resilience Act": { hexagon: "text-standard-cra" },
			"EU AI Act": { hexagon: "text-standard-eu-aiact" },
			"eIDAS 2.0": { hexagon: "text-standard-eidas2" },
			"BSI IT-Grundschutz": { hexagon: "text-standard-bsi-itg" },
			"KRITIS / IT-SiG 2.0": { hexagon: "text-standard-kritis" },
			"BSI C5": { hexagon: "text-standard-bsi-c5" },

			/* Industry & extended ISO */
			TISAX: { hexagon: "text-standard-tisax" },
			"PCI DSS": { hexagon: "text-standard-pci-dss" },
			"IEC 62443": { hexagon: "text-standard-iec-62443" },
			"ISO 27701": { hexagon: "text-standard-iso27701" },
			"ISO 27017": { hexagon: "text-standard-iso27017" },
			"ISO 27018": { hexagon: "text-standard-iso27018" },
			"ISO 22301": { hexagon: "text-standard-iso22301" },
			"ISO 20000-1": { hexagon: "text-standard-iso20000-1" },

			CUSTOM: {
				hexagon: "text-standard-custom",
			},
		},
	},
	defaultVariants: {
		standard: "CUSTOM",
	},
});

export type StandardChipVariants = VariantProps<typeof standardChip>;
