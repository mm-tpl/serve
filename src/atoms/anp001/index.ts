import an14 from '@mmstudio/an000014';

export default async function anp1<T>(sql: string, ...args: unknown[]) {
	// sql查询
	/**
	* 数据库返回值
	*/
	const [r1603335417] = await (() => {
		const p1 = 'db001';
		return an14<T>(p1, [sql, args]);
	})();
	return r1603335417;
}
