const compClassName = (...classNames) => classNames.reduce((acc, cur) => `${acc} ${cur}`, "");

export { compClassName };
