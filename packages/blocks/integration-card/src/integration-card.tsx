import { Avatar } from "@kopexa/avatar";
import { Button } from "@kopexa/button";
import { Card } from "@kopexa/card";
import { Chip } from "@kopexa/chip";
import { Heading } from "@kopexa/heading";
import { ExternalLinkIcon, GlobeIcon, IntegrationIcon } from "@kopexa/icons";
import {
	type ChipVariantProps,
	type IntegrationCardSlots,
	integrationCard,
	type SlotsToClasses,
} from "@kopexa/theme";
import { type ComponentProps, isValidElement } from "react";

export type IntegrationStatus =
	| "CONNECTED"
	| "ERROR"
	| "PENDING"
	| "DISCONNECTED";

export type Integration = {
	id: string;
	isSaaS: boolean;
	name: string;
	version: string;
	website?: string | null;
	logoUrl?: string | null;
	labels?: Array<string> | null;
	category: string;
	categories: Array<string>;
	description?: string | null;
	supportsOAuth: boolean;
	capabilities: Array<string>;
};

type BaseProps = {
	/**
	 * The integration object containing details about the integration.
	 */
	integration: Integration;
	onConnect?: () => void;
	/**
	 * Callback for managing the integration.
	 * This can be a URL or a function that opens a management interface.
	 */
	onManage?: React.ReactNode | (() => void);
	status: IntegrationStatus;
	translations?: {
		manage?: string;
		connect?: string;
		website?: string;
	};
	classNames?: SlotsToClasses<IntegrationCardSlots>;
};

export type IntegrationCardProps = ComponentProps<"div"> & BaseProps;

const statusMap: Record<
	IntegrationStatus,
	{
		label: string;
		indicatorColor: ChipVariantProps["indicatorColor"];
	}
> = {
	CONNECTED: {
		label: "Connected",
		indicatorColor: "default",
	},
	ERROR: {
		label: "Error",
		indicatorColor: "warning",
	},
	PENDING: {
		label: "Pending",
		indicatorColor: "destructive",
	},
	DISCONNECTED: {
		label: "Disconnected",
		indicatorColor: "success",
	},
};

export const IntegrationCard = (props: IntegrationCardProps) => {
	const {
		className,
		onManage,
		onConnect,
		integration,
		status,
		translations,
		classNames,
		...rest
	} = props;

	const styles = integrationCard({
		className,
	});

	const statusInfo = statusMap[status || "DISCONNECTED"];

	return (
		<Card.Root
			className={styles.root({
				className: classNames?.root,
			})}
			aria-labelledby={`integration-${integration.id}`}
			{...rest}
		>
			<Card.Header
				className={styles.header({
					className: classNames?.header,
				})}
			>
				<div
					className={styles.headerContent({
						className: classNames?.headerContent,
					})}
				>
					{/* Logo and Name */}
					<div
						className={styles.logoAndName({
							className: classNames?.logoAndName,
						})}
					>
						<Avatar
							src={integration.logoUrl}
							alt={integration.name}
							name={integration.name}
							size="sm"
							radius="sm"
							fallback={<IntegrationIcon />}
						/>
					</div>
					<div
						className={styles.headingContainer({
							className: classNames?.headingContainer,
						})}
					>
						<Heading
							id={`integration-${integration.id}`}
							level="h3"
							className={styles.heading({
								className: classNames?.heading,
							})}
						>
							{integration.name}
						</Heading>
						<Chip variant="bordered" color="success">
							{integration.category}
						</Chip>
					</div>
				</div>
				<div
					className={styles.statusIndicatorContainer({
						className: classNames?.statusIndicatorContainer,
					})}
				>
					<Chip
						size="sm"
						indicator
						indicatorVariant="pulse"
						indicatorColor={statusInfo.indicatorColor}
						variant="bordered"
					>
						{statusInfo.label}
					</Chip>
				</div>
			</Card.Header>
			<Card.Body>
				{integration.description && (
					<p
						className={styles.description({
							className: classNames?.description,
						})}
					>
						{integration.description}
					</p>
				)}
				{/* Tags */}
				<div
					className={styles.tagsContainer({
						className: classNames?.tagsContainer,
					})}
				>
					{integration?.categories.map((category) => (
						<Chip key={category} variant="bordered">
							{category}
						</Chip>
					))}
					{integration.labels?.map((l) => (
						<Chip key={`label-${l}`} variant="bordered">
							{l}
						</Chip>
					))}
					{integration.isSaaS && <Chip variant="bordered">SaaS</Chip>}
					{integration.supportsOAuth && (
						<Chip variant="bordered" color="success">
							OAuth
						</Chip>
					)}
				</div>
			</Card.Body>
			<Card.Footer
				className={styles.footer({
					className: classNames?.footer,
				})}
			>
				<span
					className={styles.version({
						className: classNames?.version,
					})}
				>
					v{integration.version}
				</span>
				<div
					className={styles.websiteContainer({
						className: classNames?.websiteContainer,
					})}
				>
					{integration.website && (
						<a
							href={integration.website}
							target="_blank"
							rel="noreferrer"
							className={styles.websiteLink({
								className: classNames?.websiteLink,
							})}
							aria-label={`${integration.name} website`}
						>
							<GlobeIcon
								className={styles.websiteIcons({
									className: classNames?.websiteIcons,
								})}
								aria-hidden
							/>
							{translations?.website || "Website"}
							<ExternalLinkIcon
								className={styles.websiteIcons({
									className: classNames?.websiteIcons,
								})}
								aria-hidden
							/>
						</a>
					)}

					{status === "CONNECTED" ? (
						isValidElement(onManage) && typeof onManage === "object" ? (
							onManage
						) : typeof onManage === "function" ? (
							<Button type="button" onClick={() => onManage?.()}>
								{translations?.manage || "Manage"}
							</Button>
						) : null
					) : (
						<Button type="button" color="success" onClick={() => onConnect?.()}>
							{translations?.connect || "Connect"}
						</Button>
					)}
				</div>
			</Card.Footer>
		</Card.Root>
	);
};
