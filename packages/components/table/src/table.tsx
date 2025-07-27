import { Avatar } from "@kopexa/avatar";
import { Button } from "@kopexa/button";
import { ChevronRightIcon, PlusIcon } from "@kopexa/icons";
import { createContext, mergeRefs } from "@kopexa/react-utils";
import { callAllHandlers, cn, dataAttr } from "@kopexa/shared-utils";
import {
	type SlotsToClasses,
	type TableSlots,
	type TableVariantProps,
	table,
} from "@kopexa/theme";
import { useHover } from "@kopexa/use-hover";
import { type ComponentProps, useMemo, useRef } from "react";

type TableProviderContextValue = {
	styles: ReturnType<typeof table>;
	onRowClick?: () => void;
};

const [Provider, useTableContext] = createContext<TableProviderContextValue>(
	{},
);

type TableOptions = {
	/**
	 * Classname or List of classes to change the classNames of the element.
	 * if `className` is passed, it will be added to the base slot.
	 */
	classNames?: SlotsToClasses<TableSlots>;
	/**
	 * Fires when a user selects a row.
	 * @default undefined
	 */
	onRowClick?: () => void;
};

export interface TableRootProps
	extends Omit<ComponentProps<"table">, "color" | "size">,
		TableOptions,
		TableVariantProps {}

export const TableRoot = (props: TableRootProps) => {
	const {
		className,
		children,
		isSelectable,
		onRowClick,
		layout,
		fullWidth,
		overscroll,
		variant,
		bleed,
		classNames,
		...rest
	} = props;

	const styles = table({
		isSelectable,
		layout,
		fullWidth,
		variant,
		overscroll,
		bleed,
	});

	return (
		<Provider value={{ styles, onRowClick }}>
			<div className={styles.container({ className: classNames?.container })}>
				<div className={styles.wrapper({ className: classNames?.wrapper })}>
					<table
						className={styles.table({
							className: cn(className, classNames?.table),
						})}
						{...rest}
					>
						{children}
					</table>
				</div>
			</div>
		</Provider>
	);
};

export type TableHeadProps = ComponentProps<"thead">;

export function TableHead(props: TableHeadProps) {
	const { className, ...rest } = props;
	const { styles } = useTableContext();

	return (
		<thead
			data-slot="table-head"
			className={styles.thead({
				className,
			})}
			{...rest}
		/>
	);
}

export type TableBodyProps = ComponentProps<"tbody">;

export function TableBody(props: TableBodyProps) {
	const { className, ...rest } = props;
	const { styles } = useTableContext();

	return (
		<tbody
			data-slot="table-body"
			className={styles.tbody({
				className,
			})}
			{...rest}
		/>
	);
}

export type TableRowProps = ComponentProps<"tr"> & {
	isSelected?: boolean;
	hasSelect?: boolean;
	hasActions?: boolean;
};

export function TableRow(props: TableRowProps) {
	const {
		className,
		ref,
		isSelected = false,
		onClick,
		hasSelect,
		hasActions,
		...rest
	} = props;
	const { styles, onRowClick } = useTableContext();
	const innerRef = useRef<HTMLTableRowElement>(null);

	const isHover = useHover(innerRef);

	return (
		<tr
			data-slot="table-row"
			data-hover={dataAttr(isHover)}
			aria-selected={isSelected}
			className={styles.tr({
				className,
				hasSelect,
				hasActions,
			})}
			ref={mergeRefs(innerRef, ref)}
			onClick={callAllHandlers(onRowClick, onClick)}
			{...rest}
		/>
	);
}

export type TableHeaderCellProps = ComponentProps<"th"> & {
	isSelectCell?: boolean;
	isActionCell?: boolean;
	isStickyCell?: boolean;
};

export function TableHeaderCell(props: TableHeaderCellProps) {
	const { className, isSelectCell, isActionCell, isStickyCell, ...rest } =
		props;
	const { styles } = useTableContext();

	return (
		<th
			data-slot="table-header-cell"
			className={styles.th({
				className,
				isSelectCell,
				isActionCell,
				isStickyCell,
			})}
			{...rest}
		/>
	);
}

export type TableCellProps = ComponentProps<"td"> & {
	isSelectCell?: boolean;
	isActionCell?: boolean;
	isStickyCell?: boolean;
};

export function TableCell(props: TableCellProps) {
	const { className, isSelectCell, isActionCell, isStickyCell, ...rest } =
		props;
	const { styles } = useTableContext();

	return (
		<td
			data-slot="table-cell"
			className={styles.td({
				className,
				isSelectCell,
				isActionCell,
				isStickyCell,
			})}
			{...rest}
		/>
	);
}

export type TableOwnerCellValueProps = Omit<
	ComponentProps<"div">,
	"children" | "onClick"
> & {
	owner?: {
		firstName?: string;
		lastName?: string;
		name?: string;
		email?: string;
		avatar?: string;
	} | null;
	description?: string;
	translations?: {
		unassigned?: string;
		assignNow?: string;
	};
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const defaultOwnerTranslations = {
	unassigned: "Unassigned",
	assignNow: "Assign now",
};

export function TableOwnerCellValue({
	className,
	owner,
	description,
	onClick,
	translations,
	...rest
}: TableOwnerCellValueProps) {
	const { styles } = useTableContext();

	// get the name, use owner?.name if provided otherwise use firstName and lastName
	const ownerName = useMemo(() => {
		if (owner?.name) {
			return owner.name;
		}
		if (owner?.firstName && owner?.lastName) {
			return `${owner.firstName} ${owner.lastName}`;
		}
		return "";
	}, [owner]);

	const i18n = useMemo(() => {
		// merge default translations with provided translations
		return {
			...defaultOwnerTranslations,
			...translations,
		};
	}, [translations]);

	const hasOwner = useMemo(() => {
		return !!owner;
	}, [owner]);

	return (
		<div
			data-slot="table-owner-cell"
			className={styles.ownerCell({ className })}
			{...rest}
		>
			{hasOwner ? (
				<>
					<Avatar
						src={owner?.avatar}
						alt={owner?.name}
						name={ownerName}
						size="sm"
						className={styles.ownerCellAvatar()}
					/>
					<div className={styles.ownerCelltextWrapper()}>
						<span className={styles.ownerCellName()}>{ownerName}</span>
						<span className={styles.ownerCellDescription()}>
							{description ?? owner?.email}
						</span>
					</div>
				</>
			) : onClick ? (
				<Button
					onClick={onClick}
					variant="ghost"
					size="sm"
					startContent={<PlusIcon />}
					endContent={<ChevronRightIcon />}
				>
					{i18n.assignNow}
				</Button>
			) : (
				<span className={styles.ownerCellUnassigned()}>{i18n.unassigned}</span>
			)}
		</div>
	);
}
