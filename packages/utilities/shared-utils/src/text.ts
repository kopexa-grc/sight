export const safeText = (text: string): string => {
	if (text?.length <= 2) return text;

	return text?.slice(0, 2);
};

export const getInitials = (text: string): string => {
	if (!text) return "";

	const words = text.split(" ");
	if (words.length === 1) {
		return safeText(text);
	}

	const initials = words.map((word) => word.charAt(0).toUpperCase());
	// return only the first 2 letters
	if (initials.length > 2) {
		initials.length = 2;
	}
	return initials.join("");
};
