import { PageLayout } from "@kopexa/sight";
import { pageLayout } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Layout And Structure/PageLayout",
	component: PageLayout.Root,
	argTypes: {
		gap: {
			control: {
				type: "select",
			},
			options: ["none", "condensed", "normal"],
		},
		width: {
			control: {
				type: "select",
			},
			options: ["full", "md", "lg", "xl"],
		},
		paneWidth: {
			control: {
				type: "select",
			},
			options: ["sm", "md", "lg"],
		},
		spacing: {
			control: {
				type: "select",
			},
			options: ["none", "condensed", "normal"],
		},
	},
} as Meta<PageLayout.RootProps>;

const defaultProps = {
	...pageLayout.defaultVariants,
	spacing: "none",
};

const Placeholder = ({
	className,
	children = "Placeholder",
}: {
	className?: string;
	children?: React.ReactNode;
}) => (
	<div
		className={`${className} w-full grid place-content-center rounded-md border bg-muted`}
	>
		{children}
	</div>
);

const Template = (args: PageLayout.RootProps) => (
	<PageLayout.Root {...args}>
		<PageLayout.Header>
			<Placeholder className="h-[64px]" />
		</PageLayout.Header>
		<PageLayout.Content>
			<Placeholder className="h-[400px]">Content</Placeholder>
		</PageLayout.Content>
		<PageLayout.Pane sticky>
			<Placeholder className="h-[200px]">Pane</Placeholder>
		</PageLayout.Pane>
		<PageLayout.Footer>
			<Placeholder className="h-[64px]" />
		</PageLayout.Footer>
	</PageLayout.Root>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};

export const StickyPane = (args: PageLayout.RootProps) => (
	<PageLayout.Root spacing="none" width="full" {...args}>
		<PageLayout.Header>
			<Placeholder className="h-[64px]" />
		</PageLayout.Header>
		<PageLayout.Content>
			<div className="grid gap-3">
				{Array.from({ length: 50 }).map((_, i) => {
					const testId = `content${i}`;

					return (
						<p key={i.toString()}>
							<span data-testid={testId}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
								enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
								ante quam, at varius lorem molestie vel. Sed at eros consequat,
								varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
								commodo. Phasellus at imperdiet risus. Donec sit amet massa
								purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus
								felis. Ut porttitor auctor tellus in imperdiet. Ut blandit
								tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum
								auctor euismod nisi. Nullam tincidunt est in mi tincidunt
								dictum. Sed consectetur aliquet velit ut ornare.
							</span>
						</p>
					);
				})}
			</div>
		</PageLayout.Content>
		<PageLayout.Pane sticky>
			<div className="grid gap-3">
				{Array.from({ length: 10 }).map((_, i) => {
					const testId = `content${i}`;

					return (
						<p key={i.toString()}>
							<span data-testid={testId}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at
								enim id lorem tempus egestas a non ipsum. Maecenas imperdiet
								ante quam, at varius lorem molestie vel. Sed at eros consequat,
								varius tellus et, auctor felis. Donec pulvinar lacinia urna nec
								commodo. Phasellus at imperdiet risus. Donec sit amet massa
								purus. Nunc sem lectus, bibendum a sapien nec, tristique tempus
								felis. Ut porttitor auctor tellus in imperdiet. Ut blandit
								tincidunt augue, quis fringilla nunc tincidunt sed. Vestibulum
								auctor euismod nisi. Nullam tincidunt est in mi tincidunt
								dictum. Sed consectetur aliquet velit ut ornare.
							</span>
						</p>
					);
				})}
				<p>Donec sit amet massa purus. Plura de lorem Ispum.</p>
			</div>
		</PageLayout.Pane>
		<PageLayout.Footer>
			<Placeholder className="h-[64px]" />
		</PageLayout.Footer>
	</PageLayout.Root>
);
