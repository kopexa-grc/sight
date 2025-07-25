/** biome-ignore-all lint/suspicious/noExplicitAny: utility file */

export interface DOMElement extends Element, HTMLOrSVGElement {}

type DataAttributes = {
	[dataAttr: string]: any;
};

export type DOMAttributes<T = DOMElement> = React.AriaAttributes &
	React.DOMAttributes<T> &
	DataAttributes & {
		id?: string;
		role?: React.AriaRole;
		tabIndex?: number;
		style?: React.CSSProperties;
	};

export type Merge<M, N> = N extends Record<string, unknown>
	? M
	: Omit<M, keyof N> & N;

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes> = (
	props?: Merge<DOMAttributes, P>,
	ref?: React.Ref<any>,
) => R & React.RefAttributes<any>;

export type RemovedProps =
	| "asChild"
	| "defaultChecked"
	| "defaultValue"
	| "color";

// Omits the specified props from the component props. Autocomplete will suggest props
// of the component, but won't restrict the omittable props to those that actually exist.
export type ComponentPropsWithout<
	T extends React.ElementType,
	O extends
		| Omit<string, keyof React.ComponentProps<T>>
		| keyof React.ComponentProps<T>,
> = Omit<React.ComponentProps<T>, O & string>;
