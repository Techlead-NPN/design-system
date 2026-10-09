import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Fragment as Fragment$1, useEffect, useId, useRef, useState } from "react";
//#region src/button/Button.tsx
var base$4 = "inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-6 px-2 text-body-small-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo disabled:cursor-not-allowed disabled:text-disabled";
var sizes$3 = {
	sm: "h-6",
	md: "h-8"
};
var styles$2 = {
	primary: {
		default: "bg-secondary text-secondary inset-ring inset-ring-primary enabled:hover:bg-primary-hover",
		danger: "bg-danger text-primary-inverse enabled:hover:bg-danger-bolder",
		blue: "bg-accent-indigo text-primary-inverse enabled:hover:bg-accent-indigo-bolder"
	},
	outline: {
		default: "text-secondary inset-ring inset-ring-primary enabled:hover:bg-primary-hover",
		danger: "text-danger inset-ring inset-ring-danger enabled:hover:bg-danger-subtle",
		blue: "text-accent-indigo inset-ring inset-ring-accent-indigo enabled:hover:bg-accent-indigo-subtlest"
	},
	ghost: {
		default: "text-secondary enabled:hover:bg-primary-hover",
		danger: "text-danger enabled:hover:bg-danger-subtle",
		blue: "text-accent-indigo enabled:hover:bg-accent-indigo-subtlest"
	}
};
var shortcutTone = {
	default: {
		line: "border-primary-subtle",
		text: "text-tertiary"
	},
	danger: {
		line: "border-accent-blush",
		text: "text-accent-blush"
	},
	blue: {
		line: "border-accent-sky",
		text: "text-accent-indigo-subtle"
	}
};
var disabled = {
	primary: "disabled:bg-disabled disabled:inset-ring-0",
	outline: "disabled:inset-ring-primary",
	ghost: ""
};
function Button({ hierarchy = "primary", accent = "default", size = "md", prefixIcon, suffixIcon, shortcut, className = "", type = "button", children, ...rest }) {
	return /* @__PURE__ */ jsxs("button", {
		type,
		className: `${base$4} ${sizes$3[size]} ${styles$2[hierarchy][accent]} ${disabled[hierarchy]} ${className}`,
		...rest,
		children: [
			prefixIcon,
			children,
			suffixIcon,
			shortcut != null && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				className: `h-4 border-l ${shortcutTone[accent].line}`
			}), /* @__PURE__ */ jsx("span", {
				className: `text-support-caption ${rest.disabled ? "" : shortcutTone[accent].text}`,
				children: shortcut
			})] })
		]
	});
}
//#endregion
//#region src/button/IconButton.tsx
var base$3 = "inline-flex shrink-0 items-center justify-center rounded-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo disabled:cursor-not-allowed disabled:text-disabled";
var sizes$2 = {
	sm: "size-6",
	md: "size-8"
};
var styles$1 = {
	primary: "bg-accent-indigo text-primary-inverse enabled:hover:bg-accent-indigo-bolder disabled:bg-disabled",
	outline: "bg-primary text-secondary inset-ring inset-ring-primary enabled:hover:bg-primary-hover",
	ghost: "text-secondary enabled:hover:bg-primary-hover"
};
function IconButton({ variant = "ghost", size = "md", className = "", type = "button", children, ...rest }) {
	return /* @__PURE__ */ jsx("button", {
		type,
		className: `${base$3} ${sizes$2[size]} ${styles$1[variant]} ${className}`,
		...rest,
		children
	});
}
//#endregion
//#region src/selection/Checkbox.tsx
var box = "flex shrink-0 items-center justify-center rounded-4 border text-primary-inverse group-has-focus-visible:outline-2 group-has-focus-visible:outline-offset-2 group-has-focus-visible:outline-accent-indigo group-has-checked:border-transparent group-has-indeterminate:border-transparent group-has-disabled:border-disabled group-has-disabled:group-has-checked:border-transparent group-has-disabled:group-has-checked:bg-tertiary group-has-disabled:group-has-indeterminate:border-transparent group-has-disabled:group-has-indeterminate:bg-tertiary";
var tone$1 = {
	default: "border-primary group-has-checked:bg-accent-indigo group-has-indeterminate:bg-accent-indigo",
	error: "border-danger group-has-checked:bg-danger group-has-indeterminate:bg-danger"
};
function Checkbox({ children, labelSide = "right", indeterminate = false, error = false, size = 16, className = "", ref: outerRef, ...rest }) {
	const ref = useRef(null);
	const setRef = (node) => {
		ref.current = node;
		if (typeof outerRef === "function") outerRef(node);
		else if (outerRef) outerRef.current = node;
	};
	useEffect(() => {
		if (ref.current) ref.current.indeterminate = indeterminate;
	}, [indeterminate]);
	const label = children != null && /* @__PURE__ */ jsx("span", {
		className: "text-body-small-regular text-primary group-has-disabled:text-disabled",
		children
	});
	return /* @__PURE__ */ jsxs("label", {
		className: `group inline-flex items-center gap-2 has-disabled:cursor-not-allowed ${className}`,
		children: [
			labelSide === "left" && label,
			/* @__PURE__ */ jsx("input", {
				ref: setRef,
				type: "checkbox",
				"aria-invalid": error || void 0,
				className: "sr-only",
				...rest
			}),
			/* @__PURE__ */ jsxs("span", {
				className: `${box} ${size === 14 ? "size-3.5" : "size-4"} ${error ? tone$1.error : tone$1.default}`,
				children: [/* @__PURE__ */ jsx("svg", {
					viewBox: "0 0 8 6",
					className: "hidden h-1.5 w-2 group-has-checked:block group-has-indeterminate:hidden",
					fill: "none",
					"aria-hidden": "true",
					children: /* @__PURE__ */ jsx("path", {
						d: "M1 3l2 2 4-4",
						stroke: "currentColor",
						strokeWidth: "1.25",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}), /* @__PURE__ */ jsx("span", { className: "hidden h-0.5 w-2 rounded-infinite bg-primary group-has-indeterminate:block" })]
			}),
			labelSide === "right" && label
		]
	});
}
//#endregion
//#region src/selection/Radio.tsx
var circle = "flex size-4 items-center justify-center rounded-infinite border group-has-focus-visible/radio:outline-2 group-has-focus-visible/radio:outline-offset-2 group-has-focus-visible/radio:outline-accent-indigo group-has-checked/radio:border-transparent group-has-disabled/radio:border-disabled group-has-disabled/radio:group-has-checked/radio:border-transparent group-has-disabled/radio:group-has-checked/radio:bg-tertiary";
var tone = {
	default: "border-primary group-has-checked/radio:bg-accent-indigo",
	error: "border-danger group-has-checked/radio:bg-danger"
};
function Radio({ children, labelSide = "right", error = false, className = "", ...rest }) {
	const label = children != null && /* @__PURE__ */ jsx("span", {
		className: "text-body-small-regular text-primary group-has-disabled/radio:text-disabled",
		children
	});
	return /* @__PURE__ */ jsxs("label", {
		className: `group/radio inline-flex items-center gap-1 has-disabled:cursor-not-allowed ${className}`,
		children: [
			labelSide === "left" && label,
			/* @__PURE__ */ jsx("input", {
				type: "radio",
				"aria-invalid": error || void 0,
				className: "sr-only",
				...rest
			}),
			/* @__PURE__ */ jsx("span", {
				className: "flex size-6 shrink-0 items-center justify-center",
				children: /* @__PURE__ */ jsx("span", {
					className: `${circle} ${error ? tone.error : tone.default}`,
					children: /* @__PURE__ */ jsx("span", { className: "hidden size-1.5 rounded-infinite bg-primary group-has-checked/radio:block" })
				})
			}),
			labelSide === "right" && label
		]
	});
}
//#endregion
//#region src/selection/RadioCard.tsx
function RadioCard({ icon, label, description, tag, className = "", ...rest }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "group/radio flex flex-col gap-2 rounded-8 border border-primary-subtle bg-primary p-2 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-indigo has-disabled:cursor-not-allowed has-disabled:border-disabled has-disabled:bg-disabled " + className,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "flex h-6 items-center gap-2 text-secondary group-has-disabled/radio:text-disabled",
			children: [
				icon,
				/* @__PURE__ */ jsxs("span", {
					className: "flex min-w-0 flex-1 items-center gap-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "truncate text-body-small-medium",
						children: label
					}), tag]
				}),
				/* @__PURE__ */ jsx("input", {
					type: "radio",
					className: "sr-only",
					...rest
				}),
				/* @__PURE__ */ jsx("span", {
					className: "flex size-6 shrink-0 items-center justify-center",
					children: /* @__PURE__ */ jsx("span", {
						className: "flex size-4 items-center justify-center rounded-infinite border border-primary group-has-checked/radio:border-transparent group-has-checked/radio:bg-accent-indigo group-has-disabled/radio:border-disabled group-has-disabled/radio:group-has-checked/radio:border-transparent group-has-disabled/radio:group-has-checked/radio:bg-tertiary",
						children: /* @__PURE__ */ jsx("span", { className: "hidden size-1.5 rounded-infinite bg-primary group-has-checked/radio:block" })
					})
				})
			]
		}), description != null && /* @__PURE__ */ jsx("span", {
			className: "pb-2 pl-7 text-body-mini-regular text-tertiary group-has-disabled/radio:text-disabled",
			children: description
		})]
	});
}
//#endregion
//#region src/badge/Badge.tsx
var states = {
	success: "bg-success-subtle border-success text-success",
	error: "bg-danger-subtle border-danger text-danger",
	info: "bg-info-subtle border-info text-info",
	accent: "bg-accent-indigo-subtlest border-accent-indigo-bolder text-accent-indigo",
	urgent: "bg-urgent-subtle border-urgent text-urgent",
	warning: "bg-warning-subtle border-warning text-warning",
	idle: "bg-idle-subtle border-idle text-idle",
	disabled: "bg-disabled border-primary-bolder text-tertiary"
};
/** Static status label. Never interactive — use Chip for anything clickable. */
function Badge({ state, icon, className = "", children, ...rest }) {
	return /* @__PURE__ */ jsxs("span", {
		className: `inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap rounded-badge border px-2 text-body-small-medium ${states[state]} ${className}`,
		...rest,
		children: [icon, children]
	});
}
//#endregion
//#region src/badge/Chip.tsx
var base$2 = "inline-flex h-5 shrink-0 items-center gap-1 whitespace-nowrap px-1.5 text-body-small-regular focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo disabled:cursor-not-allowed disabled:text-disabled";
var styles = {
	primary: {
		rest: "bg-secondary text-primary enabled:hover:bg-primary-hover disabled:bg-disabled",
		selected: "bg-accent-indigo text-primary-inverse disabled:bg-disabled"
	},
	secondary: {
		rest: "bg-primary text-primary inset-ring inset-ring-primary enabled:hover:inset-ring-primary-bolder disabled:bg-transparent disabled:inset-ring-disabled",
		selected: "bg-primary text-accent-indigo inset-ring inset-ring-accent-indigo disabled:bg-transparent disabled:inset-ring-disabled"
	}
};
/** Selectable pill for filters, multi-select tags and removable tokens. */
function Chip({ hierarchy = "primary", rounded = true, selected = false, prefixIcon, suffixIcon, className = "", type = "button", children, ...rest }) {
	const s = styles[hierarchy];
	return /* @__PURE__ */ jsxs("button", {
		type,
		"aria-pressed": selected,
		className: `${base$2} ${rounded ? "rounded-infinite" : "rounded-6"} ${selected ? s.selected : s.rest} ${className}`,
		...rest,
		children: [
			prefixIcon,
			children,
			suffixIcon
		]
	});
}
//#endregion
//#region src/avatar/Avatar.tsx
var sizes$1 = {
	16: "size-4 text-body-tiny-regular",
	20: "size-5 text-support-caption",
	24: "size-6 text-support-caption",
	36: "size-9 text-body-medium-semibold"
};
var colors$1 = {
	green: "bg-success-subtle text-success",
	teal: "bg-accent-teal text-accent-teal",
	sky: "bg-accent-sky text-accent-sky",
	blue: "bg-accent-indigo-subtlest text-accent-indigo",
	purple: "bg-accent-fuchsia text-accent-fuchsia",
	pink: "bg-accent-blush text-accent-blush",
	red: "bg-danger-subtle text-danger",
	orange: "bg-accent-peach text-accent-peach",
	yellow: "bg-accent-sun text-accent-sun",
	gray: "bg-accent-stone text-secondary"
};
/** Round avatar: a photo, or initials on a low-contrast color. */
function Avatar({ size = 24, src, alt = "", color = "gray", className = "", children, ...rest }) {
	const base = `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-infinite ${sizes$1[size]}`;
	if (src) return /* @__PURE__ */ jsx("span", {
		className: `${base} ${className}`,
		...rest,
		children: /* @__PURE__ */ jsx("img", {
			src,
			alt,
			className: "size-full object-cover"
		})
	});
	return /* @__PURE__ */ jsx("span", {
		className: `${base} ${colors$1[color]} ${className}`,
		...rest,
		children
	});
}
//#endregion
//#region src/avatar/SidebarIcon.tsx
var colors = {
	ocean: "bg-accent-ocean border-accent-ocean text-accent-ocean",
	sky: "bg-accent-sky border-accent-sky text-accent-sky",
	teal: "bg-accent-teal border-accent-teal text-accent-teal",
	sun: "bg-accent-sun border-accent-sun text-accent-sun",
	fuchsia: "bg-accent-fuchsia border-accent-fuchsia text-accent-fuchsia",
	blossom: "bg-accent-blossom border-accent-blossom text-accent-blossom",
	emerald: "bg-accent-emerald border-accent-emerald text-accent-emerald",
	blush: "bg-accent-blush border-accent-blush text-accent-blush",
	peach: "bg-accent-peach border-accent-peach text-accent-peach",
	stone: "bg-accent-stone border-accent-stone text-accent-stone"
};
/** Small tinted chip holding one icon, used for sidebar navigation items. */
function SidebarIcon({ color = "stone", size = 16, className = "", children, ...rest }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex shrink-0 items-center justify-center rounded-4 border ${size === 16 ? "size-4" : "size-6"} ${colors[color]} ${className}`,
		...rest,
		children
	});
}
//#endregion
//#region src/divider/Divider.tsx
var horizontal = {
	none: "h-px",
	regular: "h-[9px]",
	spacious: "h-4"
};
var vertical = {
	none: "w-px",
	regular: "w-[5px]",
	spacious: "w-4"
};
function Divider({ direction = "horizontal", spacing = "none", className = "", ...rest }) {
	if (direction === "vertical") return /* @__PURE__ */ jsx("div", {
		role: "separator",
		"aria-orientation": "vertical",
		className: `flex shrink-0 justify-center self-stretch ${vertical[spacing]} ${className}`,
		...rest,
		children: /* @__PURE__ */ jsx("div", { className: "h-full border-l border-primary-subtle" })
	});
	return /* @__PURE__ */ jsx("div", {
		role: "separator",
		className: `flex w-full shrink-0 items-center ${horizontal[spacing]} ${className}`,
		...rest,
		children: /* @__PURE__ */ jsx("div", { className: "w-full border-t border-primary-subtle" })
	});
}
//#endregion
//#region src/toggle/Toggle.tsx
var track = "flex h-5 w-8 shrink-0 items-center rounded-infinite bg-tertiary p-0.5 group-has-checked/toggle:bg-accent-indigo group-has-focus-visible/toggle:outline-2 group-has-focus-visible/toggle:outline-offset-2 group-has-focus-visible/toggle:outline-accent-indigo";
var knob = "size-4 rounded-infinite bg-primary transition-transform group-has-checked/toggle:translate-x-3";
/** On/off switch. Takes effect immediately — use Checkbox when a form is submitted later. */
function Toggle({ className = "", ...rest }) {
	return /* @__PURE__ */ jsxs("label", {
		className: `group/toggle inline-flex has-disabled:cursor-not-allowed ${className}`,
		children: [/* @__PURE__ */ jsx("input", {
			type: "checkbox",
			role: "switch",
			className: "sr-only",
			...rest
		}), /* @__PURE__ */ jsx("span", {
			className: `${track} group-has-disabled/toggle:bg-disabled group-has-disabled/toggle:group-has-checked/toggle:bg-accent-indigo-subtlest`,
			children: /* @__PURE__ */ jsx("span", { className: knob })
		})]
	});
}
/** A settings row with a switch. The whole card is the click target and takes the focus ring. */
function ToggleCard({ icon, label, description, className = "", ...rest }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "group/toggle flex flex-col gap-2 rounded-8 border border-primary-subtle bg-primary p-2 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-indigo has-disabled:cursor-not-allowed has-disabled:border-disabled has-disabled:bg-disabled " + className,
		children: [/* @__PURE__ */ jsxs("span", {
			className: "flex h-6 items-center gap-2 text-secondary group-has-disabled/toggle:text-disabled",
			children: [
				icon,
				/* @__PURE__ */ jsx("span", {
					className: "min-w-0 flex-1 truncate text-body-small-medium",
					children: label
				}),
				/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					role: "switch",
					className: "sr-only",
					...rest
				}),
				/* @__PURE__ */ jsx("span", {
					className: "flex h-5 w-8 shrink-0 items-center rounded-infinite bg-tertiary p-0.5 group-has-checked/toggle:bg-accent-indigo group-has-disabled/toggle:bg-tertiary",
					children: /* @__PURE__ */ jsx("span", { className: knob })
				})
			]
		}), description != null && /* @__PURE__ */ jsx("span", {
			className: "pb-2 pl-7 text-body-mini-regular text-tertiary group-has-disabled/toggle:text-disabled",
			children: description
		})]
	});
}
//#endregion
//#region src/tooltip/Tooltip.tsx
var arrow = "shrink-0 bg-secondary-inverse";
var shapes = {
	up: "[clip-path:polygon(50%_0,100%_100%,0_100%)]",
	down: "[clip-path:polygon(0_0,100%_0,50%_100%)]",
	left: "[clip-path:polygon(100%_0,100%_100%,0_50%)]",
	right: "[clip-path:polygon(0_0,100%_50%,0_100%)]"
};
var inset = {
	left: "self-start ml-6",
	center: "self-center",
	right: "self-end mr-6"
};
function Tooltip({ pointer = "top-center", title, className = "", children, ...rest }) {
	const [edge, along = "center"] = pointer.split("-");
	const bubble = /* @__PURE__ */ jsxs("div", {
		className: "flex w-[300px] flex-col gap-3 rounded-6 bg-secondary-inverse p-3 text-primary-inverse",
		children: [title != null && /* @__PURE__ */ jsx("div", {
			className: "text-body-mini-medium",
			children: title
		}), /* @__PURE__ */ jsx("div", {
			className: "text-support-caption",
			children
		})]
	});
	if (edge === "left" || edge === "right") {
		const tip = /* @__PURE__ */ jsx("div", { className: `${arrow} h-4 w-2 self-center ${edge === "left" ? shapes.left : shapes.right}` });
		return /* @__PURE__ */ jsxs("div", {
			role: "tooltip",
			className: `inline-flex ${className}`,
			...rest,
			children: [
				edge === "left" && tip,
				bubble,
				edge === "right" && tip
			]
		});
	}
	const tip = /* @__PURE__ */ jsx("div", { className: `${arrow} h-2 w-4 ${inset[along]} ${edge === "top" ? shapes.up : shapes.down}` });
	return /* @__PURE__ */ jsxs("div", {
		role: "tooltip",
		className: `inline-flex flex-col ${className}`,
		...rest,
		children: [
			edge === "top" && tip,
			bubble,
			edge === "bottom" && tip
		]
	});
}
//#endregion
//#region src/avatar/SquareAvatar.tsx
var sizes = {
	12: "size-3 rounded-2 text-body-tiny-regular",
	14: "size-3.5 rounded-2 text-body-tiny-regular",
	16: "size-4 rounded-2 text-support-caption",
	20: "size-5 rounded-4 text-body-small-medium",
	24: "size-6 rounded-4 text-body-small-medium",
	40: "size-10 rounded-4 text-body-medium-medium"
};
/** Square avatar for companies and other non-person entities: an image, or one initial. */
function SquareAvatar({ size = 24, src, alt = "", className = "", children, ...rest }) {
	const base = `inline-flex shrink-0 items-center justify-center overflow-hidden ${sizes[size]}`;
	if (src) return /* @__PURE__ */ jsx("span", {
		className: `${base} ${className}`,
		...rest,
		children: /* @__PURE__ */ jsx("img", {
			src,
			alt,
			className: "size-full object-cover"
		})
	});
	return /* @__PURE__ */ jsx("span", {
		className: `${base} bg-tertiary text-secondary ${className}`,
		...rest,
		children
	});
}
var fieldBox = "rounded-6 bg-primary inset-ring inset-ring-primary-subtle focus-within:inset-ring-accent-indigo focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent-indigo has-disabled:cursor-not-allowed has-disabled:bg-disabled";
var fieldBoxError = "inset-ring-danger focus-within:inset-ring-danger";
var fieldText = "min-w-0 flex-1 bg-transparent text-body-small-regular text-primary outline-none placeholder:text-tertiary disabled:cursor-not-allowed disabled:text-tertiary disabled:placeholder:text-disabled";
function TextInput({ label, hint, error = false, prefix, suffix, id, className = "", ...rest }) {
	const auto = useId();
	const inputId = id ?? auto;
	const hintId = hint != null ? `${inputId}-hint` : void 0;
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-col gap-1 ${className}`,
		children: [
			label != null && /* @__PURE__ */ jsx("label", {
				htmlFor: inputId,
				className: "text-support-label text-tertiary",
				children: label
			}),
			/* @__PURE__ */ jsxs("div", {
				className: `flex h-8 items-center gap-1 px-2 text-primary ${fieldBox} ${error ? fieldBoxError : ""}`,
				children: [
					prefix,
					/* @__PURE__ */ jsx("input", {
						id: inputId,
						"aria-invalid": error || void 0,
						"aria-describedby": hintId,
						className: fieldText,
						...rest
					}),
					suffix
				]
			}),
			hint != null && /* @__PURE__ */ jsx("p", {
				id: hintId,
				className: error ? "text-support-caption text-danger" : "text-support-caption text-tertiary",
				children: hint
			})
		]
	});
}
//#endregion
//#region src/field/TextArea.tsx
function TextArea({ label, hint, error = false, counter = false, id, className = "", onChange, ...rest }) {
	const auto = useId();
	const areaId = id ?? auto;
	const hintId = hint != null ? `${areaId}-hint` : void 0;
	const [length, setLength] = useState(String(rest.value ?? rest.defaultValue ?? "").length);
	const showCounter = counter && rest.maxLength != null;
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-col gap-1 ${className}`,
		children: [
			label != null && /* @__PURE__ */ jsx("label", {
				htmlFor: areaId,
				className: "text-support-label text-tertiary",
				children: label
			}),
			/* @__PURE__ */ jsx("div", {
				className: `flex ${fieldBox} ${error ? fieldBoxError : ""}`,
				children: /* @__PURE__ */ jsx("textarea", {
					id: areaId,
					"aria-invalid": error || void 0,
					"aria-describedby": hintId,
					className: `${fieldText} max-h-60 min-h-20 resize-y p-2`,
					onChange: (e) => {
						setLength(e.target.value.length);
						onChange?.(e);
					},
					...rest
				})
			}),
			(hint != null || showCounter) && /* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsx("p", {
					id: hintId,
					className: error ? "text-support-caption text-danger" : "text-support-caption text-tertiary",
					children: hint
				}), showCounter && /* @__PURE__ */ jsxs("span", {
					className: `text-support-caption text-tertiary shrink-0`,
					children: [
						length,
						"/",
						rest.maxLength
					]
				})]
			})
		]
	});
}
//#endregion
//#region src/menu/icons.tsx
var base$1 = {
	width: 16,
	height: 16,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": true
};
var CheckIcon = () => /* @__PURE__ */ jsx("svg", {
	...base$1,
	children: /* @__PURE__ */ jsx("path", { d: "M5 12l5 5l10 -10" })
});
var ChevronDownIcon = () => /* @__PURE__ */ jsx("svg", {
	...base$1,
	children: /* @__PURE__ */ jsx("path", { d: "M6 9l6 6l6 -6" })
});
var ChevronUpIcon = () => /* @__PURE__ */ jsx("svg", {
	...base$1,
	children: /* @__PURE__ */ jsx("path", { d: "M6 15l6 -6l6 6" })
});
var ChevronRightIcon = () => /* @__PURE__ */ jsx("svg", {
	...base$1,
	children: /* @__PURE__ */ jsx("path", { d: "M9 6l6 6l-6 6" })
});
var XIcon = () => /* @__PURE__ */ jsxs("svg", {
	...base$1,
	children: [/* @__PURE__ */ jsx("path", { d: "M18 6l-12 12" }), /* @__PURE__ */ jsx("path", { d: "M6 6l12 12" })]
});
var CircleXIcon = () => /* @__PURE__ */ jsxs("svg", {
	...base$1,
	children: [/* @__PURE__ */ jsx("path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" }), /* @__PURE__ */ jsx("path", { d: "M10 10l4 4m0 -4l-4 4" })]
});
//#endregion
//#region src/menu/Menu.tsx
/** The floating panel that holds menu rows. */
function Menu({ className = "", ...rest }) {
	return /* @__PURE__ */ jsx("div", {
		className: `flex flex-col gap-0.5 rounded-8 border border-primary-subtle bg-primary p-1 shadow-lg ${className}`,
		...rest
	});
}
/** Small caption that titles a group of rows inside a menu. */
function MenuGroupLabel({ className = "", ...rest }) {
	return /* @__PURE__ */ jsx("div", {
		className: `flex h-7 items-center px-2 text-support-caption text-tertiary ${className}`,
		...rest
	});
}
function MenuItem({ leading, supportingText, selected = false, hasSubmenu = false, trailing, active = false, className = "", type = "button", children, ...rest }) {
	return /* @__PURE__ */ jsxs("button", {
		type,
		"data-active": active || void 0,
		className: "flex w-full items-center gap-2 rounded-6 p-1 text-left text-primary outline-none enabled:hover:bg-primary-hover data-active:bg-primary-hover focus-visible:bg-primary-hover disabled:cursor-not-allowed disabled:text-disabled " + className,
		...rest,
		children: [
			leading != null && /* @__PURE__ */ jsx("span", {
				className: "flex shrink-0 items-center self-start py-0.5",
				children: leading
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ jsx("span", {
					className: `truncate text-body-small-regular ${selected ? "text-accent-indigo" : ""}`,
					children
				}), supportingText != null && /* @__PURE__ */ jsx("span", {
					className: `truncate text-support-caption ${rest.disabled ? "" : "text-secondary"}`,
					children: supportingText
				})]
			}),
			trailing,
			selected && /* @__PURE__ */ jsx("span", {
				className: "shrink-0 text-accent-indigo",
				children: /* @__PURE__ */ jsx(CheckIcon, {})
			}),
			hasSubmenu && /* @__PURE__ */ jsx("span", {
				className: "shrink-0",
				children: /* @__PURE__ */ jsx(ChevronRightIcon, {})
			})
		]
	});
}
//#endregion
//#region src/menu/Dropdown.tsx
function Dropdown(props) {
	const { options, label, hint, placeholder = "Select", error = false, disabled = false, prefix, className = "" } = props;
	const id = useId();
	const root = useRef(null);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState(0);
	const selected = props.multiple ? props.value : props.value != null ? [props.value] : [];
	const byValue = (v) => options.find((o) => o.value === v);
	useEffect(() => {
		if (!open) return;
		const close = (e) => {
			if (!root.current?.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", close);
		return () => document.removeEventListener("mousedown", close);
	}, [open]);
	const choose = (o) => {
		if (o.disabled) return;
		if (props.multiple) props.onChange(props.value.includes(o.value) ? props.value.filter((v) => v !== o.value) : [...props.value, o.value]);
		else {
			props.onChange(o.value);
			setOpen(false);
		}
	};
	const onKeyDown = (e) => {
		if (disabled) return;
		if (e.key === "Escape") return setOpen(false);
		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			e.preventDefault();
			if (!open) return setOpen(true);
			const step = e.key === "ArrowDown" ? 1 : -1;
			setActive((a) => (a + step + options.length) % options.length);
		} else if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			if (open) choose(options[active]);
			else setOpen(true);
		}
	};
	const textTone = disabled ? selected.length ? "text-tertiary" : "text-disabled" : selected.length ? "text-primary" : "text-tertiary";
	return /* @__PURE__ */ jsxs("div", {
		ref: root,
		className: `relative flex flex-col gap-1 ${className}`,
		children: [
			label != null && /* @__PURE__ */ jsx("span", {
				id: `${id}-label`,
				className: "text-support-label text-tertiary",
				children: label
			}),
			/* @__PURE__ */ jsxs("div", {
				role: "combobox",
				tabIndex: disabled ? -1 : 0,
				"aria-expanded": open,
				"aria-haspopup": "listbox",
				"aria-controls": `${id}-list`,
				"aria-labelledby": label != null ? `${id}-label` : void 0,
				"aria-label": props["aria-label"],
				"aria-invalid": error || void 0,
				"aria-disabled": disabled || void 0,
				onClick: () => !disabled && setOpen((o) => !o),
				onKeyDown,
				className: `flex h-8 items-center gap-1 px-2 ${fieldBox} ${error ? fieldBoxError : ""} focus-visible:inset-ring-accent-indigo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ` + (open ? "inset-ring-accent-indigo outline-2 outline-offset-2 outline-accent-indigo " : "") + (disabled ? "cursor-not-allowed bg-disabled" : "cursor-pointer"),
				children: [
					prefix != null && /* @__PURE__ */ jsx("span", {
						className: `shrink-0 ${disabled ? "text-disabled" : "text-primary"}`,
						children: prefix
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex min-w-0 flex-1 items-center gap-1 overflow-hidden",
						children: props.multiple && selected.length > 0 ? selected.map((v) => /* @__PURE__ */ jsxs("span", {
							className: `inline-flex h-5 shrink-0 items-center gap-1 rounded-6 px-1.5 text-body-small-regular ${disabled ? "bg-disabled text-disabled" : "bg-secondary text-primary"}`,
							children: [byValue(v)?.label ?? v, /* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-label": `Remove ${byValue(v)?.label ?? v}`,
								disabled,
								onClick: (e) => {
									e.stopPropagation();
									if (props.multiple) props.onChange(props.value.filter((x) => x !== v));
								},
								children: /* @__PURE__ */ jsx(XIcon, {})
							})]
						}, v)) : /* @__PURE__ */ jsx("span", {
							className: `truncate text-body-small-regular ${textTone}`,
							children: selected.length ? byValue(selected[0])?.label : placeholder
						})
					}),
					props.multiple && selected.length > 0 && !disabled && /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": "Clear all",
						className: "shrink-0 text-tertiary",
						onClick: (e) => {
							e.stopPropagation();
							if (props.multiple) props.onChange([]);
						},
						children: /* @__PURE__ */ jsx(CircleXIcon, {})
					}),
					/* @__PURE__ */ jsx("span", {
						className: `shrink-0 ${disabled ? "text-disabled" : "text-secondary"}`,
						children: open ? /* @__PURE__ */ jsx(ChevronUpIcon, {}) : /* @__PURE__ */ jsx(ChevronDownIcon, {})
					})
				]
			}),
			hint != null && /* @__PURE__ */ jsx("p", {
				className: error ? "text-support-caption text-danger" : "text-support-caption text-tertiary",
				children: hint
			}),
			open && /* @__PURE__ */ jsx(Menu, {
				id: `${id}-list`,
				role: "listbox",
				"aria-multiselectable": props.multiple || void 0,
				className: "absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-auto",
				children: options.map((o, i) => {
					const isSelected = selected.includes(o.value);
					return /* @__PURE__ */ jsx(MenuItem, {
						role: "option",
						"aria-selected": isSelected,
						tabIndex: -1,
						disabled: o.disabled,
						active: i === active,
						selected: !props.multiple && isSelected,
						leading: props.multiple ? /* @__PURE__ */ jsx("span", {
							className: "pointer-events-none flex",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx(Checkbox, {
								checked: isSelected,
								readOnly: true,
								tabIndex: -1,
								disabled: o.disabled
							})
						}) : o.icon,
						onMouseEnter: () => setActive(i),
						onClick: () => choose(o),
						children: o.label
					}, o.value);
				})
			})
		]
	});
}
//#endregion
//#region src/calendar/Calendar.tsx
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
var DAYS = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa"
];
var day = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
var Chevron = ({ d }) => /* @__PURE__ */ jsx("svg", {
	width: "20",
	height: "20",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", { d })
});
function Calendar(props) {
	const { weekStartsOn = "monday", min, max, card = false, className = "" } = props;
	const range = props.mode === "range" ? props.value : {
		start: props.value,
		end: null
	};
	const [view, setView] = useState(() => {
		const d = props.defaultMonth ?? range.start ?? /* @__PURE__ */ new Date();
		return new Date(d.getFullYear(), d.getMonth(), 1);
	});
	const offset = weekStartsOn === "monday" ? 1 : 0;
	const first = new Date(view.getFullYear(), view.getMonth(), 1 - (view.getDay() - offset + 7) % 7);
	const cells = Array.from({ length: 42 }, (_, i) => new Date(first.getFullYear(), first.getMonth(), first.getDate() + i));
	const today = day(/* @__PURE__ */ new Date());
	const start = range.start ? day(range.start) : null;
	const end = range.end ? day(range.end) : null;
	const thisYear = (/* @__PURE__ */ new Date()).getFullYear();
	const years = Array.from({ length: 21 }, (_, i) => String(thisYear - 10 + i));
	const pick = (d) => {
		if (props.mode !== "range") return props.onChange(d);
		const { start: s, end: e } = props.value;
		if (!s || e) props.onChange({
			start: d,
			end: null
		});
		else if (day(d) < day(s)) props.onChange({
			start: d,
			end: s
		});
		else props.onChange({
			start: s,
			end: d
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: `inline-flex w-[268px] flex-col gap-2 p-2 ${card ? "rounded-8 bg-primary shadow-lg inset-ring inset-ring-primary-subtle" : ""} ${className}`,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex h-8 items-center justify-between gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ jsx(Dropdown, {
						className: "w-[98px]",
						"aria-label": "Month",
						options: MONTHS.map((m, i) => ({
							value: String(i),
							label: m
						})),
						value: String(view.getMonth()),
						onChange: (v) => v != null && setView(new Date(view.getFullYear(), Number(v), 1))
					}), /* @__PURE__ */ jsx(Dropdown, {
						className: "w-[76px]",
						"aria-label": "Year",
						options: years.map((y) => ({
							value: y,
							label: y
						})),
						value: String(view.getFullYear()),
						onChange: (v) => v != null && setView(new Date(Number(v), view.getMonth(), 1))
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-0.5 text-tertiary",
					children: [/* @__PURE__ */ jsx(IconButton, {
						className: "text-tertiary",
						"aria-label": "Previous month",
						onClick: () => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1)),
						children: /* @__PURE__ */ jsx(Chevron, { d: "M15 6l-6 6l6 6" })
					}), /* @__PURE__ */ jsx(IconButton, {
						className: "text-tertiary",
						"aria-label": "Next month",
						onClick: () => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1)),
						children: /* @__PURE__ */ jsx(Chevron, { d: "M9 6l6 6l-6 6" })
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex",
				children: Array.from({ length: 7 }, (_, i) => /* @__PURE__ */ jsx("div", {
					className: "flex h-8 w-9 items-center justify-center text-body-small-regular text-tertiary",
					children: DAYS[(i + offset) % 7]
				}, i))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-1",
				role: "grid",
				children: Array.from({ length: 6 }, (_, w) => /* @__PURE__ */ jsx("div", {
					className: "flex",
					role: "row",
					children: cells.slice(w * 7, w * 7 + 7).map((d) => {
						const t = day(d);
						const disabled = d.getMonth() !== view.getMonth() || min != null && t < day(min) || max != null && t > day(max);
						const isStart = start === t;
						const isEnd = end === t;
						const selected = isStart || isEnd;
						const inRange = start != null && end != null && t > start && t < end;
						const strip = start != null && end != null && start !== end ? isStart ? "before:absolute before:inset-y-0 before:right-0 before:w-1/2 before:bg-accent-indigo-subtlest" : isEnd ? "before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:bg-accent-indigo-subtlest" : "" : "";
						const pill = selected ? `bg-accent-indigo text-primary-inverse ${start != null && end != null && start !== end ? isStart ? "rounded-l-4" : "rounded-r-4" : "rounded-4"}` : inRange ? "text-secondary" : disabled ? "rounded-4 text-disabled" : `rounded-4 text-secondary group-hover:bg-accent-indigo-subtlest group-hover:text-accent-indigo ${t === today ? "border border-accent-indigo" : ""}`;
						return /* @__PURE__ */ jsx("button", {
							type: "button",
							role: "gridcell",
							"aria-selected": selected || inRange,
							"aria-current": t === today ? "date" : void 0,
							"aria-label": d.toDateString(),
							disabled,
							onClick: () => pick(d),
							className: `group relative flex h-8 w-9 items-center justify-center outline-none disabled:cursor-not-allowed ${inRange ? "bg-accent-indigo-subtlest" : ""} ${strip}`,
							children: /* @__PURE__ */ jsx("span", {
								className: `relative flex size-8 items-center justify-center text-body-small-medium group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent-indigo ${pill}`,
								children: d.getDate()
							})
						}, t);
					})
				}, w))
			})
		]
	});
}
//#endregion
//#region src/navigation/Tabs.tsx
/** A horizontal tab bar. Put `Tab`s inside. */
function Tabs({ className = "", ...rest }) {
	return /* @__PURE__ */ jsx("div", {
		role: "tablist",
		className: `flex gap-2 ${className}`,
		...rest
	});
}
function Tab({ selected = false, size = 28, prefixIcon, suffixIcon, className = "", type = "button", children, ...rest }) {
	return /* @__PURE__ */ jsx("button", {
		type,
		role: "tab",
		"aria-selected": selected,
		className: `group flex h-10 shrink-0 items-center border-b outline-none ${selected ? "border-accent-indigo" : "border-transparent"} ${className}`,
		...rest,
		children: /* @__PURE__ */ jsxs("span", {
			className: `flex items-center gap-1 whitespace-nowrap rounded-6 px-2 text-body-small-medium ${size === 28 ? "h-7" : "h-8"} group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent-indigo ` + (selected ? "text-accent-indigo" : "text-secondary group-hover:bg-primary-hover"),
			children: [
				prefixIcon,
				children,
				suffixIcon
			]
		})
	});
}
//#endregion
//#region src/navigation/Breadcrumb.tsx
function Breadcrumb({ items, icon, className = "" }) {
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "Breadcrumb",
		className,
		children: /* @__PURE__ */ jsxs("ol", {
			className: "flex h-6 items-center gap-1 whitespace-nowrap text-body-small-regular",
			children: [icon != null && /* @__PURE__ */ jsx("li", {
				className: "flex shrink-0 text-tertiary",
				"aria-hidden": "true",
				children: icon
			}), items.map((item, i) => {
				const current = i === items.length - 1;
				const tone = current ? "text-primary" : "text-tertiary";
				return /* @__PURE__ */ jsxs(Fragment$1, { children: [i > 0 && /* @__PURE__ */ jsx("li", {
					"aria-hidden": "true",
					className: tone,
					children: "/"
				}), /* @__PURE__ */ jsx("li", {
					className: `min-w-0 ${tone}`,
					children: current ? /* @__PURE__ */ jsx("span", {
						"aria-current": "page",
						className: "block truncate",
						children: item.label
					}) : /* @__PURE__ */ jsx("a", {
						href: item.href,
						onClick: item.onClick,
						className: "block truncate rounded-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo",
						children: item.label
					})
				})] }, i);
			})]
		})
	});
}
//#endregion
//#region src/navigation/Steps.tsx
var Glyph = ({ d, px }) => /* @__PURE__ */ jsx("svg", {
	width: px,
	height: px,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("path", { d })
});
var CHECK = "M5 12l5 5l10 -10";
var X = "M18 6l-12 12M6 6l12 12";
/** The round status dot. 20px inside a step row, 24px when used on its own. */
function StepIndicator({ state, size = 20 }) {
	const box = size === 20 ? "size-5" : "size-6";
	const icon = size === 20 ? 12 : 14;
	const base = `flex shrink-0 items-center justify-center rounded-infinite ${box}`;
	switch (state) {
		case "progressing": return /* @__PURE__ */ jsx("span", {
			className: `${base} bg-accent-indigo-subtlest`,
			children: /* @__PURE__ */ jsx("span", {
				className: `flex items-center justify-center rounded-infinite bg-accent-indigo-subtler ${size === 20 ? "size-[13px]" : "size-4"}`,
				children: /* @__PURE__ */ jsx("span", { className: `rounded-infinite bg-accent-indigo ${size === 20 ? "size-[7px]" : "size-2"}` })
			})
		});
		case "checked": return /* @__PURE__ */ jsx("span", {
			className: `${base} bg-accent-indigo text-primary-inverse`,
			children: /* @__PURE__ */ jsx(Glyph, {
				d: CHECK,
				px: icon
			})
		});
		case "rejected": return /* @__PURE__ */ jsx("span", {
			className: `${base} bg-danger text-primary-inverse`,
			children: /* @__PURE__ */ jsx(Glyph, {
				d: X,
				px: icon
			})
		});
		case "checked-disabled": return /* @__PURE__ */ jsx("span", {
			className: `${base} bg-accent-indigo-subtlest text-accent-indigo`,
			children: /* @__PURE__ */ jsx(Glyph, {
				d: CHECK,
				px: icon
			})
		});
		case "disabled": return /* @__PURE__ */ jsx("span", { className: `${base} border border-primary bg-disabled` });
		default: return /* @__PURE__ */ jsx("span", { className: `${base} border border-primary` });
	}
}
var dot = {
	empty: "empty",
	progressing: "progressing",
	completed: "checked",
	"completed-inactive": "checked-disabled"
};
/** A horizontal sequence of steps joined by lines. */
function Steps({ items, className = "" }) {
	return /* @__PURE__ */ jsx("ol", {
		className: `flex ${className}`,
		children: items.map((item, i) => {
			const last = i === items.length - 1;
			return /* @__PURE__ */ jsxs("li", {
				"aria-current": item.status === "progressing" ? "step" : void 0,
				className: `flex h-5 items-center gap-2 ${last ? "" : "flex-1 pr-2"}`,
				children: [
					/* @__PURE__ */ jsx(StepIndicator, { state: dot[item.status] }),
					/* @__PURE__ */ jsx("span", {
						className: `whitespace-nowrap text-body-small-medium ${item.status === "completed-inactive" ? "text-tertiary" : "text-primary"}`,
						children: item.label
					}),
					!last && /* @__PURE__ */ jsx("span", { className: `flex-1 border-t ${item.status === "completed" ? "border-accent-indigo" : "border-primary-subtle"}` })
				]
			}, i);
		})
	});
}
//#endregion
//#region src/feedback/status.tsx
var base = {
	width: 16,
	height: 16,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": true
};
var CIRCLE = "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0";
var paths = {
	info: [
		CIRCLE,
		"M12 9h.01",
		"M11 12h1v4h1"
	],
	success: [CIRCLE, "M9 12l2 2l4 -4"],
	warning: [
		"M12 9v4",
		"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z",
		"M12 16h.01"
	],
	danger: [CIRCLE, "M10 10l4 4m0 -4l-4 4"]
};
var statusText = {
	info: "text-info",
	success: "text-success",
	warning: "text-warning",
	danger: "text-danger"
};
var statusFillA80 = {
	info: "bg-info-subtle-A80",
	success: "bg-success-subtle-A80",
	warning: "bg-warning-subtle-A80",
	danger: "bg-danger-subtle-A80"
};
var statusBorder = {
	info: "border-info",
	success: "border-success",
	warning: "border-warning",
	danger: "border-danger"
};
/** 16px status icon in a 20px-high box so it lines up with the first line of text. */
function StatusIcon({ status }) {
	return /* @__PURE__ */ jsx("span", {
		className: `flex h-5 shrink-0 items-center ${statusText[status]}`,
		children: /* @__PURE__ */ jsx("svg", {
			...base,
			children: paths[status].map((d) => /* @__PURE__ */ jsx("path", { d }, d))
		})
	});
}
var CloseGlyph = () => /* @__PURE__ */ jsxs("svg", {
	...base,
	children: [/* @__PURE__ */ jsx("path", { d: "M18 6l-12 12" }), /* @__PURE__ */ jsx("path", { d: "M6 6l12 12" })]
});
//#endregion
//#region src/feedback/Toast.tsx
/** Temporary message that floats over the page and reports the result of an action. */
function Toast({ status, title, description, action, onClose, className = "", ...rest }) {
	return /* @__PURE__ */ jsxs("div", {
		role: "status",
		className: `flex w-[450px] items-start gap-4 rounded-6 p-2 shadow-lg ${statusFillA80[status]} ${className}`,
		...rest,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex min-w-0 flex-1 gap-1",
			children: [/* @__PURE__ */ jsx(StatusIcon, { status }), /* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 flex-1 flex-col gap-1",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-body-small-medium text-secondary",
					children: title
				}), description != null && /* @__PURE__ */ jsx("div", {
					className: "text-support-caption text-tertiary",
					children: description
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex shrink-0 items-center",
			children: [action, onClose && /* @__PURE__ */ jsx(IconButton, {
				size: "sm",
				"aria-label": "Close",
				onClick: onClose,
				children: /* @__PURE__ */ jsx(CloseGlyph, {})
			})]
		})]
	});
}
/** Inline banner that stays in the page until its condition changes. */
function Alert({ status, layout = "full", action, className = "", children, ...rest }) {
	return /* @__PURE__ */ jsxs("div", {
		role: "alert",
		className: `flex gap-2 rounded-6 p-2 ${layout === "short" ? "flex-col" : "items-center"} ${statusFillA80[status]} ${className}`,
		...rest,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex min-w-0 flex-1 gap-2",
			children: [/* @__PURE__ */ jsx(StatusIcon, { status }), /* @__PURE__ */ jsx("div", {
				className: `min-w-0 flex-1 text-body-small-regular ${statusText[status]}`,
				children
			})]
		}), action != null && /* @__PURE__ */ jsx("div", {
			className: `flex shrink-0 ${layout === "short" ? "justify-end" : ""}`,
			children: action
		})]
	});
}
/** Boxed note with a title and explanation, for guidance that belongs next to the content. */
function Callout({ status, title, action, onClose, className = "", children, ...rest }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `flex flex-col gap-1 rounded-8 border bg-secondary p-3 ${statusBorder[status]} ${className}`,
		...rest,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex min-h-6 items-center gap-2",
				children: [
					/* @__PURE__ */ jsx(StatusIcon, { status }),
					/* @__PURE__ */ jsx("div", {
						className: "min-w-0 flex-1 text-body-small-medium text-primary",
						children: title
					}),
					onClose && /* @__PURE__ */ jsx(IconButton, {
						size: "sm",
						"aria-label": "Close",
						onClick: onClose,
						children: /* @__PURE__ */ jsx(CloseGlyph, {})
					})
				]
			}),
			children != null && /* @__PURE__ */ jsx("div", {
				className: "pl-6 text-body-small-regular text-tertiary",
				children
			}),
			action != null && /* @__PURE__ */ jsx("div", {
				className: "flex justify-end",
				children: action
			})
		]
	});
}
//#endregion
//#region src/overlay/Dialog.tsx
/** The dimmed backdrop behind a dialog or sheet. */
function Overlay({ onClose, align = "center", children }) {
	useEffect(() => {
		if (!onClose) return;
		const onKey = (e) => e.key === "Escape" && onClose();
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ jsx("div", {
		className: `fixed inset-0 z-50 flex justify-center bg-overlay ${align === "center" ? "items-center" : "items-end"}`,
		onMouseDown: (e) => e.target === e.currentTarget && onClose?.(),
		children
	});
}
/** Small dialog that asks the user to confirm or cancel one action. */
function ConfirmationDialog({ title, description, children, destructive = false, confirmLabel, cancelLabel, onConfirm, onCancel }) {
	const id = useId();
	return /* @__PURE__ */ jsxs("div", {
		role: "alertdialog",
		"aria-modal": "true",
		"aria-labelledby": `${id}-title`,
		"aria-describedby": description != null ? `${id}-desc` : void 0,
		className: "flex w-[400px] flex-col gap-4 rounded-8 bg-primary p-6 shadow-lg",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ jsx("h2", {
					id: `${id}-title`,
					className: "text-body-medium-semibold text-primary",
					children: title
				}), description != null && /* @__PURE__ */ jsx("p", {
					id: `${id}-desc`,
					className: "text-body-small-regular text-primary",
					children: description
				})]
			}),
			children,
			/* @__PURE__ */ jsxs("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ jsx(Button, {
					className: "flex-1",
					hierarchy: "outline",
					onClick: onCancel,
					children: cancelLabel
				}), /* @__PURE__ */ jsx(Button, {
					className: "flex-1",
					hierarchy: "primary",
					accent: destructive ? "danger" : "blue",
					onClick: onConfirm,
					children: confirmLabel
				})]
			})
		]
	});
}
var widths = {
	sm: "w-[400px]",
	md: "w-[600px]",
	lg: "w-[780px]"
};
/** Dialog with a title bar, free content, and a footer of actions. */
function ContentDialog({ size = "md", title, onClose, children, actions }) {
	const id = useId();
	return /* @__PURE__ */ jsxs("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": `${id}-title`,
		className: `flex max-h-full flex-col rounded-8 bg-primary shadow-lg ${widths[size]}`,
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-4 px-6 pb-3 pt-6",
				children: [/* @__PURE__ */ jsx("h2", {
					id: `${id}-title`,
					className: "min-w-0 flex-1 truncate text-body-medium-semibold text-primary",
					children: title
				}), onClose && /* @__PURE__ */ jsx(IconButton, {
					size: "sm",
					"aria-label": "Close",
					onClick: onClose,
					children: /* @__PURE__ */ jsx(CloseGlyph, {})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "min-h-0 flex-1 overflow-auto px-6",
				children
			}),
			actions != null && /* @__PURE__ */ jsx("div", {
				className: `flex gap-3 px-6 pb-6 pt-4 ${size === "sm" ? "*:flex-1" : "justify-end *:min-w-[120px]"}`,
				children: actions
			})
		]
	});
}
/** Mobile panel that slides up from the bottom edge. Use inside `<Overlay align="bottom">`. */
function BottomSheet({ title, detail, children, actions }) {
	const id = useId();
	return /* @__PURE__ */ jsxs("div", {
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": `${id}-title`,
		className: "flex max-h-full w-full flex-col rounded-t-16 bg-primary",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex min-h-0 flex-1 flex-col gap-3 px-4",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "flex h-4 items-end justify-center",
					children: /* @__PURE__ */ jsx("span", { className: "h-[5px] w-9 rounded-infinite bg-tertiary" })
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center gap-2 text-center",
					children: [/* @__PURE__ */ jsx("h2", {
						id: `${id}-title`,
						className: "text-body-medium-semibold text-primary",
						children: title
					}), detail != null && /* @__PURE__ */ jsx("p", {
						className: "text-body-small-medium text-tertiary",
						children: detail
					})]
				}),
				children != null && /* @__PURE__ */ jsx("div", {
					className: "min-h-0 flex-1 overflow-auto",
					children
				})
			]
		}), actions != null && /* @__PURE__ */ jsx("div", {
			className: "flex gap-3 px-4 pb-6 pt-3 *:flex-1",
			children: actions
		})]
	});
}
//#endregion
//#region src/table/Table.tsx
function Table({ className = "", ...rest }) {
	return /* @__PURE__ */ jsx("table", {
		className: `w-full border-separate border-spacing-0 text-left ${className}`,
		...rest
	});
}
/** A body row. Hover and selection tint every cell in the row. */
function TableRow({ selected = false, className = "", ...rest }) {
	return /* @__PURE__ */ jsx("tr", {
		"data-selected": selected || void 0,
		"aria-selected": selected || void 0,
		className: `group/row ${className}`,
		...rest
	});
}
var SortGlyph = () => /* @__PURE__ */ jsxs("svg", {
	width: "14",
	height: "14",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	strokeLinecap: "round",
	strokeLinejoin: "round",
	"aria-hidden": "true",
	children: [/* @__PURE__ */ jsx("path", { d: "M3 9l4 -4l4 4m-4 -4v14" }), /* @__PURE__ */ jsx("path", { d: "M21 15l-4 4l-4 -4m4 4v-14" })]
});
function TableHeaderCell({ icon, onSort, active = false, className = "", children, ...rest }) {
	return /* @__PURE__ */ jsx("th", {
		scope: "col",
		className: `h-table-row border-b border-primary-subtle px-2 py-0 hover:bg-secondary ${active ? "bg-accent-indigo-subtlest" : "bg-primary"} ${className}`,
		...rest,
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ jsxs("span", {
				className: "flex min-w-0 items-center gap-1 text-body-small-medium text-tertiary",
				children: [icon, /* @__PURE__ */ jsx("span", {
					className: "truncate",
					children
				})]
			}), onSort && /* @__PURE__ */ jsx(IconButton, {
				size: "sm",
				className: "text-tertiary",
				"aria-label": "Sort",
				onClick: onSort,
				children: /* @__PURE__ */ jsx(SortGlyph, {})
			})]
		})
	});
}
var cellFill = "bg-primary group-hover/row:bg-primary-hover group-data-selected/row:bg-accent-indigo-subtlest";
function TableCell({ readOnly = false, className = "", ...rest }) {
	return /* @__PURE__ */ jsx("td", {
		className: `h-table-row border-b border-primary-subtle py-0 pl-2 pr-1 text-body-small-regular ${readOnly ? "text-secondary" : "text-primary"} ${cellFill} ${className}`,
		...rest
	});
}
/** The narrow leading cell that holds the row-selection checkbox (use `<Checkbox size={14} />`). */
function TableSelectCell({ header = false, className = "", children, ...rest }) {
	return /* @__PURE__ */ jsx(header ? "th" : "td", {
		className: `h-table-row w-[26px] border-b border-primary-subtle pl-1 ${header ? "bg-primary" : cellFill} ${className}`,
		...rest,
		children: /* @__PURE__ */ jsx("span", {
			className: "flex size-[22px] items-center justify-center",
			children
		})
	});
}
//#endregion
//#region src/layout/Loading.tsx
/** Skeleton bar shown in place of content that is still loading. Set its width with `className`. */
function Loading({ surface = "light", className = "", ...rest }) {
	return /* @__PURE__ */ jsx("span", {
		role: "status",
		"aria-label": "Loading",
		className: `relative block h-4 overflow-hidden rounded-4 ${surface === "light" ? "bg-loading-light" : "bg-loading-dark"} ${className}`,
		...rest,
		children: /* @__PURE__ */ jsx("span", { className: `absolute inset-0 animate-pulse ${surface === "light" ? "bg-loading-light-2" : "bg-loading-dark-2"}` })
	});
}
//#endregion
//#region src/layout/ScrollArea.tsx
/** A scrolling container with the system's thin scrollbar. Give it a height or max-height. */
function ScrollArea({ className = "", ...rest }) {
	return /* @__PURE__ */ jsx("div", {
		className: `overflow-auto [scrollbar-color:var(--border-primary-subtle)_transparent] [scrollbar-width:thin] ${className}`,
		...rest
	});
}
//#endregion
export { Alert, Avatar, Badge, BottomSheet, Breadcrumb, Button, Calendar, Callout, Checkbox, Chip, ConfirmationDialog, ContentDialog, Divider, Dropdown, IconButton, Loading, Menu, MenuGroupLabel, MenuItem, Overlay, Radio, RadioCard, ScrollArea, SidebarIcon, SquareAvatar, StepIndicator, Steps, Tab, Table, TableCell, TableHeaderCell, TableRow, TableSelectCell, Tabs, TextArea, TextInput, Toast, Toggle, ToggleCard, Tooltip };
