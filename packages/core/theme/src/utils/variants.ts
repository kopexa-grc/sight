const solid = {
	default: "bg-accent/70 text-accent-foreground",
	primary: "bg-primary text-primary-foreground",
	secondary: "bg-secondary text-secondary-foreground",
	destructive: "bg-destructive text-destructive-foreground",
	warning: "bg-warning text-warning-foreground",
	success: "bg-success text-success-foreground",
};

const outline = {
	default: "bg-transparent border border-accent text-accent-foreground",
	primary: "bg-transparent border-primary text-primary",
	secondary: "bg-transparent border-secondary text-secondary-foreground",
	destructive: "bg-transparent border-destructive text-destructive",
	warning: "bg-transparent border-warning text-warning",
	success: "bg-transparent border-success text-success",
};

const flat = {
	default: "bg-accent/40 text-accent-700",
	primary: "bg-primary/20 text-primary-600",
	secondary: "bg-secondary/20 text-secondary-600",
	success: "bg-success/20 text-success-700 dark:text-success",
	warning: "bg-warning/20 text-warning-700 dark:text-warning",
	destructive: "bg-danger/20 text-danger-600 dark:text-danger-500",
	foreground: "bg-foreground/10 text-foreground",
};

const faded = {
	default: "border-default bg-accent/30 text-default-foreground",
	primary: "border-default bg-accent/30 text-primary",
	secondary: "border-default bg-accent/30 text-secondary-foreground",
	success: "border-default bg-accent/30 text-success",
	warning: "border-default bg-accent/30 text-warning",
	destructive: "border-default bg-accent/30 text-danger",
	foreground: "border-default bg-accent/30 text-foreground",
};

const ghost = {
	primary: "bg-transparent text-primary dark:text-primary-foreground",
	secondary: "bg-transparent text-secondary",
	destructive: "bg-transparent text-destructive",
	warning: "bg-transparent text-warning",
	success: "bg-transparent text-success",
};

export const colorVariants = {
	solid,
	ghost,
	outline,
	flat,
	faded,
};
