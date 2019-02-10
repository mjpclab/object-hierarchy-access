import {SelectPropParam} from './type';
import {getPropNames, cloneContainer} from './utility/common';
import {normalizeDescriptor, getMapped} from './utility/select';

function generate(current: any, result: any, hierarchies: SelectPropParam[], index: number) {
	const descriptor = normalizeDescriptor(hierarchies[index]);
	const names = getPropNames(current, descriptor);

	const lastIndex = hierarchies.length - 1;
	names.forEach(name => {
		if (name in current) {
			const {mappedName, mappedValue} = getMapped(current, name, descriptor);

			if (index < lastIndex) {
				result[mappedName] = cloneContainer(mappedValue);
			} else {
				result[mappedName] = mappedValue;
			}

			if (index < lastIndex && result !== undefined && typeof mappedValue === 'object') {
				generate(mappedValue, result[mappedName], hierarchies, index + 1);
			}
		}
	});
}

function select(target: any, ...hierarchyProps: SelectPropParam[]) {
	let result;
	const current = target;
	if (current !== undefined && current !== null) {
		result = cloneContainer(current);
		generate(current, result, hierarchyProps, 0);
	}

	return result;
}

export {
	select
};
