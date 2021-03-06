import {isArray} from './utility/common';
import type {GetPropParam} from './type';
import {get} from './get';

function array2map(
	arr: any[],
	key: GetPropParam | GetPropParam[],
	value: GetPropParam | GetPropParam[]
) {
	if (!isArray(arr)) {
		return;
	}

	const result: any = {};

	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		const keyProp = get(item, key);
		const valueProp = get(item, value);

		result[keyProp] = valueProp;
	}

	return result;
}

export {
	array2map
};
